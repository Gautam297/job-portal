import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/jobs/${id}`
      );

      setJob(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/applications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Application failed"
      );
    }
  };

  const saveJob = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/saved-jobs/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Saved");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save job"
      );
    }
  };

  if (!job) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">
        {job.title}
      </h1>

      <p className="mb-2">
        <strong>Company:</strong> {job.company}
      </p>

      <p className="mb-2">
        <strong>Location:</strong> {job.location}
      </p>

      <p className="mb-2">
        <strong>Salary:</strong> {job.salary}
      </p>

      <p className="mb-2">
        <strong>Job Type:</strong> {job.jobType}
      </p>

      <p className="mb-4">
        <strong>Description:</strong> {job.description}
      </p>

      <div className="mb-6">
        <strong>Skills:</strong>

        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Apply Now
        </button>

        <button
          onClick={saveJob}
          className="bg-yellow-500 text-white px-6 py-2 rounded"
        >
          Save Job
        </button>
      </div>
    </div>
  );
}

export default JobDetails;