import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} from "../controllers/savedJob.controller.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  saveJob
);

router.get(
  "/",
  protect,
  getSavedJobs
);

router.delete(
  "/:id",
  protect,
  removeSavedJob
);

export default router;