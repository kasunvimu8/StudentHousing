import { Schema, model, models } from "mongoose";

const WaitingListSchema = new Schema({
  user_id: { type: String, required: true },
  from_date: { type: Date, required: true },
  max_rent: { type: Number, required: true },
  apartment_type: { type: String, required: true },
  desired_semesters_stay: { type: String, required: true },
  additional_data: { type: String },
  fulfilled: { type: Boolean, required: true, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

WaitingListSchema.pre("updateOne", function (next) {
  this.set({ updated_at: new Date() });
  next();
});

const WaitingList =
  models?.WaitingList || model("WaitingList", WaitingListSchema);

export default WaitingList;
