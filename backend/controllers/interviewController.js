import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import sendEmail from "../utils/sendEmail.js";

// Schedule Interview
export const scheduleInterview = async (
  req,
  res
) => {
  try {
    const { applicationId } = req.params;

    const {
      date,
      time,
      meetingLink,
    } = req.body;

    const application =
      await Application.findById(
        applicationId
      ).populate(
        "applicant",
        "name email"
      );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const interview =
      await Interview.create({
        application: application._id,
        candidate:
          application.applicant._id,
        recruiter: req.user._id,
        date,
        time,
        meetingLink,
      });

    await sendEmail(
      application.applicant.email,
      "Interview Scheduled",
      `
Hello ${application.applicant.name},

Your interview has been scheduled.

Date: ${date}
Time: ${time}

Meeting Link:
${meetingLink}

Best of luck!

Job Portal Team
`
    );

    res.status(201).json({
      message:
        "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Recruiter Interviews
export const getRecruiterInterviews = async (
  req,
  res
) => {
  try {
    const interviews = await Interview.find({
      recruiter: req.user._id,
    })
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Candidate Interviews
export const getMyInterviews = async (
  req,
  res
) => {
  try {
    const interviews = await Interview.find({
      candidate: req.user._id,
    })
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};