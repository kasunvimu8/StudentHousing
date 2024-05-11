import { Schema, model, models } from "mongoose";

const ReservationSchema = new Schema({
  user_id: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, required: true },
  property_ref_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  updated_by: { type: String },
  updated_at: { type: Date },
  document_submission_deadline: { type: Date },
  signed_documents: [String],
  user_comment: String,
  admin_comment: String,
  from: Date,
  to: Date,
});

ReservationSchema.pre("updateOne", function (next) {
  this.set({ updated_at: new Date() });
  next();
});

const Reservation =
  models?.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
