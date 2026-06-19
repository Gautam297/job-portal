import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = process.env.REACT_APP_API_URL;

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/jobs/my-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job deleted successfully");

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Posted Jobs
        </h1>

        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold">
                  {job.title}
                </h2>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/applicants/${job._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    View Applicants
                  </Link>

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete Job
                  </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;