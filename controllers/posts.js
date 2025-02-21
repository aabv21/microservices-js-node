// Models
import Post from "../models/post.js";

/**
 * @async
 * @function getPost
 * @access public
 * @route GET /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not found.
 * @returns {Promise<void>}
 */
export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = req.user ? { _id: id } : { _id: id, public: true };
    const post = await Post.findOne(filter).populate("comments");

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
        method: "GET",
      });
    }

    res.status(200).json({
      success: true,
      post,
      msg: "Post fetched successfully",
      method: "GET",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @async
 * @function getPosts
 * @access public
 * @route GET /api/v1/posts
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the posts are not found.
 * @returns {Promise<void>}
 */
export const getPosts = async (req, res) => {
  try {
    // Filter is like a WHERE clause in SQL
    // Projection is like a SELECT clause in SQL
    // Sort is like a ORDER BY clause in SQL
    // Pagination is like a LIMIT clause in SQL

    const filter = req.user ? {} : { public: true };
    const { limit = 0, sort = "_id", skip = 0 } = req.query;
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit);

    res.status(200).json({
      success: true,
      data: posts,
      size: posts.length,
      msg: "Posts fetched successfully",
      method: "GET",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @async
 * @function createPost
 * @access public
 * @route POST /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not created.
 * @returns {Promise<void>}
 */
export const createPost = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    // If the user is not logged in, set the author to "Unknown user"
    const author = user
      ? { name: user.name, id: user._id }
      : { name: "Unknown user", id: "" };
    data.author = author;

    await Post.create(data);
    res.status(201).json({
      success: true,
      data: [],
      msg: "Post created successfully",
      method: "POST",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @async
 * @function updatePost
 * @access public
 * @route PUT /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not updated.
 * @returns {Promise<void>}
 */
export const updatePost = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
        method: "PUT",
      });
    }

    const userId = req.user._id;
    const authorId = post.author.id;
    if (userId === authorId) {
      await Post.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to update this post",
        method: "PUT",
      });
    }

    return res.status(200).json({
      success: true,
      data: [],
      msg: "Post updated successfully",
      method: "PUT",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @async
 * @function patchPost
 * @access public
 * @route PATCH /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not updated.
 * @returns {Promise<void>}
 */
export const patchPost = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
        method: "PATCH",
      });
    }

    const userId = req.user._id;
    const authorId = post.author.id;
    if (userId === authorId) {
      await Post.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to update this post",
        method: "PATCH",
      });
    }

    return res.status(200).json({
      success: true,
      data: [],
      msg: "Post updated successfully",
      method: "PATCH",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @async
 * @function deletePost
 * @access public
 * @route DELETE /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not deleted.
 * @returns {Promise<void>}
 */
export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not found",
        method: "DELETE",
      });
    }

    const userId = req.user._id;
    const authorId = post.author.id;
    if (userId === authorId) {
      await post.deleteOne();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to delete this post",
        method: "DELETE",
      });
    }

    return res.status(200).json({
      success: true,
      data: [],
      msg: "Post deleted successfully",
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
