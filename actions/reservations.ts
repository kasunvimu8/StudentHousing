"use server";

import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";
import {
  FilterParamTypes,
  Property as PropertyType,
  reservationPayload,
  ReservationType,
  SortOption,
} from "@/types";
import { getProperty } from "./properties";
import { getUserAvailableQuota, getUserId } from "./profiles";
import Property from "@/database/models/property.model";
import { revalidatePath } from "next/cache";
import Profile from "@/database/models/profiles.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { adminType } from "@/constants";

export async function getReservationExist(_id: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.find({ property_ref_id: _id });
    return data.length > 0;
  } catch (error) {
    console.log("Failed to get reservation exist.", error);
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
    console.log("Failed to fetch get reservation status.", error);
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
    console.log(`Failed to fetch reservations for user id ${userId}`, error);
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
          status: "document_submission",
          user_id: reservationPayload.user_id,
          created_at: new Date(),
          property_ref_id: reservationPayload.property_ref_id,
          from: propertyData.from,
          to: propertyData.to,
        },
      ],
      opts
    );

    // reduce the quota of the user
    const res2 = await Profile.updateOne(
      { user_id: reservationPayload.user_id },
      { $inc: { usedQuota: 1 } },
      opts
    );

    if (res2.modifiedCount === 0) {
      throw new Error(
        "Profile quota Cannot be modified or not found of the user"
      );
    }

    // commit the transaction
    await session.commitTransaction();
    revalidatePath(`/property/view/${propertyData._id}`);
    revalidatePath("/my-reservations");
    revalidatePath("/my-profile");

    msg =
      "Property reserved successfully for a temporary period. Please visit my reservation page to upload documents to complete the process";
    type = "ok";
  } catch (error) {
    // abort the transaction
    await session.abortTransaction();

    console.log("Exception in reservation transaction ", error);
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

function checkCurrentReservationStatus(reservations: ReservationType[]) {
  const now = new Date();

  for (const reservation of reservations) {
    const endDate = reservation.to ? new Date(reservation.to) : null;

    // Check if end date is in the future or not available
    if (!endDate || endDate > now) {
      return true;
    }
  }

  return false;
}

export async function makeReservation(reservationPayload: {
  property_ref_id: string;
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
            { ...reservationPayload, user_id: userId },
            propertyData
          );
        } else {
          console.log(
            "Property is not available, when user made the reservation"
          );
          return {
            msg: "The property you are attempting to reserve isn't currently available. Please try again later.",
            type: "error",
          };
        }
      }
    } else {
      return {
        msg: "You have reached your reservation quota limit. No further reservations can be made",
        type: "error",
      };
    }
  } catch (error) {
    console.log("Failed to make the reservation.", error);

    return {
      msg: "Internal Server Error. Failed to make the reservation !",
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
          admin_comment: 1,
          user_comment: 1,
          from: 1,
          to: 1,
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
    console.log(`Failed to get reservation ${reservationId}`, error);
    return false;
  }
}

export async function submitDocuments(
  documents: any,
  reservationId: string,
  nextStatus: string,
  is_admin: boolean,
  comment: string
) {
  const user_id = await getUserId();
  // TODO handle document submission here
  await connectToDatabase();

  let msg = "";
  let type = "";

  // checking whehter document naming convention is okay
  let isDocumentsOkay = true;
  documents.forEach((document: { id: string; name: string }) => {
    const str = document?.name?.split("-");
    const userId = str?.[0];
    const RefId = str?.[1];
    if (userId !== user_id) {
      isDocumentsOkay = false;
    }
    if (RefId !== reservationId) {
      isDocumentsOkay = false;
    }
  });

  // allowing admins to submit documents on behalf of a user
  if (is_admin) {
    isDocumentsOkay = true;
  }

  if (!isDocumentsOkay)
    return {
      msg: "One or more documents have been incorrectly named. Kindly adhere to the document naming guidelines.",
      type: "error",
    };

  try {
    const documentUrls = documents.map(
      (doc: { id: string; name: string }) =>
        `${process.env.STORAGE_SERVICE_URL}${doc.name}`
    );
    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          status: nextStatus,
          signed_documents: documentUrls,
          user_comment: comment,
          admin_comment: "",
        },
      }
    );

    msg = "Documents uploaded successfully";
    type = "ok";

    if (is_admin) {
      revalidatePath("/manage-reservations");
    } else {
      revalidatePath("/my-reservations");
    }
  } catch (error) {
    console.log("Exception in reservation transaction ", error);
    msg = "Internal Server Error. Failed to create reservation entries !";
    type = "error";
  } finally {
    return {
      msg: msg,
      type: type,
    };
  }
}

function getFilterOptions(options: FilterParamTypes) {
  let filterCriterions: any = [];

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
    console.log("Failed to fetch all reservations ", error);
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
          { $inc: { usedQuota: -1 } },
          opts
        );

        if (res2.modifiedCount === 0) {
          throw new Error(
            "Reservation user quota cannot be modified or user not found"
          );
        }
      }

      // if the listing enabled, then update the state of the property to available
      if (listingEnable) {
        const res3 = await Property.updateOne(
          { _id: propertyId },
          { $set: { status: "available" } },
          opts
        );
        if (res3.modifiedCount === 0) {
          throw new Error(
            "Reservation property cannot be modified or property not found"
          );
        }
      }

      // commit the transaction
      await session.commitTransaction();

      revalidatePath(`/reservation/${reservationId}`);

      msg = "Reservation calncelled successfully";
      type = "ok";
    } catch (error) {
      await session.abortTransaction();

      console.log("Exception in reservation transaction", error);
      msg = "Internal Server Error. Failed to cancel the reservation !";
      type = "error";
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log("Failed to cancel the reservation.", error);
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
  comment: string
) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();

    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          status: "document_submission",
          admin_comment: comment,
          user_comment: "",
        },
      }
    );

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Reservation documents rejected successfully";
    type = "ok";
  } catch (error) {
    console.log("Failed to reject the documents.", error);
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
  fromDate: string,
  toDate: string
) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();

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

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Reservation documents rejected successfully";
    type = "ok";
  } catch (error) {
    console.log("Failed to reject the documents.", error);
    msg = "Internal Server Error. Failed to reject the documents !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function updateRentalPeriod(
  reservationId: string,
  fromDate: string,
  toDate: string
) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();

    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          from: fromDate,
          to: toDate,
        },
      }
    );

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Rental period updated successfully";
    type = "ok";
  } catch (error) {
    console.log("Failed to update rental period.", error);
    msg = "Internal Server Error. Failed to update rental period !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}
