import { Router } from "express";

// Middlewares
import { canAccess } from "./middlewares/canAccess.js";
import validateUser from "./middlewares/validateUser.js";

// Controllers
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router();

router.get("/", canAccess, getUsers);
router.get("/:id", canAccess, getUser);
router.post("/", validateUser, createUser);
router.put("/:id", canAccess, updateUser);
router.patch("/:id", canAccess, patchUser);
router.delete("/:id", canAccess, deleteUser);

export default router;
