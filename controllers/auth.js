import jwt from "jsonwebtoken";

// utils
import passCrypt from "../utils/passCrypt.js";

// models
import User from "../models/users.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
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
    const user = await User.findOne({ email }).select("+password");

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
