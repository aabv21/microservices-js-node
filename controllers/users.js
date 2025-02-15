import User from "../models/users.js";
import passCrypt from "../utils/passCrypt.js";

/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} - If the users are not found.
 * @returns {Promise<void>}
 */
export const getUsers = async (req, res, next) => {
  const users = await User.find();

  try {
    res.status(200).json({
      success: true,
      data: users,
      msg: "Users fetched successfully",
      method: "GET",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Users fetching failed",
      method: "GET",
    });
  }
};

/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not found.
 * @returns {Promise<void>}
 */
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "GET",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
    msg: "User fetched successfully",
    method: "GET",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route POST /api/v1/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not created.
 * @returns {Promise<void>}
 */
export const createUser = async (req, res) => {
  // const query = req.query;
  // const params = req.params;
  const data = req.body;

  try {
    await User.create(data);
    res.status(201).json({
      success: true,
      msg: "User created successfully",
      method: "POST",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "User creation failed",
      method: "POST",
    });
  }
};

/**
 * @async
 * @function
 * @access public
 * @route PUT /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} - If the user is not updated.
 * @returns {Promise<void>}
 */
export const updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "PUT",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
    msg: "User updated successfully",
    method: "PUT",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route PATCH /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} - If the user is not patched.
 * @returns {Promise<void>}
 */
export const patchUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "PATCH",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
    msg: "User patched successfully",
    method: "PATCH",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route DELETE /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} - If the user is not deleted.
 * @returns {Promise<void>}
 */
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "DELETE",
    });
  }

  res.status(200).json({
    success: true,
    data: [],
    msg: "User deleted successfully",
    method: "DELETE",
  });
};
