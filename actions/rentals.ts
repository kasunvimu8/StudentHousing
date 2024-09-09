"use server";

import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";
import mongoose from "mongoose";
import Reservation from "@/database/models/reservation.model";
import { revalidatePath } from "next/cache";
import { FilterParamTypes, ReservationType, SortOption } from "@/types";
import { formatDateTime, isWithinNextMonths } from "@/lib/utils";
import { defaultNoticePeriod } from "@/constants";
import { sendInfoEmail, sendRentalEndEmail } from "@/lib/email";
import Profile from "@/database/models/profiles.model";
import logger from "@/lib/logger";

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

    const reservation = await Reservation.findById(reservationId);
    const profile = await Profile.findOne({
      user_id: reservation.user_id,
    });

    // logging
    logger.info(
      `#RENTAL PERIOD UPDATE : rental period has updated sucessfully of the reservation ${reservationId}, from data : ${fromDate}, to date : ${toDate}`
    );

    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: "Rental Period Updated",
      desc: "The rental period has been successfully updated by the administrator. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });

    revalidatePath(`/reservation/${reservationId}`);
    msg = "Rental period updated successfully";
    type = "ok";
  } catch (error) {
    // logging
    logger.error(
      `#RENTAL PERIOD UPDATE :  rental period update failed of the reservation ${reservationId}, from data : ${fromDate}, to date : ${toDate} with error: ${JSON.stringify(
        error
      )}`
    );

    msg = "Internal Server Error. Failed to update rental period !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function getAllRentals(
  sortOption: SortOption,
  filterParams: FilterParamTypes
) {
  try {
    await connectToDatabase();

    let matchOptions: any = [];
    Object.keys(filterParams).forEach((key) => {
      const optionKey = filterParams[key as keyof FilterParamTypes];
      if (optionKey) {
        if (key === "id" && optionKey !== "all") {
          matchOptions.push({
            _id: {
              $regex: optionKey,
              $options: "i",
            },
          });
        } else if (key === "property-id" && optionKey !== "all") {
          matchOptions.push({
            property_id: {
              $regex: optionKey,
              $options: "i",
            },
          });
        } else if (key === "user-id" && optionKey !== "all") {
          matchOptions.push({
            user_id: {
              $regex: optionKey,
              $options: "i",
            },
          });
        } else if (key === "confirm") {
          matchOptions.push({
            rental_end_tenant_confirmation_status: optionKey === "true",
          });
        } else if (key === "dispatch") {
          matchOptions.push({
            rental_end_property_dispatch: optionKey === "true",
          });
        }
      }
    });
    matchOptions.push({ status: "rented" });

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
          user_id: 1,
          updated_at: 1,
          property_ref_id: 1,
          from: 1,
          status: 1,
          to: 1,
          notice_period: 1,
          rental_end_email_sent_count: "$rental_end.email_sent_count",
          rental_end_last_email_sent_date: "$rental_end.last_email_sent_date",
          rental_end_tenant_confirmation_status:
            "$rental_end.tenant_confirmation_status",
          rental_end_property_dispatch: "$rental_end.property_dispatch",
          property_id: "$property.property_id",
          address: "$property.address",
          room_id: "$property.room_id",
          days_to_end_rental: {
            $trunc: {
              $divide: [{ $subtract: ["$to", "$$NOW"] }, 1000 * 60 * 60 * 24],
            },
          },
        },
      },
      {
        $match: matchOptions.length > 0 ? { $and: matchOptions } : {},
      },
      { $sort: sortOption },
    ]);
    const reservations =
      data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];

    const filteredReservations = filterParams.hasOwnProperty("rental-end")
      ? reservations?.filter(
          (reservation: ReservationType) =>
            reservation.status === "rented" &&
            isWithinNextMonths(
              reservation.to,
              reservation.notice_period || defaultNoticePeriod
            )
        )
      : reservations;

    return filteredReservations;
  } catch (error) {
    console.log("Failed to fetch all rentals ", error);
    return undefined;
  }
}

export async function handleRelistingProperty(
  date: string,
  reservationId: string,
  propertyId: string,
  status: string
) {
  let msg = "";
  let type = "";
  try {
    const conn = await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const opts = { session, new: true };

      // update reservation rental details
      // update property date and status

      const res1 = await Reservation.updateOne(
        { _id: reservationId },
        {
          $set: {
            "rental_end.property_dispatch": true,
          },
        },
        opts
      );

      if (res1.modifiedCount === 0) {
        throw new Error(
          "Reservation data cannot be modified or reservation not found"
        );
      }

      const res2 = await Property.updateOne(
        { _id: propertyId },
        { $set: { status: status, from: date } },
        opts
      );

      if (res2.modifiedCount === 0) {
        throw new Error("Property cannot be relisted");
      }

      // commit the transaction
      await session.commitTransaction();

      // logging
      logger.info(
        `#RENTAL RELISITING : rented property relisting handle of the property id ${propertyId} sucessfully completed for the exiting reservation ${reservationId}. Property is set to availabel from ${date} and status is set to ${status}`
      );
      revalidatePath("/", "layout");

      msg = "Property changed successfully";
      type = "ok";
    } catch (error) {
      await session.abortTransaction();

      // logging
      logger.error(
        `#RENTAL RELISITING : rented property relisting transaction handle of the property id ${propertyId} failed. reservation details are id : ${reservationId} , from : ${date} , status : ${status}. The error was ${JSON.stringify(
          error
        )}`
      );

      msg = "Internal Server Error. Failed to relist the property !";
      type = "error";
    } finally {
      session.endSession();
    }
  } catch (error) {
    // logging
    logger.error(
      `#RENTAL RELISITING : rented property relisting handle of the property id ${propertyId} failed. reservation details are id : ${reservationId} , from : ${date} , status : ${status}. The error was ${JSON.stringify(
        error
      )}`
    );
    msg = "Internal Server Error. Failed to relist the property !";
    type = "error";
  }

  return {
    msg,
    type,
  };
}

export async function getRental(reservationId: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.findOne({ _id: reservationId });
    const reservation =
      data &&
      isWithinNextMonths(data.to, data.notice_period || defaultNoticePeriod)
        ? JSON.parse(JSON.stringify(data))
        : undefined;

    return reservation;
  } catch (error) {
    console.log(`Failed to fetch reservation ${reservationId}`, error);
    return undefined;
  }
}

export async function confirmMovingOut(reservationId: string) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();
    const now = new Date();

    const res = await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          "rental_end.tenant_confirmation_status": true,
          "rental_end.tenant_confirmation_date": now,
        },
      }
    );

    // logging
    logger.info(
      `#RENTAL MOVEOUT CONFIRM : Successfully confirmed move-out for tenant with reservation ID ${reservationId}`
    );

    revalidatePath(`/confirm-move-out/${reservationId}`);
    revalidatePath("/manage-rentals");
    msg = "Moving out confirmed successfully";
    type = "ok";

    const reservation = await Reservation.findById(reservationId);
    const profile = await Profile.findOne({
      user_id: reservation.user_id,
    });
    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: "Moving Out Confirmed",
      desc: "Your move-out has been successfully confirmed. Thank you for your cooperation. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });
  } catch (error) {
    // logging
    logger.error(
      `#RENTAL MOVEOUT CONFIRM : confirmed move-out handling process failed for tenant with reservation ID ${reservationId}. The error was ${JSON.stringify(
        error
      )}`
    );

    msg = "Internal Server Error. Failed to confirm move out.";
    type = "error";
  } finally {
    return {
      msg,
      type,
    };
  }
}

export async function sendRentalEndConfirmationEmail(reservation_id: string) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const opts = { session, new: true };

      const now = new Date();
      const reservation = await Reservation.findById(reservation_id);
      const profileData = await Profile.findOne({
        user_id: reservation.user_id,
      });
      const endDate = reservation.to
        ? formatDateTime(new Date(String(reservation.to))).simpleDate
        : "-";

      if (!(profileData && profileData.user_email)) {
        // logging
        logger.error(
          `#RENTAL SENT EMAIL CONFIRMATION : rental end email confirmation send process failed for tenant with reservation ID ${reservation_id}. User email is not found.`
        );

        msg =
          "Error occured while processing moving-out email confirmation request";
        type = "error";
      } else {
        if (reservation?.rental_end?.tenant_confirmation_status) {
          msg = "The tenant has already confirmed the moving-out.";
          type = "ok";
        } else {
          const link = `${process.env.BASE_URL}/confirm-move-out/${reservation_id}`;
          const res1 = await sendRentalEndEmail({
            to: profileData.user_email,
            userName: `${profileData.first_name} ${profileData.last_name}`,
            actionLink: link,
            body: `Your rental contract is ending soon.
            Please confirm with us the your moving out date on ${endDate}, by visiting the link below.
            If you need further extentions for valid reasons, you may contact administrator immediately listed in the student housing contact page.
            If we do not hear from you within the next 7 days, we will assume that you plan to move out on ${endDate}, and no further alterations will be possible later.`,
          });

          if (res1.type !== "ok") {
            throw new Error(
              "Failed to send moving-out email confirmation request"
            );
          }

          const res2 = await Reservation.updateOne(
            { _id: reservation_id },

            {
              $inc: {
                "rental_end.email_sent_count": 1,
              },
              $set: {
                "rental_end.last_email_sent_date": now,
              },
            },
            opts
          );

          if (res2.modifiedCount === 0) {
            throw new Error("Rental Details did not update successfully");
          }

          // commit the transaction
          await session.commitTransaction();

          // logging
          logger.info(
            `#RENTAL SENT EMAIL CONFIRMATION : email confirmation is successfully sent to the user with user id ${
              profileData.user_id
            } and email ${
              profileData.user_email
            } with the reservation id ${reservation_id}. Total sent emails : ${
              reservation?.rental_end?.email_sent_count + 1
            }`
          );
          revalidatePath("/manage-rentals");

          msg = "Moving out confirmation email sent successfully";
          type = "ok";
        }
      }
    } catch (error) {
      await session.abortTransaction();
      // logging
      logger.error(
        `#RENTAL SENT EMAIL CONFIRMATION : rental end email confirmation send transaction process failed for tenant with reservation ID ${reservation_id}. The error was ${JSON.stringify(
          error
        )}.`
      );

      msg =
        "Error occured while processing  moving-out email confirmation request. Please try again later.";
      type = "error";
    }
  } catch (error) {
    // logging
    logger.error(
      `#RENTAL SENT EMAIL CONFIRMATION : rental end email confirmation send process failed for tenant with reservation ID ${reservation_id}. The error was ${JSON.stringify(
        error
      )}.`
    );

    msg = "Internal Server Error. Failed to relist the property !";
    type = "error";
  }
  return {
    msg,
    type,
  };
}
