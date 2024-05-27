"use server";

import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
import Property from "@/database/models/property.model";
import Reservation from "@/database/models/reservation.model";

export async function getSummaryData() {
  let data = {
    totalProperties: 0,
    availableProperties: 0,
    reservedProperties: 0,
    totalReservations: 0,
    rentedReservation: 0,
    cancelled: 0,
    deadlineMissed: 0,
    approvalWaiting: 0,
    documentSubmission: 0,
    users: 0,
  };
  try {
    await connectToDatabase();

    const properties = Property.find(
      {},
      {
        status: 1,
      }
    );
    const reservation = Reservation.find(
      {},
      {
        status: 1,
      }
    );
    const users = Profile.countDocuments();
    const [propertiesData, reservationData, usersData] = await Promise.all([
      properties,
      reservation,
      users,
    ]);

    data = {
      totalProperties: propertiesData.length || 0,
      availableProperties:
        propertiesData?.filter((property) => property.status === "available")
          ?.length || 0,
      reservedProperties:
        propertiesData?.filter((property) => property.status === "reserved")
          ?.length || 0,
      totalReservations: reservationData.length || 0,
      rentedReservation:
        reservationData?.filter((property) => property.status === "rented")
          ?.length || 0,
      cancelled:
        reservationData?.filter(
          (property) => property.status === "reservation_canceled"
        )?.length || 0,
      deadlineMissed: 0,
      approvalWaiting:
        reservationData?.filter(
          (property) => property.status === "document_review"
        )?.length || 0,
      documentSubmission:
        reservationData?.filter(
          (property) => property.status === "document_submission"
        )?.length || 0,
      users: usersData,
    };

    return data;
  } catch (error) {
    console.log("Failed to get summary data", error);
    return data;
  }
}
