"use server";

import { defaultNoticePeriod } from "@/constants";
import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
import Property from "@/database/models/property.model";
import Reservation from "@/database/models/reservation.model";
import { isWithinNextMonths } from "@/lib/utils";

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
    tanentNotConfirmed: 0,
    propertyNotDispatched: 0,
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
        document_submission_deadline: 1,
        to: 1,
        rental_end: 1,
        notice_period: 1,
      }
    );
    const users = Profile.countDocuments();
    const [propertiesData, reservationData, usersData] = await Promise.all([
      properties,
      reservation,
      users,
    ]);
    const now = new Date();
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
        reservationData?.filter(
          (reservation) => reservation.status === "rented"
        )?.length || 0,

      cancelled:
        reservationData?.filter(
          (reservation) => reservation.status === "reservation_canceled"
        )?.length || 0,

      deadlineMissed:
        reservationData?.filter(
          (reservation) =>
            reservation.document_submission_deadline < now &&
            reservation.status === "document_submission"
        )?.length || 0,

      approvalWaiting:
        reservationData?.filter(
          (reservation) => reservation.status === "document_review"
        )?.length || 0,

      documentSubmission:
        reservationData?.filter(
          (reservation) => reservation.status === "document_submission"
        )?.length || 0,

      users: usersData,

      tanentNotConfirmed:
        reservationData?.filter(
          (reservation) =>
            reservation.status === "rented" &&
            isWithinNextMonths(
              reservation.to,
              reservation.notice_period || defaultNoticePeriod
            ) &&
            !reservation.rental_end.tenant_confirmation_status
        )?.length || 0,

      propertyNotDispatched:
        reservationData?.filter(
          (reservation) =>
            reservation.status === "rented" &&
            isWithinNextMonths(
              reservation.to,
              reservation.notice_period || defaultNoticePeriod
            ) &&
            reservation.rental_end.tenant_confirmation_status &&
            !reservation.rental_end.property_dispatch
        )?.length || 0,
    };

    return data;
  } catch (error) {
    console.log("Failed to get summary data", error);
    return data;
  }
}
