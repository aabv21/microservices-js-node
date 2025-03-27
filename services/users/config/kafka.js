import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID ?? "node-kafka",
  brokers: [process.env.KAFKA_BROKER_URL ?? "localhost:9092"],
});

export { kafka };
