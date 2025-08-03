"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

async function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  try {
    await axios.post("/api/users/verifyemail", { token });
    setVerified(true);
  } catch (error: any) {
    setError(error);
    console.log(error.message);
  }

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setToken(urltoken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmailPage();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="text-3xl p-2 bg-teal-700 text-black">
        {token ? `${token}` : "No Token"}

        {verified && (
          <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href={"/login"}>
              <p className="text-blue-700">Login</p>
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-2xl text-red-700">Error</h2>
          </div>
        )}
      </h2>
    </div>
  );
}

export default verifyEmailPage;
