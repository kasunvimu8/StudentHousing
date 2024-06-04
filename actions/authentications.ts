"use server";

import { defaultUserReservationQuota, resetLinkValidation } from "@/constants";
import { connectToDatabase } from "@/database";
import Authentication from "@/database/models/authentications.model";
import Profile from "@/database/models/profiles.model";
import { sendPasswordResetEmail, sendVerifyEmail } from "@/lib/email";
import { createSession, deleteSession } from "@/lib/session";
import getToken from "@/lib/token";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(data: any) {
  try {
    let msg = "";
    let type = "";

    // 1. Prepare data for insertion into database
    const {
      name,
      email,
      password,
      user_id,
      //  enrollment_id
    } = data;
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
            // enrollment_id: enrollment_id,
            created_at: new Date(),
            total_quota: defaultUserReservationQuota,
            used_quota: 0,
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
            verified: false,
          },
        ],
        opts
      );

      msg =
        "Your data has been sucecesfully regsistered. Please check your email to verify the account";
      type = "ok";
      const token = await getToken();
      const resetLink = `${process.env.BASE_URL}/verify-email/${user_id}/${token}`;

      const res = await sendVerifyEmail({
        to: email,
        userName: name,
        actionLink: resetLink,
      });

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

    if (userData && !userData.verified) {
      return {
        msg: "Login Failed. Your email address is not verified yet",
        type: "error",
      };
    }

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

export async function forgetPasswordEmailSent(email: string) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();
    const user = Authentication.findOne({ user_email: email });
    const profile = Profile.findOne({ user_email: email });
    const [userData, profileData] = await Promise.all([user, profile]);
    if (
      userData &&
      userData.user_email &&
      userData.user_id &&
      profileData &&
      profileData.user_name
    ) {
      const token = await getToken();
      if (token) {
        const expires = new Date(Date.now() + resetLinkValidation * 60 * 1000);
        const result = await Authentication.updateOne(
          { user_email: userData.user_email },
          {
            $set: {
              "reset_password_token.token": token,
              "reset_password_token.expires": expires,
              "reset_password_token.used": false,
            },
          }
        );
        if (result) {
          const resetLink = `${process.env.BASE_URL}/reset-password/${userData.user_id}/${token}`;
          // handle sending email
          const res = await sendPasswordResetEmail({
            to: userData.user_email,
            userName: profileData.user_name,
            actionLink: resetLink,
          });
          msg = res.msg;
          type = res.type;
        } else {
          console.log("Error occurred while saving token in database");
          msg = "Error occured while sending password reset email";
          type = "error";
        }
      } else {
        console.log("Error occurred while creating the token");
        msg = "Error occured while sending password reset email";
        type = "error";
      }
    } else {
      msg = "No user information found for given credentials";
      type = "error";
      console.log("No account found for entered email", email);
    }
  } catch (error) {
    msg = "Error occured while sending password reset email";
    type = "error";
    console.log("Failed to get user profile data", error);
  }

  return {
    msg,
    type,
  };
}

export async function veriftConfirmEmail(token: string, user_id: string) {
  try {
    await connectToDatabase();
    const record = await Authentication.findOne({
      user_id: user_id,
    });
    if (!record) {
      return {
        msg: "Error occured while processing email confirmation. Please try again later.",
        type: "Email verification failed",
      };
    } else {
      if (record.verified) {
        return {
          msg: "Email already verified",
          type: "ok",
        };
      } else {
        const res = await Authentication.updateOne(
          { user_id: user_id },
          {
            $set: {
              verified: true,
            },
          }
        );
        console.log(res);

        return {
          msg: "Email verification successfull. Please login with your credentials.",
          type: "ok",
        };
      }
    }
  } catch (error) {
    console.log(
      `Failed verifying the email token - ${user_id} - ${token}`,
      error
    );
    return {
      msg: "Error occured while processing email confirmation. Please try again later.",
      type: "error",
    };
  }
}

export async function resetPassword(data: {
  token: string;
  user_id: string;
  password: string;
  confirmPassword: string;
}) {
  let msg = "";
  let type = "";
  try {
    await connectToDatabase();
    const record = await Authentication.findOne({
      user_id: data.user_id,
    });
    if (
      !record ||
      !record.reset_password_token ||
      record.reset_password_token.token !== data.token ||
      record.reset_password_token.expires < new Date() ||
      record.reset_password_token.used
    ) {
      msg = "Problem occured during password reset";
      type = "error";
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const result = await Authentication.updateOne(
        { user_id: data.user_id },
        {
          $set: {
            password: hashedPassword,
            "reset_password_token.used": true,
          },
        }
      );

      msg = "Password reset completed successfully";
      type = "ok";
    }
  } catch (error) {
    msg = "Error occured while password reset";
    type = "error";
    console.log(`Failed reset password - ${data.user_id}`, error);
  } finally {
    return {
      msg,
      type,
    };
  }
}

export async function veriftToken(token: string, user_id: string) {
  try {
    await connectToDatabase();
    const record = await Authentication.findOne({
      user_id: user_id,
    });
    if (
      !record ||
      !record.reset_password_token ||
      record.reset_password_token.token !== token ||
      record.reset_password_token.expires < new Date() ||
      record.reset_password_token.used
    ) {
      return undefined;
    } else {
      return record;
    }
  } catch (error) {
    console.log(`Failed verifying the token - ${token}`, error);
  }
}
