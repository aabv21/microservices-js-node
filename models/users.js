import mongoose from "mongoose";
import passCrypt from "../utils/passCrypt.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    greeting: { type: String },
    isModerator: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = passCrypt.hashPassword(user.password);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
