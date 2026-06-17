import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
  try {
    const existing = await SavedJob.findOne({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSavedJobs = async (
  req,
  res
) => {
  try {
    const jobs = await SavedJob.find({
      candidate: req.user._id,
    }).populate("job");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeSavedJob = async (
  req,
  res
) => {
  try {
    await SavedJob.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};