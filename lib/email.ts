import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY)
  throw new Error("SENDGRID_API_KEY not found in environment");
if (!process.env.SENDGRID_TEMPLATE_KEY)
  throw new Error("SENDGRID_API_KEY not found in environment");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail() {
  const msg: any = {
    to: "kasunchamara@eng.pdn.ac.lk",
    from: "kasunvimu8@gmail.com",
    subject: "Reset Password",
    templateId: process.env.SENDGRID_TEMPLATE_KEY,
    dynamicTemplateData: {
      title: "Reset Password",
      name: "Kasun Kanaththage",
      actionLink: "https://www.th-rosenheim.de/en/",
      body: "Please reset your password by clicking on the link below. If you did not request a password reset, please ignore this email or contact support if you have any concerns",
    },
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error: any) {
    console.error("Failed to send email:", error.message);
    if (error.response) {
      console.error("Error response body:", error.response.body);
    }
  }
}
