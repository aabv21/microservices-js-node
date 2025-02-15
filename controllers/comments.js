/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/comments
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comments are not found.
 * @returns {Promise<void>}
 */
export const getComments = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comments fetched successfully",
    method: "GET",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not found.
 * @returns {Promise<void>}
 */
export const getComment = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comment fetched successfully",
    method: "GET",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route POST /api/v1/comments
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not created.
 * @returns {Promise<void>}
 */
export const createComment = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comment created successfully",
    method: "POST",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route PUT /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not updated.
 * @returns {Promise<void>}
 */
export const updateComment = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comment updated successfully",
    method: "PUT",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route PATCH /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not patched.
 * @returns {Promise<void>}
 */
export const patchComment = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comment patched successfully",
    method: "PATCH",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route DELETE /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not deleted.
 * @returns {Promise<void>}
 */
export const deleteComment = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Comment deleted successfully",
    method: "DELETE",
  });
};
