import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// All routes protected by authentication
router.use(protect);

// Admin-only routes
router.get("/", authorizeRoles("admin"), getAllUsers);
router.get("/:id", authorizeRoles("admin"), getUserById);
router.put("/:id", authorizeRoles("admin"), updateUser);
router.delete("/:id", authorizeRoles("admin"), deleteUser);

export default router;
