import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/jobs",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Created Successfully");
      navigate("/my-jobs");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create Job
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <select
            name="jobType"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-3 rounded mb-4"
            rows="5"
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;