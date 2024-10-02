/*********************************** NODEMAILER && OFFICE 365 *************************************/

import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import path from "path";

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  variables: { [key: string]: string };
}

export const sendEmail = async ({
  to,
  subject,
  template,
  variables,
}: EmailOptions): Promise<any> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"), // Ensure port is a number
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });

  const templatePath = path.join(process.cwd(), "templates", template);
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Replace variables in the template
  Object.keys(variables).forEach((key) => {
    htmlTemplate = htmlTemplate.replace(
      new RegExp(`{{${key}}}`, "g"),
      variables[key]
    );
  });

  const mailOptions = {
    from: process.env.SMTP_USER || "",
    to,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return {
      type: "ok",
      msg: "Email sent successfully",
    };
  } catch (error) {
    console.log("Error sending email: ", error);
    return {
      type: "error",
      msg: "Error occurred during email sending",
    };
  }
};

export async function sendPasswordResetEmail(data: {
  to: string;
  userName: string;
  actionLink: string;
}) {
  return await sendEmail({
    to: data.to,
    subject: "Password Reset - Student Housing Burghausen",
    template: "actionTemplate.html",
    variables: {
      title: "Reset Your Password",
      name: data.userName,
      body: "Please reset your password by clicking on the link below. If you did not request a password reset, please ignore this email or contact support if you have any concerns",
      actionLink: data.actionLink,
    },
  });
}

export async function sendVerifyEmail(data: {
  to: string;
  userName: string;
  actionLink: string;
}) {
  return await sendEmail({
    to: data.to,
    subject: "Email Verification - Student Housing Burghausen",
    template: "actionTemplate.html",
    variables: {
      title: "Verify Your Email",
      name: data.userName,
      body: "Please verify your email by clicking on the link below. If you did not create an account, please ignore this email.",
      actionLink: data.actionLink,
    },
  });
}

export async function sendRentalEndEmail(data: {
  to: string;
  userName: string;
  actionLink: string;
  body: string;
}) {
  return await sendEmail({
    to: data.to,
    subject: "Rental End Confirmation - Student Housing Burghausen",
    template: "actionTemplate.html",
    variables: {
      title: "Confirm Your Moving Out Date",
      name: data.userName,
      body: data.body,
      actionLink: data.actionLink,
    },
  });
}

export async function sendInfoEmail(data: {
  to: string;
  name: string;
  title: string;
  desc: string;
}) {
  // handle sending emails here
  return await sendEmail({
    to: data.to,
    subject: "Information - Student Housing Burghausen",
    template: "information.html",
    variables: {
      title: data.title,
      name: data.name,
      body: data.desc,
    },
  });
}
