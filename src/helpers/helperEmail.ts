import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

// Define types for better type safety
type EmailType = "VERIFY" | "FORGOT";

interface SendVerificationEmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendVerificationEmail = async ({
  email,
  emailType, // optionally, for extensive purposes - for verification or forgot password emails etc..,
  userId,
}: SendVerificationEmailParams) => {
  try {
    // CREATE THE HASHED TOKEN
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
        // {
        //   new: true,
        //   runValidators: true,
        // }
      );
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
        // {
        //   new: true,
        //   runValidators: true,
        // }
      );
    }

    // CREATION OF THE TRANSPORT FOR SMTP
    // CREATION OF THE TRANSPORTER FROM MAILTRAP
    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Welcome to Heheheh \nVerify Your Email"
          : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      } </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    // console.log(error.message);
    throw new Error("Can't start the Email Processing" + error);
  }
};
