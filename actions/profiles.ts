"use server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
import { decrypt } from "@/lib/session";

export async function getProfiles() {
  const session = cookies().get("session")?.value;
  const payload: any = await decrypt(session);
  const userId = payload?.user?.user_id;
  let userData;

  try {
    if (userId) {
      await connectToDatabase();

      const user = await Profile.findOne({ user_id: userId });
      userData = JSON.parse(JSON.stringify(user));
    }
  } catch (error) {
    console.log("Failed to get user profile data", error);
  }

  return userData;
}

export async function getUserType() {
  const session = cookies().get("session")?.value;
  const payload: any = await decrypt(session);

  return payload?.user?.role || "user";
}

export async function getUserAvailableQuota(userId: string) {
  try {
    await connectToDatabase();

    const data = await Profile.find({ user_id: userId });
    const profile = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};
    const availabelQuota: number = !(
      isNaN(profile.totalQuota) || isNaN(profile.usedQuota)
    )
      ? profile.totalQuota - profile.usedQuota
      : 0;

    return availabelQuota;
  } catch (error) {
    console.log("Failed to get user quota details", error);
    return 0;
  }
}
