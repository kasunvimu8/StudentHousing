import { connectToDatabase } from "@/database";
import Reservation from "@/database/models/reservation.model";

export async function getReservations() {
  await connectToDatabase();
  
  const reservations = await Reservation.find({});
  console.log(JSON.parse(JSON.stringify(reservations)));

  return "ss";
}
