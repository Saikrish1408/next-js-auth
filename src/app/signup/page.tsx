"use client";

import Link from "next/link";
import react, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      // console.log("hehehe");
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup Failed");
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-3xl font-bold font-mono">
        {loading ? "Fetching..." : "Sign Up"}
      </h1>
      <br />
      <div>
        <label
          htmlFor="username"
          className="block mb-3 mt-2 text-sm font-medium text-shadow-white"
        >
          Username
        </label>
        <input
          className="border-2 border-gray-400 rounded-md p-2  px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
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
          className={`mt-5 mb-5 px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-discrete duration-300 ${
            buttonDisabled ? `cursor-not-allowed` : `cursor-pointer`
          }`}
          type="submit"
          onClick={onSignUp}
        >
          Sign Up
        </button>
      </div>
      <div>
        <Link href="/login">
          Already a User?{" "}
          <span className="underline text-white hover:text-green-600">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
