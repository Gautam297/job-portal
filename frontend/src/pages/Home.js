import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";

const API_URL = process.env.REACT_APP_API_URL;

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/jobs`
      );

      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      return (
        (search === "" ||
          job.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          job.company
            .toLowerCase()
            .includes(search.toLowerCase())) &&

        (location === "" ||
          job.location
            .toLowerCase()
            .includes(location.toLowerCase())) &&

        (jobType === "" ||
          job.jobType === jobType)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      if (sortBy === "highSalary") {
        return (
          Number(b.salary) -
          Number(a.salary)
        );
      }

      if (sortBy === "lowSalary") {
        return (
          Number(a.salary) -
          Number(b.salary)
        );
      }

      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      <section className="max-w-5xl mx-auto px-6 pb-16">

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search Job Title or Company"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Filter by Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={jobType}
              onChange={(e) =>
                setJobType(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                All Types
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Sort By
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="highSalary">
                Highest Salary
              </option>

              <option value="lowSalary">
                Lowest Salary
              </option>
            </select>

          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">
            Featured Jobs
          </h3>

          <span className="text-gray-600">
            Found {filteredJobs.length} Jobs
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              id={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              jobType={job.jobType}
              skills={job.skills.join(", ")}
            />
          ))}
        </div>

      </section>
    </div>
  );
}

export default Home;