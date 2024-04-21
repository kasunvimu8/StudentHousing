import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";

export async function getReservations() {
  await connectToDatabase();

  const reservations = await Reservation.find({});
  console.log(JSON.parse(JSON.stringify(reservations)));

  return "ss";
}

export async function getReservationExist(_id: string) {
  try {
    await connectToDatabase();

    const data = await Reservation.find({ property_ref_id: _id });
    return data.length > 0;
  } catch (error) {
    throw new Error("Failed to fetch all properties.");
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
    throw new Error("Failed to fetch all properties.");
  }
}
