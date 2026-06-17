import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function CandidateProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/profile/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Candidate Profile
        </h1>

        <p><strong>Name:</strong> {user.name}</p>

        <p><strong>Email:</strong> {user.email}</p>

        <p><strong>Phone:</strong> {user.phone}</p>

        <p><strong>Skills:</strong> {user.skills}</p>

        <p><strong>Education:</strong> {user.education}</p>

        <p><strong>Experience:</strong> {user.experience}</p>

        {user.resume && (
          <a
            href={user.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download Resume
          </a>
        )}
      </div>
    </div>
  );
}

export default CandidateProfile;