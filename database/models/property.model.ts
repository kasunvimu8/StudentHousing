import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
  title: String,
  address: String,
  from: Date,
  to: Date,
  beds: Number,
  size: Number,
  type: String,
  cold_rent: Number,
  incidential_cost: Number,
  one_time_cost: Number,
  warm_rent: Number,
  deposit: Number,
  longitude: Number,
  latitude: Number,
  created_at: Date,
  updated_at: Date,
  created_by: String,
  updated_by: String,
  equipments: [String],
  documents: [String],
  images: [String],
  status: String,
  city: String,
  rooms: Number,
  property_type: String,
  floor: String,
  additional_information: String,
  notice_period: Number,
  property_id: { required: true, unique: true, type: String },
  room_id: String,
  thumbnail_url: String,
});

PropertySchema.pre("updateOne", function (next) {
  this.set({ updated_at: new Date() });
  next();
});

const Property = models?.Property || model("Property", PropertySchema);

export default Property;
