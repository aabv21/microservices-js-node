import { Router } from "express";

// Controllers
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

// Middlewares
import { isLoggedIn } from "./middlewares/isLoggedIn.js";

const router = Router();

router.get("/", isLoggedIn, getPosts);
router.get("/:id", isLoggedIn, getPost);
router.post("/", isLoggedIn, createPost);
router.put("/:id", isLoggedIn, updatePost);
router.delete("/:id", isLoggedIn, deletePost);

export default router;
