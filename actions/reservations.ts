"use server";

import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";
import { Property as PropertyType, reservationPayload } from "@/types";
import { getProperty, updateProperty } from "./properties";
import { getUserAvailableQuota } from "./profiles";
import Property from "@/database/models/property.model";
import { revalidatePath } from "next/cache";
import Profile from "@/database/models/profiles.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

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
          from: "$property.from",
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
    await Property.updateOne(
      { _id: propertyData._id },
      { $set: { status: "reserved" } },
      opts
    );

    // add reservation entry
    await Reservation.create(
      [
        {
          status: "document_submission",
          user_id: reservationPayload.user_id,
          created_at: new Date(),
          property_ref_id: reservationPayload.property_ref_id,
        },
      ],
      opts
    );

    // reduce the quota of the user
    await Profile.updateOne(
      { user_id: reservationPayload.user_id },
      { $inc: { usedQuota: 1 } },
      opts
    );

    // commit the transaction
    await session.commitTransaction();
    revalidatePath(`/property/view/${propertyData._id}`);
    revalidatePath("/my-reservations");
    revalidatePath("/my-profile");

    msg =
      "Property reserved successfully for a temporary period. Please visit my reservation page to upload signed contracts promptly";
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

export async function makeReservation(reservationPayload: reservationPayload) {
  try {
    const conn = await connectToDatabase();
    const quota: number = await getUserAvailableQuota(
      reservationPayload.user_id
    );
    if (quota > 0) {
      // proceed reservation
      const propertyData = await getProperty(
        reservationPayload.property_ref_id
      );
      if (propertyData && propertyData.status === "available") {
        const session = await mongoose.startSession();
        session.startTransaction();

        return await performReservation(reservationPayload, propertyData);
      } else {
        console.log(
          "Property is not available, when user made the reservation"
        );
        return {
          msg: "The property you are attempting to reserve isn't currently available. Please try again later.",
          type: "error",
        };
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
  user_id: string
) {
  // TODO handle document submission here
  await connectToDatabase();

  let msg = "";
  let type = "";

  // checking whehter document naming convention is okay
  let isDocumentsOkay = true;
  documents.forEach((document: { id: string; name: string }) => {
    const userId = document?.name?.split("-")?.[0];
    if (userId !== user_id) {
      isDocumentsOkay = false;
    }
  });

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
      { $set: { status: nextStatus, signed_documents: documentUrls } }
    );

    msg = "Documents uploaded successfully";
    type = "ok";
    revalidatePath("/my-reservations");
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
