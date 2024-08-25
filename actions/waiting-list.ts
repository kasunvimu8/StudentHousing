"use server";

import { connectToDatabase } from "@/database";
import WaitingList from "@/database/models/waiting-list.model";
import { getUserId } from "@/actions/profiles";
import { ResponseT } from "@/types";

export async function fetchExistingWaitingList() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const waitingList = await WaitingList.findOne({ user_id: userId });

    if (!waitingList) {
      return null;
    }

    return {
      fromDate: waitingList.from_date,
      maxRent: waitingList.max_rent,
      apartmentType: waitingList.apartment_type,
      additionalData: waitingList.additional_data,
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
}): Promise<ResponseT> {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const existingEntry = await WaitingList.findOne({ user_id: userId });

    if (existingEntry) {
      // Update existing entry
      existingEntry.from_date = data.fromDate;
      existingEntry.max_rent = data.maxRent;
      existingEntry.apartment_type = data.apartmentType;
      existingEntry.additional_data = data.additionalData;

      await existingEntry.save();
      return {
        msg: "Waiting list record updated successfully",
        type: "ok",
      };
    } else {
      // Create new entry
      const newEntry = new WaitingList({
        user_id: userId,
        from_date: data.fromDate,
        max_rent: data.maxRent,
        apartment_type: data.apartmentType,
        additional_data: data.additionalData,
        created_at: new Date(),
      });

      await newEntry.save();
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
    const existingEntry = await WaitingList.findOne({ user_id: userId });

    if (existingEntry) {
      await WaitingList.deleteOne({ user_id: userId });
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
