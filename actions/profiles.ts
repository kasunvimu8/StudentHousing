"use server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/database";
import Profile from "@/database/models/profiles.model";
import { decrypt } from "@/lib/session";
import { FilterParamTypes, SortOption, userProfileType } from "@/types";
import { adminType } from "@/constants";
import logger from "@/lib/logger";

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
    // logging
    logger.error(
      `#PROFILE GET : get profile of user id ${userId} failed with error ${JSON.stringify(
        error
      )}`
    );
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
    // logging
    logger.error(
      `#PROFILE GET BY ID : get profile of provided user id ${userId} failed with error ${JSON.stringify(
        error
      )}`
    );
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
    // logging
    logger.error(
      `#PROFILE GET USER QUOTA : get user quota of the  user id ${userId} failed with error ${JSON.stringify(
        error
      )}`
    );
    return 0;
  }
}

export async function updateUserAction(userState: userProfileType) {
  try {
    await connectToDatabase();
    const userType = await getUserType();
    const isAdmin = userType === adminType;

    const commonData = {
      first_name: userState.first_name,
      last_name: userState.last_name,
      address: userState.address,
      country: userState.country,
      phone: userState.phone,
      gender: userState.gender,
      dob: userState.dob,
    };
    const newData = isAdmin
      ? {
          ...commonData,
          total_quota: userState.total_quota,
          used_quota: userState.used_quota,
        }
      : commonData;

    const result = await Profile.updateOne(
      { user_id: userState.user_id },
      {
        $set: newData,
      }
    );

    // logging
    logger.info(
      `#PROFILE UPDATE : update profile data of the  user id ${userState.user_id} successfully completed`
    );

    return {
      msg: "Profile data updated successfully",
      type: "ok",
    };
  } catch (error) {
    // logging
    logger.error(
      `#PROFILE UPDATE : update user details od the user id ${
        userState.user_id
      } failed. provided data ${JSON.stringify(
        userState
      )}. The error was ${JSON.stringify(error)}`
    );

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
      } else if (key === "last_name" && optionKey !== "all") {
        filterCriterions.push({
          last_name: {
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
          role: optionKey,
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
          last_name: 1,
          first_name: 1,
          // enrollment_id: 1,
          created_at: 1,
          updated_at: 1,
          total_quota: 1,
          used_quota: 1,
          country: 1,
          gender: 1,
          role: "$authentication.role",
        },
      },
      {
        $match: matchOptions.length > 0 ? { $and: matchOptions } : {},
      },
      { $sort: sortOption },
    ]);

    const profile = data.length > 0 ? JSON.parse(JSON.stringify(data)) : [];
    return profile;
  } catch (error) {
    // logging
    logger.error(
      `#PROFILE GET ALL : get all profiles failed with error ${JSON.stringify(
        error
      )}`
    );
  }
}
