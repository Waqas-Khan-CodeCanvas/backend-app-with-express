import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Public Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

export default router;
import { protect } from "./auth.middleware.js";
import { authorizeRoles } from "./role.middleware.js";

router.get("/admin", protect, authorizeRoles("admin"), adminController.getData);
