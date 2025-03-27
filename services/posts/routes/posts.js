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
import { cachedContent } from "./middlewares/cachedContent.js";
import { cachedDelete } from "./middlewares/cachedDelete.js";

const router = Router();

router.get("/", isLoggedIn, getPosts);
router.get("/:id", isLoggedIn, cachedContent, getPost);
router.post("/", isLoggedIn, createPost);
router.put("/:id", isLoggedIn, cachedDelete, updatePost);
router.delete("/:id", isLoggedIn, cachedDelete, deletePost);

export default router;
