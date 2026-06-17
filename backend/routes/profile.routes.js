import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import {
  updateProfile,
  uploadResume,
  getUserProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Update Profile
router.put("/", protect, updateProfile);

// Upload Resume
router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

// Get User Profile by ID
router.get(
  "/user/:id",
  protect,
  getUserProfile
);

export default router;