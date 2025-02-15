import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

// Config
import "./config/mongo.js";

// Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import usersRoutes from "./routes/users.js";

// Router
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/users", usersRoutes);

// Daemon
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
