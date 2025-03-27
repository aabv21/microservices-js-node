import { randomUUID } from "crypto";
import { kafka } from "../config/kafka.js";

class Producer {
  #_producer = kafka.producer();
  #correlationId = randomUUID();
  #eventId = randomUUID();
  constructor() {
    this.#init();
  }

  #init() {
    try {
      this.#_producer.connect();
    } catch (error) {
      console.error(`Kafka connection error: ${error}`);
    }
  }

  async send(data, eventType = "AuthEventType", eventId) {
    await this.#_producer.send({
      topic: "auth-events",
      messages: [
        {
          headers: {
            eventType,
            correlationId: this.#correlationId(),
          },
          value: JSON.stringify({
            eventId: eventId ?? this.#eventId(),
            source: "auth-service",
            data,
          }),
        },
      ],
    });
  }
}

// singleton
const producer = new Producer();
export default producer;
