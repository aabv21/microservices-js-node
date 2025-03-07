import request from "supertest";
import express from "express";

// Middleware
import validateUser from "../../../routes/middlewares/validateUser";

const app = express();

app.use(express.json());
app.use(validateUser);
app.post("/test-email", validateUser, (req, res) => {
  res.status(200).json({ message: "Email is valid" });
});

// Status 500 or other errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ success: false, msg: message });
});

describe("Test validateUser middleware", () => {
  test("should allow request with valid email", async () => {
    const response = await request(app).post("/test-email").send({
      email: "test@example.com",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Email is valid" });
  });

  test("should reject request with invalid email", async () => {
    const response = await request(app).post("/test-email").send({
      email: "invalid@email.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
  });
});
