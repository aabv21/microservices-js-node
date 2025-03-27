import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";
const app = express();

app.use(
  "/api/v1/users",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

app.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: "http://localhost:3002",
  })
);

app.use(
  "/api/v1/posts",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
  })
);

app.use("", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(3000);
