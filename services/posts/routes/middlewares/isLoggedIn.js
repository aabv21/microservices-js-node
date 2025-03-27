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
    const user = await redisClient.hGetAll(`session:users:${isValid.id}`);
    if (token === user.token) {
      req.user = user;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    error.status = 401;
    error.message = `Unauthorized: ${error.message}`;
    res.set({ mdw: "isLoggedIn" });
    next(error);
  } finally {
    next();
  }
};
