import jwt from "jsonwebtoken";

// Models
import User from "../../models/users.js";

/**
 * @function canAccess
 * @access private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const canAccess = async (req, res, next) => {
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
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
