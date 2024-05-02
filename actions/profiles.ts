"use server";

import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
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

export async function getUserAvailableQuota(userId: string) {
  try {
    await connectToDatabase();

    const data = await Profile.find({ user_id: userId });
    const profile = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};
    const availabelQuota: number =
      (!(isNaN(profile.totalQuota) || isNaN(profile.usedQuota)))
        ? profile.totalQuota - profile.usedQuota
        : 0;

    return availabelQuota;
  } catch (error) {
    console.log("Failed to get user quota details", error);
    return 0;
  }
}
