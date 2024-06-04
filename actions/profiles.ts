"use server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
import { decrypt } from "@/lib/session";
import { FilterParamTypes, SortOption, userProfileType } from "@/types";
import { adminType } from "@/constants";

export async function getProfile() {
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

export async function getUserProfile(userId: string) {
  let userData;

  try {
    if (userId) {
      await connectToDatabase();

      const user = await Profile.findOne({ user_id: userId });
      userData = JSON.parse(JSON.stringify(user));
    }
  } catch (error) {
    console.log(`Failed to get user profile data ${userId}`, error);
  }
  return userData;
}

export async function getUserType() {
  const session = cookies().get("session")?.value;
  const payload: any = await decrypt(session);

  return payload?.user?.role || "user";
}

export async function getUserId() {
  const session = cookies().get("session")?.value;
  const payload: any = await decrypt(session);

  return payload?.user?.user_id;
}

export async function getUserAvailableQuota(userId: string) {
  try {
    await connectToDatabase();

    const data = await Profile.find({ user_id: userId });
    const profile = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};
    const availabelQuota: number = !(
      isNaN(profile.total_quota) || isNaN(profile.used_quota)
    )
      ? profile.total_quota - profile.used_quota
      : 0;

    return availabelQuota;
  } catch (error) {
    console.log("Failed to get user quota details", error);
    return 0;
  }
}

export async function updateUserAction(userState: userProfileType) {
  try {
    await connectToDatabase();
    const userType = await getUserType();
    const isAdmin = userType === adminType;

    const newData = isAdmin
      ? {
          user_name: userState.user_name,
          total_quota: userState.total_quota,
          used_quota: userState.used_quota,
        }
      : {
          user_name: userState.user_name,
        };

    const result = await Profile.updateOne(
      { user_id: userState.user_id },
      {
        $set: newData,
      }
    );

    return {
      msg: "Profile data updated successfully",
      type: "ok",
    };
  } catch (error) {
    console.log("Failed to update profile", error);
    return {
      msg: "Failed to update profile",
      type: "error",
    };
  }
}

function getFilterOptions(options: FilterParamTypes) {
  let filterCriterions: any = [];
  const now = new Date();

  Object.keys(options).forEach((key) => {
    const optionKey = options[key as keyof FilterParamTypes];
    if (optionKey) {
      if (key === "user_id" && optionKey !== "all") {
        filterCriterions.push({
          user_id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "user_email" && optionKey !== "all") {
        filterCriterions.push({
          user_email: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "user_name" && optionKey !== "all") {
        filterCriterions.push({
          user_name: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "enrollment_id" && optionKey !== "all") {
        // filterCriterions.push({
        //   enrollment_id: {
        //     $regex: optionKey,
        //     $options: "i",
        //   },
        // });
      } else if (key === "role" && optionKey !== "all") {
        filterCriterions.push({
          role: optionKey
        });
      }
    }
  });
  return filterCriterions;
}

export async function getAllProfiles(
  sortOption: SortOption,
  filterParams: FilterParamTypes
) {
  try {
    await connectToDatabase();
    const matchOptions: SortOption[] = getFilterOptions(filterParams);
    const data = await Profile.aggregate([
      {
        $lookup: {
          from: "authentications",
          localField: "user_id",
          foreignField: "user_id",
          as: "authentication",
        },
      },
      {
        $unwind: "$authentication",
      },
      {
        $project: {
          _id: 1,
          user_email: 1,
          user_id: 1,
          user_name: 1,
          // enrollment_id: 1,
          created_at: 1,
          updated_at: 1,
          total_quota : 1,
          used_quota : 1,
          role: "$authentication.role",
        },
      },
      {
        $match: matchOptions.length > 0 ? { $and: matchOptions } : {},
      },
      { $sort: sortOption }
    ]);

    const profile = data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];
    return profile;
  } catch (error) {
    console.log("Failed to get all user profile data", error);
  }
}
