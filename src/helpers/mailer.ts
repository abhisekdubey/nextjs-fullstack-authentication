import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
});

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mailResponse", mailResponse);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
