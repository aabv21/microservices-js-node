import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// import utils
import "./utils/proxies.js";

// import config
import "./config/mongo.js";

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(limiter);

// Routes
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

// Router
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);

// Status 404
app.use((req, res, next) => {
  console.error(`"NOT FOUND: ${req.get("host")}${req.originalUrl}"`);
  res.status(404).json({
    success: false,
    msg: "Not found",
  });
});

// Status 500 or other errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  console.error(err);
  res.status(status).json({
    success: false,
    msg: message,
  });
});

// Daemon
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
