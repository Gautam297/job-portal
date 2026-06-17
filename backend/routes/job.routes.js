import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  getMyJobs,
  updateJob,
  getDashboardStats,
} from "../controllers/job.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get All Jobs
router.get("/", getJobs);

// Get My Jobs
router.get("/my-jobs", protect, getMyJobs);

// Get Single Job
router.get("/:id", getJobById);

// Get Dashboard Stats
router.get("/dashboard/stats", protect, getDashboardStats);

// Create Job
router.post("/", protect, createJob);

// Delete Job
router.delete("/:id", protect, deleteJob);

// Update Job
router.put("/:id", protect, updateJob);

export default router;