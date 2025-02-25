import { redisClient } from "../../config/redis.js";

export const cachedContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const route = `cache:posts:${id}`;
    const cachedPost = await redisClient.get(route);

    if (cachedPost) {
      return res.status(200).json({
        success: true,
        cached: true,
        post: JSON.parse(cachedPost),
        msg: "Post fetched successfully from cache",
        method: "GET",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};
