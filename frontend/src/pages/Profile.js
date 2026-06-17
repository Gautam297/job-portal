import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);

  const token = localStorage.getItem("token");

  const updateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/profile",
        {
          phone,
          skills,
          education,
          experience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const uploadResume = async () => {
    try {
      const formData = new FormData();

      formData.append("resume", resume);

      const res = await axios.post(
        "http://localhost:5000/api/profile/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Resume Uploaded Successfully");

      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skills"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="text"
          placeholder="Education"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEducation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Experience"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setExperience(e.target.value)}
        />

        <button
          onClick={updateProfile}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Profile
        </button>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <button
          onClick={uploadResume}
          className="ml-4 bg-green-600 text-white px-6 py-3 rounded"
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default Profile;