import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true },
  user_name: { type: String, required: true },
  // enrollment_id: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
  total_quota: { type: Number },
  used_quota: { type: Number },
});

ProfileSchema.pre("updateOne", function (next) {
  this.set({ updated_at: new Date() });
  next();
});

const Profile = models?.Profile || model("Profile", ProfileSchema);

export default Profile;
