import { Router } from "express";

import logger from "./middlewares/log.js";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  patchPost,
  deletePost,
} from "../controllers/posts.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", logger, createPost);
router.put("/:id", updatePost);
router.patch("/:id", patchPost);
router.delete("/:id", deletePost);

export default router;
