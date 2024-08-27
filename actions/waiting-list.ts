"use server";

import { connectToDatabase } from "@/database";
import WaitingList from "@/database/models/waiting-list.model";
import { getUserId } from "@/actions/profiles";
import { Property as PropertyType, ResponseT, WaitinRecordType } from "@/types";
import { revalidatePath } from "next/cache";
import { getMyReservations } from "@/actions/reservations";
import {
  calculateFutureDate,
  checkCurrentReservationStatus,
} from "@/lib/utils";
import mongoose from "mongoose";
import Reservation from "@/database/models/reservation.model";
import { documentSubmission, expirationDuration } from "@/constants";
import Property from "@/database/models/property.model";

export async function fetchExistingWaitingList(): Promise<WaitinRecordType | null> {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const waitingList = await WaitingList.findOne({
      user_id: userId,
      fulfilled: false,
    });

    if (!waitingList) {
      return null;
    }

    return {
      _id: waitingList._id,
      user_id: waitingList.user_id,
      from_date: waitingList.from_date,
      max_rent: waitingList.max_rent,
      apartment_type: waitingList.apartment_type,
      additional_data: waitingList.additional_data,
      desired_semesters_stay: waitingList.desired_semesters_stay,
      created_at: waitingList.created_at,
    };
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    return null;
  }
}

export async function saveWaitingList(data: {
  from_date: Date;
  max_rent: number;
  apartment_type: string;
  desired_semesters_stay: string;
  additional_data?: string;
}): Promise<ResponseT> {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const existingEntry = await WaitingList.findOne({
      user_id: userId,
      fulfilled: false,
    });

    if (existingEntry) {
      // Update existing entry
      existingEntry.from_date = data.from_date;
      existingEntry.max_rent = data.max_rent;
      existingEntry.apartment_type = data.apartment_type;
      existingEntry.additional_data = data.additional_data || "";
      existingEntry.desired_semesters_stay = data.desired_semesters_stay;

      await existingEntry.save();
      return {
        msg: "Waiting list record updated successfully",
        type: "ok",
      };
    } else {
      const currentReservations = await getMyReservations(userId);
      const currentlyReservationExists =
        checkCurrentReservationStatus(currentReservations);

      if (currentlyReservationExists) {
        return {
          msg: "You already have a active reservation and cannot be added to the waiting list",
          type: "error",
        };
      }
      // Create new entry
      const newEntry = new WaitingList({
        user_id: userId,
        from_date: data.from_date,
        max_rent: data.max_rent,
        apartment_type: data.apartment_type,
        additional_data: data.additional_data || "",
        desired_semesters_stay: data.desired_semesters_stay,
        fulfilled: false,
        created_at: new Date(),
      });

      await newEntry.save();
      revalidatePath("/properties");
      return {
        msg: "Waiting list record created successfully",
        type: "ok",
      };
    }
  } catch (error) {
    console.error("Error saving waiting list:", error);
    return {
      msg: "Internal Server Error. Cannot save the entry!",
      type: "error",
    };
  }
}

export async function deleteWaitingListEntry(): Promise<ResponseT> {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const existingEntry = await WaitingList.findOne({
      user_id: userId,
      fulfilled: false,
    });

    if (existingEntry) {
      await WaitingList.deleteOne({ user_id: userId, fulfilled: false });
      revalidatePath("/properties");
      return {
        msg: "Waiting list record deleted successfully",
        type: "ok",
      };
    } else {
      return {
        msg: "No waiting list record found to delete",
        type: "error",
      };
    }
  } catch (error) {
    console.error("Error deleting waiting list:", error);
    return {
      msg: "Internal Server Error. Cannot delete the entry!",
      type: "error",
    };
  }
}

export async function fetchAllWaitingList() {
  try {
    await connectToDatabase();
    const waitingList = await WaitingList.find({ fulfilled: false }).sort({
      created_at: 1,
    });

    if (!waitingList) {
      return [];
    }

    return JSON.parse(JSON.stringify(waitingList));
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    return [];
  }
}

export async function matchPropertyAndWaitingList(
  property: PropertyType,
  waitingList: WaitinRecordType
): Promise<ResponseT> {
  const session = await mongoose.startSession();
  session.startTransaction();
  let msg = "";
  let type: "ok" | "error" = "error";

  try {
    const opts = { session };
    const expiredDate = calculateFutureDate(new Date(), expirationDuration);

    const res1 = await Property.updateOne(
      { _id: property._id },
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
          user_id: waitingList.user_id,
          created_at: new Date(),
          property_ref_id: property._id,
          from: waitingList.from_date,
          to: property.to,
          document_submission_deadline: expiredDate,
          desired_semesters_stay: waitingList.desired_semesters_stay,
          notice_period: property.notice_period,
          admin_assigned_reservation: false, // Seems this name is confliting here with swap case: eventhough this is admin assigned, have to set false
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

    const res2 = await WaitingList.updateOne(
      { _id: waitingList._id },
      { $set: { fulfilled: true } },
      opts
    );
    if (res2.modifiedCount === 0) {
      throw new Error("Waitging List record cannot be modified or not found");
    }

    // commit the transaction
    await session.commitTransaction();
    revalidatePath("/manage-waiting-list");

    msg = "Waiting List record and property reservation successfully completed";
    type = "ok";
  } catch (error) {
    // abort the transaction
    await session.abortTransaction();

    console.log(
      "Exception in waiting list record and property reservation transaction ",
      error
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
