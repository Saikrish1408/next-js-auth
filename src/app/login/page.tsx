"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      console.log("hahaha");
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast(`Logged In Successfully`);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-3xl font-bold font-mono">Login</h1>
      <br />
      <div>
        <label
          htmlFor="email"
          className="block mb-3 mt-2 text-sm font-medium text-shadow-white"
        >
          Email
        </label>
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-3 mt-2 text-sm font-medium text-shadow-white"
        >
          Password
        </label>
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div>
        <button
          className={`mt-5 mb-5 px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-discrete duration-300 
                      ${
                        buttonDisabled ? `cursor-not-allowed` : `cursor-pointer`
                      }`}
          type="submit"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
      <div>
        <Link href="/signup">
          Not a User?{" "}
          <span className="underline text-white hover:text-green-600">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}
