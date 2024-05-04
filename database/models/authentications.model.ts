import { Schema, model, models } from "mongoose";

const AuthSchema = new Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true },
  role : { type: String, required: true},
  password: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
});

const Authentication =
  models?.Authentication || model("Authentication", AuthSchema);

export default Authentication;
