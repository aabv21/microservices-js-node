import { Router } from "express";
import { producer, consumer } from "../config/kafka.js";

const router = Router();

router.get("/producer", async (req, res) => {
  await producer.send({
    topic: "test",
    messages: [{ value: `Hello KafkaJS User ${Math.random()}` }],
  });
  res.status(200).send("Message sent from Kafka producer");
});

router.get("/consumer", async (req, res) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message received from Kafka: ${message.value?.toString()}`);
    },
  });
  res.status(200).send("Consumer connected to Kafka");
});

export default router;
