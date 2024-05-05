"use server";

import { defaultUserReservationQuota } from "@/constants";
import { connectToDatabase } from "@/database";
import Authentication from "@/database/models/authentications.model";
import Profile from "@/database/models/profiles.model";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(data: any) {
  try {
    let msg = "";
    let type = "";

    // 1. Prepare data for insertion into database
    const { name, email, password, user_id, enrollment_id } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert the user into the database
    await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const opts = { session };

      // add user profile entry
      await Profile.create(
        [
          {
            user_email: email,
            user_id: user_id,
            user_name: name,
            enrollment_id: enrollment_id,
            created_at: new Date(),
            totalQuota: defaultUserReservationQuota,
            usedQuota: 0,
          },
        ],
        opts
      );

      // add password entry
      await Authentication.create(
        [
          {
            user_email: email,
            user_id: user_id,
            password: hashedPassword,
            created_at: new Date(),
            role: "user",
          },
        ],
        opts
      );
      msg =
        "Your data has been sucecesfully regsistered. Please login with your email and password to continue";
      type = "ok";

      // commit the transaction
      await session.commitTransaction();
      revalidatePath("/manage-users");
    } catch (err: any) {
      await session.abortTransaction();
      const errCode = err?.code === 11000;

      msg = errCode
        ? "Account already exists for your credentials"
        : "Registration Failed. Please try again";
      type = "error";
    } finally {
      session.endSession();
    }

    return {
      msg,
      type,
    };
  } catch (error) {
    console.log("User registration Failed", error);
    return {
      msg: "Registration Failed. Please try again",
      type: "error",
    };
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const { email, password } = data;

    await connectToDatabase();
    const user = await Authentication.findOne({ user_email: email });
    const userData = JSON.parse(JSON.stringify(user));

    if (userData && (await bcrypt.compare(password, userData.password))) {
      await createSession(email, userData.role, userData.user_id);

      return {
        msg: "Successfully logged in! Please remember to log out after your session if you are using a public device.",
        type: "ok",
      };
    } else {
      return {
        msg: "Login Failed. Please provide valid credentials",
        type: "error",
      };
    }
  } catch (error) {
    console.log("User Login Failed", error);
    return {
      msg: "Login Failed. Please try again",
      type: "error",
    };
  }
}

export async function signOut() {
  deleteSession();

  redirect("/login");
}
