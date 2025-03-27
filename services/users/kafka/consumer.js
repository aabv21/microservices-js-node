import { kafka } from "../config/kafka.js";
import handleUserEvents from "./handleUserEvents.js";
import handlePostEvents from "./handlePostEvents.js";
import handleAuthEvents from "./handleAuthEvents.js";

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID ?? "users-group",
});

try {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["users-events", "posts-events", "auth-events"],
    fromBeginning: true,
  });
} catch (error) {
  console.error(`Kafka consumer connection error: ${error}`);
}

try {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const {
        headers: { eventType, correlationId },
        value,
      } = message;

      const eventData = {
        eventType: eventType.toString(),
        correlationId: correlationId.toString(),
        value: JSON.parse(value.toString()),
      };

      if (topic === "users-events") {
        await handleUserEvents(eventType, correlationId, value);
      } else if (topic === "posts-events") {
        await handlePostEvents(eventType, correlationId, value);
      } else if (topic === "auth-events") {
        await handleAuthEvents(eventType, correlationId, value);
      }
    },
  });
} catch (error) {
  console.error(`Kafka consumer error: ${error}`);
}

export default consumer;
