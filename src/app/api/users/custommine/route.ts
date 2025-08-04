import connect from "@/dbConfig/dbconfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const tokenId = getTokenData(request);
    const tokenUser = await User.findOne({ _id: tokenId }).select(
      "-password -isAdmin -isVerfied"
    );
    return NextResponse.json({
      message: "User Found",
      data: tokenUser,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      message: "Failure to bring the Token Data",
    });
  }
}
