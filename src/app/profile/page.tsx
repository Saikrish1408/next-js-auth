"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("No User Details Retrived");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      throw new Error("An Error Occurred");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/custommine");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error) {
      throw new Error("Error occurred in Fetching the user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>This is a profile page.</p>
      <h3 className="p-5 mt-5 bg-white/5 rounded cursor-pointer">
        {data === "No User Details Retrived" ? (
          "No User Details Retrived"
        ) : (
          <Link href={`/profile/${data}`}>
            <b>User Id: {data}</b>
          </Link>
        )}
      </h3>
      <div>
        <button
          type="submit"
          onClick={getUserDetails}
          className="mt-5 mb-5 px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-discrete duration-300 cursor-pointer"
        >
          Get User Details
        </button>
      </div>
      <div>
        <button
          type="submit"
          onClick={logout}
          className="mt-5 mb-5 px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-discrete duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
