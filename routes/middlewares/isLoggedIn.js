import jwt from "jsonwebtoken";

// Models
import User from "../../models/users.js";

/**
 * @function isLoggedIn
 * @access private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const isLoggedIn = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid token",
        method: "GET",
      });
    }

    const user = await User.findById(isValid.id);
    req.user = user;
  } catch (error) {
    console.warn(error);
  } finally {
    next();
  }
};
