import { redisPublisher } from "../../config/redis.js";

export const cachedDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = `cache:posts:${id}`;

    await redisPublisher.publish("delete-cache", message);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};
