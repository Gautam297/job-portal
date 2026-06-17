import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply for Job
router.post("/:jobId", protect, applyJob);

// My Applications
router.get("/my-applications", protect, getMyApplications);

// Get Applicants for a Job
router.get("/job/:jobId", protect, getApplicantsForJob);

// Update Application Status
router.put("/status/:id", protect, updateApplicationStatus);

export default router;