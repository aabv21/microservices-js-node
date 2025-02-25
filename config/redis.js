import { createClient } from "redis";

// Client
const redisClient = createClient({
  username: "default",
  password: "2JVwsfLaxIj85crBbm3XRCSmZcl88Q5h",
  socket: {
    host: "redis-14080.c14.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 14080,
  },
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("ready", () => console.log("Redis Client Ready"));
await redisClient.connect();

// Clear all data in the database
redisClient.flushDb();

// Suscriber
const redisSubscriber = createClient({
  username: "default",
  password: "2JVwsfLaxIj85crBbm3XRCSmZcl88Q5h",
  socket: {
    host: "redis-14080.c14.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 14080,
  },
});
redisSubscriber.on("error", (err) =>
  console.log("Redis Subscriber Error", err)
);
redisSubscriber.on("ready", () => console.log("Redis Subscriber Ready"));
await redisSubscriber.connect();

// Publisher
const redisPublisher = createClient({
  username: "default",
  password: "2JVwsfLaxIj85crBbm3XRCSmZcl88Q5h",
  socket: {
    host: "redis-14080.c14.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 14080,
  },
});
redisPublisher.on("error", (err) => console.log("Redis Publisher Error", err));
redisPublisher.on("ready", () => console.log("Redis Publisher Ready"));
await redisPublisher.connect();

export { redisClient, redisSubscriber, redisPublisher };
