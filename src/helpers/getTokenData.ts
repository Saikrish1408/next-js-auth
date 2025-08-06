import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
}

export const getTokenData = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    ) as TokenPayload;

    if (!decodedToken.id) {
      throw new Error("Id Field is not present in the Token Data");
    }

    return decodedToken.id;
  } catch (error) {
    throw new Error("An Error Occurred" + error);
  }
};
