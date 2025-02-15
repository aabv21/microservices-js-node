import { Router } from "express";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  patchComment,
  deleteComment,
} from "../controllers/comments.js";

const router = Router();

router.get("/", getComments);
router.get("/:id", getComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.patch("/:id", patchComment);
router.delete("/:id", deleteComment);

export default router;
