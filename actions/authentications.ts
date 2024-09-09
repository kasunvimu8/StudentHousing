"use server";

import { defaultUserReservationQuota, resetLinkValidation } from "@/constants";
import { connectToDatabase } from "@/database";
import Authentication from "@/database/models/authentications.model";
import Profile from "@/database/models/profiles.model";
import {
  sendInfoEmail,
  sendPasswordResetEmail,
  sendVerifyEmail,
} from "@/lib/email";
import logger from "@/lib/logger";
import { createSession, deleteSession } from "@/lib/session";
import getToken from "@/lib/token";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "./profiles";

export async function signUp(data: any) {
  try {
    let msg = "";
    let type = "";

    // 1. Prepare data for insertion into database
    const {
      first_name,
      last_name,
      email,
      password,
      user_id,
      dob,
      gender,
      country,
      phone,
      passport,
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
            last_name: last_name,
            first_name: first_name,
            created_at: new Date(),
            total_quota: defaultUserReservationQuota,
            used_quota: 0,
            dob: dob,
            gender: gender,
            country: country,
            phone: phone,
            passport: passport,
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
        userName: `${first_name}  ${last_name}`,
        actionLink: resetLink,
      });

      // commit the transaction
      await session.commitTransaction();
      revalidatePath("/manage-users");

      // logging
      logger.info(
        `#SIGN UP : user id:  ${user_id}, user email : ${email} user is successfully registered`
      );
    } catch (error: unknown) {
      await session.abortTransaction();

      type = "error";
      if (error instanceof Error) {
        const errCode = (error as any).code === 11000;

        msg = errCode
          ? "Account already exists for your credentials"
          : "Registration Failed. Please try again";

        // logging
        logger.error(
          `#SIGN UP : user id: ${user_id}, user email: ${email}, user registration failed: ${error.message}`
        );
      } else {
        // Handle unexpected error types
        msg = "Registration Failed. Please try again";

        // logging
        logger.error(
          `#SIGN UP : user id: ${user_id}, user email: ${email}, unexpected error during registration: ${JSON.stringify(
            error
          )}`
        );
      }
    } finally {
      session.endSession();
    }

    return {
      msg,
      type,
    };
  } catch (error: unknown) {
    // logging
    logger.error(
      `#SIGN UP : user id:  ${data.user_id}, user email : ${
        data.email
      } user registration is failed ${JSON.stringify(error)}`
    );
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
      // logging
      logger.error(
        `#SIGN IN : User with email: ${email}, log in failed. Email address is not verified`
      );

      return {
        msg: "Login Failed. Your email address is not verified yet",
        type: "error",
      };
    }

    if (userData && (await bcrypt.compare(password, userData.password))) {
      await createSession(email, userData.role, userData.user_id);

      // logging
      logger.info(
        `#SIGN IN : User with email : ${email} user is successfully logged in`
      );

      return {
        msg: "Successfully logged in! Please remember to log out after your session if you are using a public device.",
        type: "ok",
      };
    } else {
      // logging
      logger.error(
        `#SIGN IN : User with email: ${email}, log in failed. Credentials are invalid.`
      );

      return {
        msg: "Login Failed. Please provide valid credentials",
        type: "error",
      };
    }
  } catch (error: unknown) {
    // logging
    logger.error(
      `#SIGN IN : User with email: ${
        data.email
      }, log in failed. exception occured : ${JSON.stringify(error)}`
    );

    return {
      msg: "Login Failed. Please try again",
      type: "error",
    };
  }
}

export async function signOut() {
  const userId = await getUserId();
  // logging
  logger.info(`#LOGOUT : user id:  ${userId} user is successfully logged out`);

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
      profileData.first_name &&
      profileData.last_name
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
            userName: `${profileData.first_name}  ${profileData.last_name}`,
            actionLink: resetLink,
          });
          msg = res.msg;
          type = res.type;

          // logging
          if (type === "ok") {
            logger.info(
              `#FORGET PASSWORD EMAIL SENT : Id with user  ${userData.user_id} password reset email successfully sent to ${userData.user_email}`
            );
          } else {
            logger.error(
              `#FORGET PASSWORD EMAIL SENT : Id with user  ${userData.user_id} password reset email sending to ${userData.user_email} is failed. ${msg}`
            );
          }
        } else {
          // logging
          logger.error(
            `#FORGET PASSWORD EMAIL SENT : Id with user  ${userData.user_id} password reset email sending to ${userData.user_email} is failed. Error occurred while saving token in database`
          );

          msg = "Error occured while sending password reset email";
          type = "error";
        }
      } else {
        // logging
        logger.error(
          `#FORGET PASSWORD EMAIL SENT : Id with user  ${userData.user_id} password reset email sending to ${userData.user_email} is failed. Error occurred while creating the token`
        );
        msg = "Error occured while sending password reset email";
        type = "error";
      }
    } else {
      // logging
      logger.error(
        `#FORGET PASSWORD EMAIL SENT : Id with user  ${userData.user_id} password reset email sending to ${userData.user_email} is failed. No account found for entered email`
      );

      msg = "No user information found for given credentials";
      type = "error";
    }
  } catch (error) {
    // logging
    logger.error(
      `#FORGET PASSWORD EMAIL SENT : Email with user  ${email}, password reset email sending failed. No account found for entered email ${JSON.stringify(
        error
      )}`
    );

    msg = "Error occured while sending password reset email";
    type = "error";
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
      // logging
      logger.error(
        `#CONFIRM EMAIL : Email verification failed of the user  ${user_id}`
      );

      return {
        msg: "Error occured while processing email confirmation. Please try again later.",
        type: "error",
      };
    } else {
      if (record.verified) {
        // logging
        logger.info(
          `#CONFIRM EMAIL : Email already verified of the user  ${user_id}`
        );

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

        // logging
        logger.info(
          `#CONFIRM EMAIL : Email verification success of the user  ${user_id}`
        );

        const profile = await Profile.findOne({
          user_id: user_id,
        });
        await sendInfoEmail({
          to: record.user_email,
          name: `${profile.first_name} ${profile.last_name}`,
          title: "Email Verification Success",
          desc: "Your email address has been successfully verified. You can now fully access your account and all the features available to you. If you have any questions or need further assistance, feel free to contact our administration avaialble in the contact page",
        });

        return {
          msg: "Email verification successfull. Please login with your credentials.",
          type: "ok",
        };
      }
    }
  } catch (error) {
    // logging
    logger.info(
      `#CONFIRM EMAIL : Email verification failed of the user ${user_id}. Error  ${JSON.stringify(
        error
      )}`
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

      // logging
      logger.error(
        `#PASSWORD RESET : User id:  ${data.user_id} password reset failed`
      );
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

      // logging
      logger.info(
        `#PASSWORD RESET : User id:  ${data.user_id} password reset completed successfully`
      );

      const profile = await Profile.findOne({
        user_id: data.user_id,
      });

      await sendInfoEmail({
        to: record.user_email,
        name: `${profile.first_name} ${profile.last_name}`,
        title: "Password Reset Success",
        desc: "Your password has been successfully reset. You can now log in to your account using the new password. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
      });
    }
  } catch (error) {
    msg = "Error occured while password reset";
    type = "error";

    // logging
    logger.error(
      `#PASSWORD RESET : User id:  ${
        data.user_id
      } password reset failed. Error: ${JSON.stringify(error)}`
    );
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
      // logging
      logger.error(
        `#TOKEN VERIFICARTION : User id  ${user_id} with  token ${token} initial verification failed`
      );

      return undefined;
    } else {
      // logging
      logger.info(
        `#TOKEN VERIFICARTION : User id  ${user_id} with  token ${token}, initial verification is successfully`
      );

      return record;
    }
  } catch (error) {
    // logging
    logger.error(
      `#TOKEN VERIFICARTION : User id  ${user_id} with  token ${token} initial verification failed ${JSON.stringify(
        error
      )}`
    );
  }
}
