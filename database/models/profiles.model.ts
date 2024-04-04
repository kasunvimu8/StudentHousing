import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  user_id: { type: String, required: true},
  user_name: { type: String, required: true },
  user_mobile: { type: String, required: true },
  user_address: {type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
})

const Profile = models.Profile || model('Profile', UserSchema);

export default Profile;