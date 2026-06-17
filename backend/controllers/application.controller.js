import Application from "../models/Application.js";
import sendEmail from "../utils/sendEmail.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    console.log("Status Update Called");
    console.log("New Status:", status);

    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      ).populate(
        "applicant",
        "name email"
      );

    console.log("Application:", application);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    console.log(
      "Applicant Email:",
      application.applicant?.email
    );

    await sendEmail(
      application.applicant.email,
      "Job Application Status Update",
      `Hello ${application.applicant.name},
      
Your application status is now: ${status}`
    );

    console.log("Email Function Executed");

    res.json({
      message: "Status updated",
      application,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};