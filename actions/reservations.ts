"use server";

import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";
import {
  FilterParamTypes,
  Property as PropertyType,
  reservationPayload,
  ResponseT,
  SortOption,
} from "@/types";
import { getProperty } from "./properties";
import { getUserAvailableQuota, getUserId } from "./profiles";
import Property from "@/database/models/property.model";
import { revalidatePath } from "next/cache";
import Profile from "@/database/models/profiles.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { adminType, documentSubmission, expirationDuration } from "@/constants";
import {
  calculateFutureDate,
  checkCurrentReservationStatus,
} from "@/lib/utils";
import { updateContractFiles } from "./file-upload";
import { sendInfoEmail } from "@/lib/email";
import logger from "@/lib/logger";

type formDatPaylaod = {
  data: FormData;
  id: string;
};

export async function getReservationExist(_id: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.find({ property_ref_id: _id });
    return data.length > 0;
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION GET EXISTS : get reservation exists failed with error ${JSON.stringify(
        error
      )}`
    );
    return false;
  }
}

export async function getReservationStatus(_id: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.find({ property_ref_id: _id });
    const reservation =
      data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};

    return reservation.status;
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION GET STATUS : get reservation status failed with error ${JSON.stringify(
        error
      )}`
    );
    return undefined;
  }
}

export async function getMyReservations(userId: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "property_ref_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $unwind: "$property",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          user_id: 1,
          signed_documents: 1,
          created_at: 1,
          updated_at: 1,
          updated_by: 1,
          property_ref_id: 1,
          admin_comment: 1,
          user_comment: 1,
          document_submission_deadline: 1,
          desired_semesters_stay: 1,
          from: 1,
          to: 1,
          property_id: "$property.property_id",
          address: "$property.address",
        },
      },
      {
        $match: { user_id: userId },
      },
    ]);
    const reservations =
      data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];

    return reservations;
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION GET MY RESERVATION : get my reservation failed with error ${JSON.stringify(
        error
      )}`
    );
    return undefined;
  }
}

async function performReservation(
  reservationPayload: reservationPayload,
  propertyData: PropertyType
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  let msg = "";
  let type = "";

  const expiredDate = calculateFutureDate(new Date(), expirationDuration);

  try {
    const opts = { session };
    // reserve the property
    const res1 = await Property.updateOne(
      { _id: propertyData._id },
      { $set: { status: "reserved" } },
      opts
    );
    if (res1.modifiedCount === 0) {
      throw new Error("Property Cannot be modified or not found");
    }

    // add reservation entry
    await Reservation.create(
      [
        {
          status: documentSubmission,
          user_id: reservationPayload.user_id,
          created_at: new Date(),
          property_ref_id: reservationPayload.property_ref_id,
          from: propertyData.from,
          to: propertyData.to,
          document_submission_deadline: expiredDate,
          desired_semesters_stay: reservationPayload.desired_semesters_stay,
          notice_period: propertyData.notice_period,
          admin_assigned_reservation: false,
          rental_end: {
            email_sent_count: 0,
            last_email_sent_date: null,
            tenant_confirmation_status: false,
            property_dispatch: false,
          },
        },
      ],
      opts
    );

    // reduce the quota of the user
    const res2 = await Profile.updateOne(
      { user_id: reservationPayload.user_id },
      { $inc: { used_quota: 1 } },
      opts
    );

    if (res2.modifiedCount === 0) {
      throw new Error(
        "Profile quota Cannot be modified or not found of the user"
      );
    }

    // commit the transaction
    await session.commitTransaction();

    // logging
    logger.info(
      `#RESERVATION CREATE : reservation created successfully for the property id : ${
        propertyData._id
      }. reservation data : ${JSON.stringify(reservationPayload)} `
    );

    //sending email notification
    const profile = await Profile.findOne({
      user_id: reservationPayload.user_id,
    });
    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: "Temporary Reservation Success",
      desc: "Your temporary reservation has been successfully created. You can find your reservations under the 'My Reservations' page. Please proceed with the necessary contract document submission by visiting the Reservation Details page. Failure to do so within the deadline will result in the cancellation of the temporary reservation. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });

    revalidatePath(`/property/view/${propertyData._id}`);
    revalidatePath("/my-reservations");
    revalidatePath("/my-profile");

    msg =
      "Property reserved successfully for a temporary period. Please visit my reservation page to upload documents to complete the process";
    type = "ok";
  } catch (error) {
    // abort the transaction
    await session.abortTransaction();

    // logging
    logger.error(
      `#RESERVATION CREATE : Exception in create reservation with error ${JSON.stringify(
        error
      )}`
    );

    msg = "Internal Server Error. Failed to create reservation entries !";
    type = "error";
  } finally {
    session.endSession();
    return {
      msg: msg,
      type: type,
    };
  }
}

export async function makeReservation(reservationPayload: {
  property_ref_id: string;
  desired_semesters_stay: string;
}) {
  try {
    const userId = await getUserId();
    const quota: number = await getUserAvailableQuota(userId);
    const currentReservations = await getMyReservations(userId);
    const currentlyReservationExists =
      checkCurrentReservationStatus(currentReservations);

    const conn = await connectToDatabase();

    if (quota > 0) {
      if (currentlyReservationExists) {
        // logging
        logger.error(
          `#RESERVATION CREATE : reservation create failed. The use already have an active reservation`
        );

        return {
          msg: "You currently have an active reservation. Please note that only one reservation can be held at a time",
          type: "error",
        };
      } else {
        // proceed reservation
        const propertyData = await getProperty(
          reservationPayload.property_ref_id
        );
        if (propertyData && propertyData.status === "available") {
          return await performReservation(
            {
              ...reservationPayload,
              user_id: userId,
              desired_semesters_stay: reservationPayload.desired_semesters_stay,
            },
            propertyData
          );
        } else {
          // logging
          logger.error(
            `#RESERVATION CREATE : reservation create failed. Property is not available, when user made the reservation`
          );

          return {
            msg: "The property you are attempting to reserve isn't currently available. Please try again later.",
            type: "error",
          };
        }
      }
    } else {
      // logging
      logger.error(
        `#RESERVATION CREATE : reservation create failed. The User has reached reservation quota limit.`
      );

      return {
        msg: "You have reached your reservation quota limit. No further reservations can be made",
        type: "error",
      };
    }
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION CREATE : reservation create failed with error: ${JSON.stringify(
        error
      )}`
    );

    return {
      msg: "Internal Server Error. Failed to make the reservation !",
      type: "error",
    };
  }
}

export async function assignReservation(reservationPayload: {
  property_ref_id: string;
  desired_semesters_stay: string;
  user_id: string;
  from: Date | undefined;
}) {
  try {
    const conn = await connectToDatabase();

    // proceed reservation
    const propertyData = await getProperty(reservationPayload.property_ref_id);
    if (propertyData && propertyData.status === "available") {
      const session = await mongoose.startSession();
      session.startTransaction();
      let msg = "";
      let type = "";

      const expiredDate = calculateFutureDate(new Date(), expirationDuration);
      try {
        const opts = { session };
        // reserve the property
        const res1 = await Property.updateOne(
          { _id: propertyData._id },
          { $set: { status: "reserved" } },
          opts
        );
        if (res1.modifiedCount === 0) {
          throw new Error("Property Cannot be modified or not found");
        }

        // add reservation entry
        await Reservation.create(
          [
            {
              status: documentSubmission,
              user_id: reservationPayload.user_id,
              created_at: new Date(),
              property_ref_id: reservationPayload.property_ref_id,
              from: reservationPayload.from,
              to: propertyData.to,
              document_submission_deadline: expiredDate,
              desired_semesters_stay: reservationPayload.desired_semesters_stay,
              notice_period: propertyData.notice_period,
              admin_assigned_reservation: true,
              rental_end: {
                email_sent_count: 0,
                last_email_sent_date: null,
                tenant_confirmation_status: false,
                property_dispatch: false,
              },
            },
          ],
          opts
        );

        // commit the transaction
        await session.commitTransaction();

        // logging
        logger.info(
          `#RESERVATION ASSIGN : reservation assigned successfully for the property id : ${
            propertyData._id
          }. reservation data : ${JSON.stringify(reservationPayload)} `
        );

        //sending email notification
        const profile = await Profile.findOne({
          user_id: reservationPayload.user_id,
        });
        await sendInfoEmail({
          to: profile.user_email,
          name: `${profile.first_name} ${profile.last_name}`,
          title: "Temporary Reservation Assignment",
          desc: "Your temporary reservation assignment based on the waiting list has been successfully created. You can find your reservations under the 'My Reservations' page. Please proceed with the necessary contract document submission by visiting the Reservation Details page. Failure to do so within the deadline will result in the cancellation of the temporary reservation. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
        });

        revalidatePath(`/property/view/${propertyData._id}`);
        revalidatePath("/manage-reservations");

        msg =
          "The property has been temporarily reserved. The tenant should complete the reservation process through the standard procedure to finalize it.";
        type = "ok";
      } catch (error) {
        // abort the transaction
        await session.abortTransaction();

        // logging
        logger.error(
          `#RESERVATION ASSIGN : reservation assign with property id ${
            reservationPayload.property_ref_id
          } transaction failed. Passed data ${JSON.stringify(
            reservationPayload
          )}. The error was ${JSON.stringify(error)}`
        );

        msg = "Internal Server Error. Failed to assign reservation !";
        type = "error";
      } finally {
        session.endSession();
        return {
          msg: msg,
          type: type,
        };
      }
    } else {
      // logging
      logger.error(
        `#RESERVATION ASSIGN : reservation assign with property id ${reservationPayload.property_ref_id} failed. Property is not available, when user made the reservation`
      );
      return {
        msg: "The property you are attempting to reserve isn't currently available. Please try again later.",
        type: "error",
      };
    }
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION ASSIGN : reservation assign with property id ${
        reservationPayload.property_ref_id
      } failed. Passed data ${JSON.stringify(
        reservationPayload
      )}. The error was ${JSON.stringify(error)}`
    );
    return {
      msg: "Internal Server Error. Failed to assign the reservation !",
      type: "error",
    };
  }
}

export async function getReservation(reservationId: string) {
  try {
    await connectToDatabase();
    const resId = new ObjectId(reservationId);
    const data = await Reservation.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "property_ref_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $unwind: "$property",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          user_id: 1,
          signed_documents: 1,
          created_at: 1,
          updated_at: 1,
          updated_by: 1,
          property_ref_id: 1,
          document_submission_deadline: 1,
          admin_comment: 1,
          user_comment: 1,
          from: 1,
          to: 1,
          desired_semesters_stay: 1,
          admin_assigned_reservation: 1,
          property_id: "$property.property_id",
        },
      },
      {
        $match: { _id: resId },
      },
    ]);

    const reservation =
      data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};

    return reservation;
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION GET : get reservation id ${reservationId} failed with error ${JSON.stringify(
        error
      )}`
    );
    return false;
  }
}

async function checkSubmitedDocuments(documents: string[], is_admin: boolean) {
  const user_id = await getUserId();
  // TODO handle document submission here
  await connectToDatabase();

  // checking whether document naming convention is okay
  let isDocumentsOkay = true;

  if (documents.length !== 3) {
    isDocumentsOkay = false;
    return false;
  }

  let fileNames = {
    "contract.pdf": false,
    "id.pdf": false,
    "enrollment_certificate.pdf": false,
  };
  documents.forEach((document: string) => {
    const str = document?.split("-");
    const userId = str?.[0];
    const docName = str?.[1];

    if (userId !== user_id) {
      isDocumentsOkay = false;
    }
    if (docName) {
      fileNames[docName as keyof typeof fileNames] = true;
    }
  });

  if (
    !(
      fileNames["contract.pdf"] &&
      fileNames["id.pdf"] &&
      fileNames["enrollment_certificate.pdf"]
    )
  ) {
    isDocumentsOkay = false;
  }

  // allowing admins to submit documents on behalf of a user
  if (is_admin) {
    isDocumentsOkay = true;
  }

  return isDocumentsOkay;
}

function getFilterOptions(options: FilterParamTypes) {
  let filterCriterions: any = [];
  const now = new Date();

  Object.keys(options).forEach((key) => {
    const optionKey = options[key as keyof FilterParamTypes];
    if (optionKey) {
      if (key === "id" && optionKey !== "all") {
        filterCriterions.push({
          _id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "property_id" && optionKey !== "all") {
        filterCriterions.push({
          property_id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "room_id" && optionKey !== "all") {
        filterCriterions.push({
          room_id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "user_id" && optionKey !== "all") {
        filterCriterions.push({
          user_id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "status" && optionKey !== "all") {
        filterCriterions.push({ status: optionKey });
      } else if (key === "property_type" && optionKey !== "all") {
        filterCriterions.push({ property_type: optionKey });
      } else if (key === "from" && optionKey && optionKey !== "all") {
        filterCriterions.push({
          from: {
            $gte: new Date(optionKey),
          },
        });
      } else if (key === "active") {
        filterCriterions.push({
          $or: [{ to: null }, { to: { $gt: now } }],
        });
      } else if (key === "expire") {
        filterCriterions.push({
          $and: [
            {
              document_submission_deadline: {
                $lt: now,
              },
            },
            { status: "document_submission" },
          ],
        });
      }
    }
  });
  return filterCriterions;
}

export async function getAllReservations(
  sortOption: SortOption,
  filterParams: FilterParamTypes
) {
  try {
    await connectToDatabase();
    const matchOptions: SortOption[] = getFilterOptions(filterParams);
    const data = await Reservation.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "property_ref_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $unwind: "$property",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          user_id: 1,
          signed_documents: 1,
          created_at: 1,
          updated_at: 1,
          updated_by: 1,
          property_ref_id: 1,
          admin_comment: 1,
          user_comment: 1,
          document_submission_deadline: 1,
          desired_semesters_stay: 1,
          from: 1,
          to: 1,
          property_id: "$property.property_id",
          address: "$property.address",
          room_id: "$property.room_id",
        },
      },
      {
        $match: matchOptions.length > 0 ? { $and: matchOptions } : {},
      },
      { $sort: sortOption },
    ]);
    const reservations =
      data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];

    return reservations;
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION GET ALL : get reservation all failed with error ${JSON.stringify(
        error
      )}`
    );
    return undefined;
  }
}

export async function cancelReservation(
  reservationId: string,
  propertyId: string,
  user_id: string,
  user: string,
  comment: string,
  listingEnable: boolean
) {
  let msg = "";
  let type = "";
  try {
    const conn = await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const opts = { session, new: true };

      // update reservation status
      // save comment/reason for the cancellation
      // update to date to close the reservation
      const res1 = await Reservation.updateOne(
        { _id: reservationId },
        {
          $set: {
            status: "reservation_canceled",
            admin_comment: comment,
            user_comment: "",
            to: new Date(),
          },
        },
        opts
      );

      if (res1.modifiedCount === 0) {
        throw new Error(
          "Reservation data cannot be modified or reservation not found"
        );
      }

      // if it is cancelled due to issue from admin side, decrement users used quota by one
      if (user === adminType) {
        const res2 = await Profile.updateOne(
          { user_id: user_id },
          { $inc: { used_quota: -1 } },
          opts
        );

        if (res2.modifiedCount === 0) {
          throw new Error(
            "Reservation user quota cannot be modified or user not found"
          );
        }
      }

      const res3 = await Property.updateOne(
        { _id: propertyId },
        { $set: { status: listingEnable ? "available" : "idle" } },
        opts
      );
      if (res3.modifiedCount === 0) {
        throw new Error(
          "Reservation property cannot be modified or property not found"
        );
      }

      // commit the transaction
      await session.commitTransaction();

      // logging
      logger.info(
        `#RESERVATION CANCEL : cancellation of the reservation id ${reservationId} with property id ${propertyId} is success. The passed data user_id: ${user_id} , user: ${user} , comment: ${comment} and listingEnable: ${listingEnable}.`
      );
      logger.info(
        `#RESERVATION STATUS CHANGE: reservation status change for the reservation id : ${reservationId} to reservation_canceled`
      );

      //sending email notification
      const profile = await Profile.findOne({
        user_id: user_id,
      });
      await sendInfoEmail({
        to: profile.user_email,
        name: `${profile.first_name} ${profile.last_name}`,
        title: "Reservation Status Changed",
        desc: "The status of your reservation has changed. Please visit the Reservation Details page by accessing the 'My Reservations' page. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
      });

      revalidatePath(`/reservation/${reservationId}`);

      msg = "Reservation calncelled successfully";
      type = "ok";
    } catch (error) {
      await session.abortTransaction();

      // logging
      logger.error(
        `#RESERVATION CANCEL : cancel reservation transaction failed of the reservation id ${reservationId} with property id ${propertyId} failed. The passed data user_id: ${user_id} , user: ${user} , comment: ${comment} and listingEnable: ${listingEnable}. The error was ${JSON.stringify(
          error
        )}`
      );

      msg = "Internal Server Error. Failed to cancel the reservation !";
      type = "error";
    } finally {
      session.endSession();
    }
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION CANCEL : cancel reservation failed of the reservation id ${reservationId} with property id ${propertyId} failed. The passed data user_id: ${user_id} , user: ${user} , comment: ${comment} and listingEnable: ${listingEnable}. The error was ${JSON.stringify(
        error
      )}`
    );

    msg = "Internal Server Error. Failed to cancel the reservation !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function rejectReservationDocument(
  reservationId: string,
  comment: string,
  userId: string
) {
  let msg = "";
  let type = "";
  const expiredDate = calculateFutureDate(new Date(), expirationDuration);
  try {
    await connectToDatabase();

    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          status: "document_submission",
          admin_comment: comment,
          user_comment: "",
          document_submission_deadline: expiredDate,
        },
      }
    );

    // logging
    logger.info(
      `#RESERVATION REJECT DOCUMENTS : reject documents handle success for the reservation id ${reservationId}. The passed data user_id: ${userId} and comment: ${comment}.`
    );
    logger.info(
      `#RESERVATION STATUS CHANGE: reservation status change for the reservation id : ${reservationId} to document_submission`
    );

    //sending email notification
    const profile = await Profile.findOne({
      user_id: userId,
    });
    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: "Reservation Status Changed",
      desc: "The status of your reservation has changed. Please visit the Reservation Details page by accessing the 'My Reservations' page. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Reservation documents rejected successfully";
    type = "ok";
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION REJECT DOCUMENTS : reject documents handle failed of the reservation id ${reservationId}. The passed data user_id: ${userId} and comment: ${comment}. The error was ${JSON.stringify(
        error
      )}`
    );
    msg = "Internal Server Error. Failed to reject the documents !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function approveDocument(
  reservationId: string,
  userId: string,
  fromDate: string,
  toDate: string,
  terminateDate: string
) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();

    // TODO: set existing reservation and property status
    if (terminateDate && terminateDate !== "") {
      const reservationNew = await Reservation.findById(reservationId);

      if (!reservationNew) {
        throw new Error("Reservation not found");
      }

      const oldReservation = await Reservation.findOne({
        status: "rented",
        user_id: reservationNew.user_id,
        to: { $gt: new Date() },
      });
      if (!oldReservation) {
        throw new Error("Previous reservation not found");
      }
      await Reservation.updateOne(
        { _id: oldReservation._id },
        {
          $set: {
            to: new Date(terminateDate),
            rental_end: {
              tenant_confirmation_status: true,
              property_dispatch: true,
              email_sent_count: 0,
            },
          },
        }
      );
      await Property.updateOne(
        { _id: oldReservation.property_ref_id },
        { $set: { status: "idle" } }
      );
    }

    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          status: "rented",
          user_comment: "",
          from: fromDate,
          to: toDate,
        },
      }
    );

    // logging
    logger.info(
      `#RESERVATION APPROVE DOCUMENTS : reservation with id ${reservationId} approval success. Passed data was userId : ${userId} , from date : ${fromDate} , to date : ${toDate} and terminate date : ${terminateDate}.
      }`
    );
    logger.info(
      `#RESERVATION STATUS CHANGE: reservation status change for the reservation id : ${reservationId} to rented`
    );

    //sending email notification
    const profile = await Profile.findOne({
      user_id: userId,
    });
    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: "Reservation Status Changed",
      desc: "The status of your reservation has changed. Please visit the Reservation Details page by accessing the 'My Reservations' page. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Reservation documents approved";
    type = "ok";
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION APPROVE DOCUMENTS : reservation with id ${reservationId} approval failed. Passed data was userId : ${userId} , from date : ${fromDate} , to date : ${toDate} and terminate date : ${terminateDate}. The error was ${JSON.stringify(
        error
      )}`
    );
    msg = "Internal Server Error. Failed to aprove the documents !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function handleContractDocumentSubmission(
  formDataArray: formDatPaylaod[],
  reservationId: string,
  removedFiles: string[],
  filesIndicators: string[],
  nextStatus: string,
  isAdmin: boolean,
  comment: string
): Promise<ResponseT> {
  try {
    const fileUrls = filesIndicators?.map(
      (filesIndicator) => `contracts/${reservationId}/${filesIndicator}`
    );
    const filesOkay = await checkSubmitedDocuments(filesIndicators, isAdmin);

    if (!filesOkay)
      return {
        msg: "One or more documents have been incorrectly named. Kindly adhere to the document naming guidelines.",
        type: "error",
      };

    return await updateContractFiles(
      formDataArray,
      reservationId,
      removedFiles,
      fileUrls,
      nextStatus,
      comment,
      isAdmin
    );
  } catch (error) {
    // logging
    logger.error(
      `#RESERVATION CONTRACT DOCUMENTS SUBMISSION: reservation with id ${reservationId} contract documents update failed with error ${JSON.stringify(
        error
      )}`
    );
    return {
      msg: "Failed to save constract documents",
      type: "error",
    };
  }
}
