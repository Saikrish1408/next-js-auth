import connect from "@/dbConfig/dbconfig";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      console.log("User not found");
      return NextResponse.json({
        message: "User Not Found",
        status: 501,
      });
    }

    const hashedPassword = user.password;

    const passwordMatching = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatching);

    if (!passwordMatching) {
      console.log("Password is Incorrect");
      return NextResponse.json({
        message: "Password is Incorrect",
        status: 201,
      });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Logged In Successfully",
      status: 200,
      data: user,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error occured in Logging In",
      status: 500,
    });
  }
}
