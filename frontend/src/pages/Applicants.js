import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = process.env.REACT_APP_API_URL;

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const updateStatus = async (
  applicationId,
  status
) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `${API_URL}/api/applications/status/${applicationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchApplicants();

    alert("Status Updated");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Applicants
        </h1>

        {applications.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <div className="grid gap-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold">
                  {application.applicant.name}
                </h2>

                <p>
                  <strong>Email:</strong>{" "}
                  {application.applicant.email}
                </p>

                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {application.status}
                </p>

                <select
                  value={application.status}
                  onChange={(e) =>
                  updateStatus(
                    application._id,
                    e.target.value
                )
              }
                  className="border p-2 rounded mt-2"
                >
                <option>Applied</option>
                <option>Reviewing</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
                <option>Hired</option>
                </select>

                <div className="mt-3">
                <Link
                  to={`/candidate/${application.applicant._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
                >
                  View Profile
                </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;