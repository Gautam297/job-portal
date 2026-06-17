import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="grid gap-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                {!application.job ? (
                  <>
                    <h2 className="text-xl font-bold text-red-600">
                      Job No Longer Available
                    </h2>

                    <p>
                      <strong>Status:</strong>{" "}
                      {application.status}
                    </p>

                    <p>
                      <strong>Applied On:</strong>{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">
                      {application.job.title}
                    </h2>

                    <p>
                      <strong>Company:</strong>{" "}
                      {application.job.company}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {application.job.location}
                    </p>

                    <p>
                      <strong>Salary:</strong>{" "}
                      {application.job.salary}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {application.status}
                    </p>

                    <p>
                      <strong>Applied On:</strong>{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;