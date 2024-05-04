import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true },
  user_name: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
  totalQuota: { type: Number },
  usedQuota: { type: Number },
});

const Profile = models?.Profile || model("Profile", ProfileSchema);

export default Profile;
