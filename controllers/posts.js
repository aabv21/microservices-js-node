/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not found.
 * @returns {Promise<void>}
 */
export const getPost = (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    msg: "Post fetched successfully",
    method: "GET",
  });
};

/**
 * @async
 * @function
 * @access public
 * @route GET /api/v1/posts
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the posts are not found.
 * @returns {Promise<void>}
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: posts,
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
 * @function
 * @access public
 * @route POST /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not created.
 * @returns {Promise<void>}
 */
export const createPost = async (req, res) => {
  const data = req.body;
  try {
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
 * @function
 * @access public
 * @route PUT /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not updated.
 * @returns {Promise<void>}
 */
export const updatePost = async (req, res) => {
  const data = req.body;
  try {
    await Post.findByIdAndUpdate(data._id, data);
    res.status(200).json({
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
 * @function
 * @access public
 * @route PATCH /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not updated.
 * @returns {Promise<void>}
 */
export const patchPost = async (req, res) => {
  const data = req.body;
  try {
    await Post.findByIdAndUpdate(data._id, data);
    res.status(200).json({
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
 * @function
 * @access public
 * @route DELETE /api/v1/post
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - If the post is not deleted.
 * @returns {Promise<void>}
 */
export const deletePost = async (req, res) => {
  const data = req.body;
  try {
    await Post.findByIdAndDelete(data._id);
    res.status(200).json({
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
