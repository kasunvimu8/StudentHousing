"use server";

import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";
import mongoose from "mongoose";
import Reservation from "@/database/models/reservation.model";
import { revalidatePath } from "next/cache";
import { FilterParamTypes, ReservationType, SortOption } from "@/types";
import { formatDateTime, isWithinNextMonths } from "@/lib/utils";
import { defaultNoticePeriod } from "@/constants";
import { sendRentalEndEmail } from "@/lib/email";
import Profile from "@/database/models/profiles.model";

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
            $dateDiff: {
              startDate: "$$NOW",
              endDate: "$to",
              unit: "day",
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
  propertyId: string
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
        { $set: { status: "available", from: date } },
        opts
      );

      if (res2.modifiedCount === 0) {
        throw new Error("Property cannot be relisted");
      }

      // commit the transaction
      await session.commitTransaction();
      revalidatePath("/", "layout");

      msg = "Property relisted successfully";
      type = "ok";
    } catch (error) {
      await session.abortTransaction();

      console.log("Exception in relisting transaction", error);
      msg = "Internal Server Error. Failed to relist the property !";
      type = "error";
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log("Failed to relist the property.", error);
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
    msg = "Moving out confirmed successfully";
    type = "ok";

    revalidatePath(`/confirm-move-out/${reservationId}`);
    revalidatePath("/manage-rentals");
  } catch (error) {
    console.log(`Failed to confirm move out ${reservationId}`, error);
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
        console.log(
          `Failed to find user email for reservation id - ${reservation_id}`
        );
        msg =
          "Error occured while processing moving-out email confirmation request";
        type = "error";
      } else {
        if (reservation?.rental_end?.tenant_confirmation_status) {
          msg = "The tenant has already confirmed the moving-out.";
          type = "ok";
        } else {
          const resetLink = `${process.env.BASE_URL}/confirm-move-out/${reservation_id}`;
          const res1 = await sendRentalEndEmail({
            to: profileData.user_email,
            userName: profileData.user_name,
            actionLink: resetLink,
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
          revalidatePath("/manage-rentals");

          msg = "Moving out confirmation email sent successfully";
          type = "ok";
        }
      }
    } catch (error) {
      await session.abortTransaction();
      console.log(
        `Failed to send moving-out email confirmation request - ${reservation_id}`,
        error
      );
      msg =
        "Error occured while processing  moving-out email confirmation request. Please try again later.";
      type = "error";
    }
  } catch (error) {
    console.log("Failed to relist the property.", error);
    msg = "Internal Server Error. Failed to relist the property !";
    type = "error";
  }
  return {
    msg,
    type,
  };
}
