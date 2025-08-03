import connect from "@/dbConfig/dbconfig";
import User from "@/models/UserModel";

async function UserProfile({ params }: any) {
  connect();

  const userId = params.id;
  const currentUser = await User.findOne({ _id: userId });
  console.log(currentUser);

  // console.log(userId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-5 text-2xl font-bold">User Profile</h1>
      <div className="border-2 border-white rounded-lg p-5">
        <p>User Id: {userId}</p>
        <p>Username: {currentUser.username}</p>
        <p>User Email: {currentUser.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
