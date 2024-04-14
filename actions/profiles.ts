import { connectToDatabase } from "@/database";
import Profiles from "@/database/models/profiles.model";

export async function getProfiles() {
  await connectToDatabase();

  const user = await Profiles.find({});
  console.log(JSON.parse(JSON.stringify(user)));

  return "ss";
}

export async function getUserType() {
  await connectToDatabase();

  return "admin";
}
