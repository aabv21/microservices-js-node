import User from "../models/users.js";
import passCrypt from "../utils/passCrypt.js";

/**
 * @async
 * @function getUsers
 * @access public
 * @route GET /api/v1/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the users are not found.
 * @returns {Promise<void>}
 */
export const getUsers = async (req, res) => {
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
 * @function getUser
 * @access public
 * @route GET /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not found.
 * @returns {Promise<void>}
 */
export const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

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
 * @function createUser
 * @access public
 * @route POST /api/v1/users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not created.
 * @returns {Promise<void>}
 */
export const createUser = async (req, res) => {
  const data = req.body;

  // Validate the user data
  Object.assign(data, validateUser);

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
 * @function updateUser
 * @access public
 * @route PUT /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const updateUser = async (req, res) => {
  const data = req.body;
  const userId = req.params.id;

  // is userId is not the same as the userId in the request
  if (req.user._id !== userId) {
    return res.status(401).json({
      success: false,
      msg: "You are not allowed to update this user",
      method: "PUT",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "PUT",
    });
  }

  user.set(data);
  await user.save();

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
 * @function patchUser
 * @access public
 * @route PATCH /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not patched.
 * @returns {Promise<void>}
 */
export const patchUser = async (req, res) => {
  const data = req.body;
  const userId = req.params.id;

  // is userId is not the same as the userId in the request
  if (req.user._id !== userId) {
    return res.status(401).json({
      success: false,
      msg: "You are not allowed to patch this user",
      method: "PATCH",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "PATCH",
    });
  }

  user.set(data);
  await user.save();

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
 * @function deleteUser
 * @access public
 * @route DELETE /api/v1/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the user is not deleted.
 * @returns {Promise<void>}
 */
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  // is userId is not the same as the userId in the request
  if (req.user._id !== userId) {
    return res.status(401).json({
      success: false,
      msg: "You are not allowed to delete this user",
      method: "DELETE",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
      method: "DELETE",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: [],
    msg: `User ${userId} deleted successfully`,
    method: "DELETE",
  });
};
