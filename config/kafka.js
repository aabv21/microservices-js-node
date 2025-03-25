import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID ?? "node-kafka",
  brokers: [process.env.KAFKA_BROKER_URL ?? "localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID ?? "node-kafka",
});

try {
  await producer.connect();
  await consumer.connect();
  console.info("Kafka connected");
} catch (error) {
  console.error(`Kafka connection error: ${error}`);
}

export { producer, consumer };
