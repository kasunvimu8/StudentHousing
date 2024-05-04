"use server";

import { defaultUserReservationQuota } from "@/constants";
import { connectToDatabase } from "@/database";
import Authentication from "@/database/models/authentications.model";
import Profile from "@/database/models/profiles.model";
import { createSession, deleteSession } from "@/lib/session";
import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/validators";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function signUp(state: FormState, formData: any) {
  try {
    let msg = "";
    let type = "";

    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get("name"),
      user_id: formData.get("user_id"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        msg: "Input validation failed. Please try again",
        type: "invalid",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 2. Prepare data for insertion into database
    const { name, email, password, user_id } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database
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
            role: 'user'
          },
        ],
        opts
      );
      msg =
        "Your data has been sucecesfully regsistered. Please login with your email and password to continue";
      type = "error";
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

export async function signIn(state: FormState, formData: any) {
  try {
    // 1. Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        msg: "Entered Login Data Invalid. Please try again",
        type: "invalid",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 2. check crendentails are okay
    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();
    const user = await Authentication.findOne({ user_email: email });
    if (user && (await bcrypt.compare(hashedPassword, user.password))) {
      await createSession(email, user.role, user.user_id);

      return {
        msg: "Logged in successfully",
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
