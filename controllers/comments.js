import Comment from "../models/comments.js";

/**
 * @async
 * @function getComments
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
 * @function getComment
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
 * @function createComment
 * @access public
 * @route POST /api/v1/comments
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not created.
 * @returns {Promise<void>}
 */
export const createComment = async (req, res) => {
  const data = req.body;

  try {
    const comment = await Comment.create({ ...data });
    res.status(200).json({
      success: true,
      comment,
      msg: "Comment created successfully",
      method: "POST",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @async
 * @function updateComment
 * @access public
 * @route PUT /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not updated.
 * @returns {Promise<void>}
 */
export const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id).populate("post", "author -_id");

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    const userId = req.user._id;
    const commentAuthorId = comment.author._id;

    if (userId === commentAuthorId) {
      await Comment.findByIdAndUpdate(id, { ...data }, { new: true });
    } else {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to update this comment",
      });
    }

    return res
      .status(200)
      .json({ success: true, comment, msg: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @async
 * @function deleteComment
 * @access public
 * @route DELETE /api/v1/comments/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the comment is not deleted.
 * @returns {Promise<void>}
 */
export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id).populate("post", "author -_id");

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    const userId = req.user._id;
    const commentAuthorId = comment.author._id;
    const commentPostAuthorId = comment.post.author._id;

    if (userId === commentAuthorId || userId === commentPostAuthorId) {
      await comment.deleteOne();
    } else {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to delete this comment",
      });
    }

    return res
      .status(200)
      .json({ success: true, msg: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
