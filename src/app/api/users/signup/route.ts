import User from "@/models/UserModel";
import connect from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/helperEmail";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        { message: "User Already Exist!!!" },
        { status: 400 }
      );
    }

    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // SENDING VERIFICATION EMAIL

    await sendVerificationEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User Created Successfully",
      status: 200,
      data: savedUser,
    });
  } catch (error) {
    console.log("Error in route.js");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
