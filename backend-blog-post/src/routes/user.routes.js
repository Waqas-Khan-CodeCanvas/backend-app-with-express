import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getUserProfile);
router.patch("/me", protect, updateUserProfile);

export default router;
