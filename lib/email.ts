import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY)
  throw new Error("SENDGRID_API_KEY is not found in environment");

if (!process.env.SENDGRID_FROM_EMAIL)
  throw new Error("SENDGRID_FROM_EMAIL is not found in environment");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data: {
  to: string;
  templateId: string | undefined;
  title: string;
  userName: string;
  actionLink: string;
  body: string;
}) {
  const msg: any = {
    to: data.to,
    from: process.env.SENDGRID_FROM_EMAIL,
    templateId: data.templateId,
    subject: data.title,
    dynamicTemplateData: {
      title: data.title,
      name: data.userName,
      actionLink: data.actionLink,
      body: data.body,
    },
  };
  try {
    await sgMail.send(msg);
    return {
      type: "ok",
      msg: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Failed to send email:", error.message);
    if (error.response) {
      console.error("Error response body:", error.response.body);
    }
    return {
      type: "error",
      msg: "Error occurred during email sending",
    };
  }
}

export async function sendPasswordResetEmail(data: {
  to: string;
  userName: string;
  actionLink: string;
}) {
  return await sendEmail({
    to: data.to,
    templateId: process.env.SENDGRID_TEMPLATE_KEY_FORGET_PW,
    title: "Reset Your Password",
    userName: data.userName,
    actionLink: data.actionLink,
    body: "Please reset your password by clicking on the link below. If you did not request a password reset, please ignore this email or contact support if you have any concerns",
  });
}

export async function sendVerifyEmail(data: {
  to: string;
  userName: string;
  actionLink: string;
}) {
  return await sendEmail({
    to: data.to,
    templateId: process.env.SENDGRID_TEMPLATE_KEY_VERIFY_EMAIL,
    title: "Confirm Your Email",
    userName: data.userName,
    actionLink: data.actionLink,
    body: "Please confirm your email by clicking on the link below. If you did not create an account, please ignore this email or contact support if you have any concerns",
  });
}
