import { Schema, model, models } from "mongoose";

const ReservationSchema = new Schema({
  user_id: { type: String, required: true },
  property_id: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  signed_documents: [String],
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  created_by: { type: Date, required: true },
  updated_by: { type: Date, required: true },
})

const Reservation = models.Reservation || model('Reservation', ReservationSchema);

export default Reservation;