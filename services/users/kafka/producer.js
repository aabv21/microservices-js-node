import { kafka } from "../config/kafka.js";

const producer = kafka.producer();

try {
  await producer.connect();
  console.info("Kafka producer connected");
} catch (error) {
  console.error(`Kafka producer connection error: ${error}`);
}

export default producer;
