// app/profile/[id]/page.tsx
import connect from "@/dbConfig/dbconfig";
import User from "@/models/UserModel";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

interface CurrentUserFields {
  username: string;
  email: string;
  _id: string; // Note: MongoDB uses _id
}

// Connect to database (outside component)
connect();

export default async function Page({ params }: Props) {
  try {
    console.log("Profile ID:", params.id);

    // Fetch user data
    const currentUser = await User.findById(
      params.id
    ).lean<CurrentUserFields>();

    if (!currentUser) {
      console.log("User not found");
      return notFound();
    }

    console.log("Found user:", currentUser);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-5 text-2xl font-bold">User Profile</h1>
        <div className="border-2 border-white rounded-lg p-5">
          <p>User Id: {currentUser._id.toString()}</p>
          <p>Username: {currentUser.username}</p>
          <p>User Email: {currentUser.email}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Profile page error:", error);
    return notFound();
  }
}
