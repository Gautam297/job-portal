import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      description,
      skills,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      description,
      skills,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    console.log("Jobs Found:", jobs.length);

    res.json(jobs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    console.log(
      "Job Creator:",
      job.createdBy.toString()
    );

    console.log(
      "Current User:",
      req.user._id.toString()
    );

    if (
      job.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    });

    const totalJobs = jobs.length;

    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "name email")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalJobs,
      totalApplications,
      recentApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};