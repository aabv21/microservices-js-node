import mongoose from "mongoose";
import passCrypt from "../utils/passCrypt.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
      validate: {
        validator: (email) => {
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regexEmail.test(email);
        },
        message: (email) => `${email} is not a valid email address`,
      },
    },
    password: { type: String, required: true, select: false },
    isModerator: { type: Boolean, default: false },
    eventId: { type: String, required: true },
    token: { type: String, required: false },
    isActive: { type: Boolean, default: true },
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

User.ensureIndexes();
User.syncIndexes();

export default User;
