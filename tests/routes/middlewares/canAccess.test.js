import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

// Middleware
import canAccess from "../../../routes/middlewares/canAccess";

// Redis
import {
  redisClient,
  redisSubscriber,
  redisPublisher,
} from "../../../config/redis";

const app = express();

app.use(express.json());
app.use(canAccess);

app.post("/protected", canAccess, (req, res) => {
  res.status(200).json({ message: "Passed test" });
});

// Status 500 or other errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ success: false, msg: message });
});

describe("Test canAccess middleware", () => {
  test("should allow request with valid token", async () => {
    let token;

    beforeAll(async () => {
      token = jwt.sign({ userId: "123" }, process.env.JWT_SECRET, {
        expiresIn: "5s",
      });
      await redisClient.hSet("session:users:123", { id: "123", token });
      await redisClient.expire("session:users:123", 5);
    });

    it("should allow request with valid token", async () => {
      const response = await request(app)
        .post("/protected")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Passed test");
    });

    it("should not allow request with invalid token", async () => {
      const response = await request(app)
        .post("/protected")
        .set("Authorization", `Bearer invalidToken`);
      expect(response.status).toBe(401);
    });

    it("should reject access if no token is provided", async () => {
      const response = await request(app).post("/protected");
      expect(response.status).toBe(401);
    });

    afterAll(async () => {
      await redisClient.quit();
      await redisSubscriber.quit();
      await redisPublisher.quit();
    });
  });
});
