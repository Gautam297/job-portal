import express from "express";
import {
  scheduleInterview,
  getRecruiterInterviews,
  getMyInterviews,
} from "../controllers/interviewController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/:applicationId",
  protect,
  scheduleInterview
);

router.get(
  "/",
  protect,
  getRecruiterInterviews
);

router.get(
  "/my",
  protect,
  getMyInterviews
);

export default router;