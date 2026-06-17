import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/saved-jobs",
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

  const removeJob = async (savedJobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/saved-jobs/${savedJobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Removed");

      fetchSavedJobs();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to remove job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Saved Jobs
        </h1>

        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>No saved jobs found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {item.job?.title}
                </h2>

                <p className="mb-2">
                  <strong>Company:</strong>{" "}
                  {item.job?.company}
                </p>

                <p className="mb-2">
                  <strong>Location:</strong>{" "}
                  {item.job?.location}
                </p>

                <p className="mb-4">
                  <strong>Salary:</strong>{" "}
                  {item.job?.salary}
                </p>

                <button
                  onClick={() =>
                    removeJob(item._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;