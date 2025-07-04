import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true },
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  // enrollment_id: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
  total_quota: { type: Number },
  used_quota: { type: Number },
  address: { type: String },
  country: { type: String },
  nationalId: { type: String },
  mobile: { type: String },
  gender: { type: String },
  dob: { type: Date },
  passport: { type: String },
  phone: {
    number: { type: String },
    countryCode: { type: String },
  },
});

ProfileSchema.pre("updateOne", function (next) {
  this.set({ updated_at: new Date() });
  next();
});

const Profile = models?.Profile || model("Profile", ProfileSchema);

export default Profile;
