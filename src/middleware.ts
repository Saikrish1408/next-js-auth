// The middleware.js|ts file is used to write Middleware and run code on the server before a request is completed.
// Then, based on the incoming request, you can modify the response by rewriting, redirecting,
// modifying the request or response headers, or responding directly.

import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // we need to classify the public and private path....
  const isPublicPath = path === "/login" || path === "/signup";
  // Get the cookies if present, else return empty string
  const token = request.cookies.get("token")?.value || "";

  // if the user is in login and have the token he/she should be redirected to the profile or "/" page not the login and signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
    // ALTERNATIVE WAY TO DEFINE THE PATH
    // return NextResponse.redirect("/")
  }
  // THESE ARE THE PROTECTED PATHS SO THE USER SHOULD HAVE THE TOKEN TO ACCESS THEM
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// This tells Next.js where the middleware should run.This tells Next.js where the middleware should run.
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
