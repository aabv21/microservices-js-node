import jwt from "jsonwebtoken";

// utils
import passCrypt from "../utils/passCrypt.js";

// models
import User from "../models/users.js";
import { redisClient } from "../config/redis.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * @function login
 * @access public
 * @route POST /api/v1/auth/login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not found.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Email and password are required",
      method: "POST",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password +email");

    // check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
        method: "POST",
      });
    }

    // check if password is valid
    const isValid = passCrypt.verify(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password",
        method: "POST",
      });
    }

    // generate token
    const token = generateToken(user._id);

    // cache user
    const sessionData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isModerator: user.isModerator,
      role: user.role,
      token,
    };
    await redisClient.hSet(`session:users:${user._id}`, sessionData);
    await redisClient.expire(`session:users:${user._id}`, 60 * 60 * 24 * 7);

    res.status(200).json({
      success: true,
      data: { token },
      msg: "Login successful",
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};
