import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/jobs/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Recruiter Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              Total Jobs
            </h2>
            <p className="text-4xl mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              Total Applications
            </h2>
            <p className="text-4xl mt-2">
              {stats.totalApplications}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Recent Applicants
          </h2>

          {stats.recentApplications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            stats.recentApplications.map((app) => (
              <div
                key={app._id}
                className="border-b py-3"
              >
                <p>
                  <strong>Name:</strong>{" "}
                  {app.applicant.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {app.applicant.email}
                </p>

                <p>
                  <strong>Job:</strong>{" "}
                  {app.job.title}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;