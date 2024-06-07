"use server";

import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";
import mongoose from "mongoose";
import Reservation from "@/database/models/reservation.model";
import { revalidatePath } from "next/cache";

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
