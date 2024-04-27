import mongoose, { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  if (mongoose && mongoose.connect) {
    cached.promise =
      cached.promise ||
      mongoose
        .connect(MONGODB_URI, {
          dbName: process.env.DB_NAME,
          bufferCommands: false,
        })
        .then((cn) => {})
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
        });

    cached.conn = await cached.promise;
  }

  return cached.conn;
};
