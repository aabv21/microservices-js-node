import { logLevel } from "../../utils/logger.js";
import User from "../models/users.js";
import { redisClient } from "../config/redis.js";

export default async function handleAuthEvents(
  eventType,
  correlationId,
  value
) {
  console.log({ eventType, correlationId, value });
  const { eventId, source, data } = value;

  switch (eventType) {
    case "NewPasswordCreated":
      try {
        await User.updateOne({ eventId }, { $set: { isActive: true } });
      } catch (error) {
        console.error(`Error creating new password: ${error}`);
      }
      break;
    case "RollbackCredentials":
      try {
        await User.updateOneAndDelete({ eventId });
      } catch (error) {
        console.error(`Error rolling back credentials: ${error}`);
      }
      break;
    case "AuthLogin":
      try {
        const user = await User.findById(data.id);
        const token = await redisClient.hGet(
          `session:user:${user.id}`,
          "userId"
        );
        user.token = token;

        await redisClient.hSet(`session:user:${user.id}`, "userId", user);
      } catch (error) {
        console.error(`Error logging in: ${error}`);
      }
      break;
  }
}
