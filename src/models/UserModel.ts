import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
