"use server";

import { connectToDatabase } from "@/database";
import WaitingList from "@/database/models/waiting-list.model";
import { getUserId } from "@/actions/profiles";
import { ResponseT } from "@/types";
import { revalidatePath } from "next/cache";
import { getMyReservations } from "@/actions/reservations";
import { checkCurrentReservationStatus } from "@/lib/utils";

export async function fetchExistingWaitingList() {
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
      fromDate: waitingList.from_date,
      maxRent: waitingList.max_rent,
      apartmentType: waitingList.apartment_type,
      additionalData: waitingList.additional_data,
      desiredSemesters: waitingList.desired_semesters_stay,
    };
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    return null;
  }
}

export async function saveWaitingList(data: {
  fromDate: Date;
  maxRent: number;
  apartmentType: string;
  additionalData: string;
  desiredSemesters: string;
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
      existingEntry.from_date = data.fromDate;
      existingEntry.max_rent = data.maxRent;
      existingEntry.apartment_type = data.apartmentType;
      existingEntry.additional_data = data.additionalData;
      existingEntry.desired_semesters_stay = data.desiredSemesters;

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
        from_date: data.fromDate,
        max_rent: data.maxRent,
        apartment_type: data.apartmentType,
        additional_data: data.additionalData,
        desired_semesters_stay: data.desiredSemesters,
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
    const waitingList = await WaitingList.find({
      fulfilled: false,
    });

    if (!waitingList) {
      return [];
    }

    return waitingList;
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    return [];
  }
}
