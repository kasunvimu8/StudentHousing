"use server";

import { connectToDatabase } from "@/database";

export async function getSummaryData() {
  let data = {
    totalProperties: 0,
    availableProperties: 0,
    rentedProperties: 0,
    totalReservations: 0,
    activeReservation: 0,
    cancelled: 0,
    deadlineMissed: 0,
    approvalWaiting: 0,
    documentSubmission: 0,
    users: 0,
  };
  try {
    await connectToDatabase();

    

    return data;
  } catch (error) {
    console.log("Failed to get summary data", error);
    return data;
  }
}
