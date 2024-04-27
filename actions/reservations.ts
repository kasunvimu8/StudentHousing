import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";
import { reservationPayload, ReservationType } from "@/types";
import { getProperty, updateProperty } from "./properties";
import { getUserAvailableQuota } from "./profiles";
import Property from "@/database/models/property.model";
import { revalidatePath } from "next/cache";
import Profile from "@/database/models/profiles.model";

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

    let reservationData: ReservationType[] = [];
    const data = await Reservation.find({ user_id: userId });
    const reservations =
      data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];

    if (data.length > 0) {
      reservationData = reservations.map((reservation: ReservationType) => {
        const { detail, ...rest } = reservation;
        return { ...detail, ...rest };
      });
    }

    // if (data.length > 0) {
    //   const allProperties = reservations.map((reservation: ReservationType) => {
    //     return getProperty(reservation.property_ref_id);
    //   });
    //   const AllPropertyData = await Promise.all(allProperties);

    //   reservations.forEach((reservation: ReservationType) => {
    //     const property = AllPropertyData.find(
    //       (property) => property._id === reservation.property_ref_id
    //     );
    //     if (property) {
    //       reservationData.push({ ...reservation, ...property });
    //     } else {
    //       reservationData.push({ ...reservation });
    //     }
    //   });
    // }

    return reservationData;
  } catch (error) {
    console.log(`Failed to fetch reservations for user id ${userId}`, error);
    return undefined;
  }
}

export async function makeReservation(reservationPayload: reservationPayload) {
  try {
    await connectToDatabase();
    const quota: number = await getUserAvailableQuota(
      reservationPayload.user_id
    );
    if (quota > 0) {
      // proceed reservation
      const property = await getProperty(reservationPayload.property_ref_id);
      if (property && property.status === "available") {
        // property is still available
        try {
          // reserve the property
          await Property.updateOne(
            { _id: property._id },
            { $set: { ...property, status: "reserved" } }
          );
          revalidatePath(`/property/view/${property._id}`);

          // add reservation entry
          await Reservation.create({
            status: "document_submission",
            user_id: reservationPayload.user_id,
            created_at: new Date(),
            property_ref_id: reservationPayload.property_ref_id,
            detail: reservationPayload.detail,
          });
          revalidatePath("/my-reservations");

          // reduce the quota of the user
          await Profile.updateOne(
            { user_id: reservationPayload.user_id },
            { $inc: { quota: -1 } }
          );
          revalidatePath("/my-profile");

          return {
            msg: "Property reserved successfully for a temporary period. Please visit my reservation page to upload signed contracts promptly",
            type: "ok",
          };
        } catch (err) {
          return {
            msg: "Internal Server Error. Failed to create reservation entries !",
            type: "error",
          };
        }
      } else {
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
