import { Link } from "react-router-dom";

function JobCard({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  skills,
}) {
  return (
    <Link to={`/jobs/${id}`}>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        <h4 className="text-xl font-bold mb-2">{title}</h4>

        <p className="text-gray-700">
          <strong>Company:</strong> {company}
        </p>

        <p className="text-gray-700">
          <strong>Location:</strong> {location}
        </p>

        <p className="text-gray-700">
          <strong>Salary:</strong> {salary}
        </p>

        <p className="text-gray-700">
          <strong>Type:</strong> {jobType}
        </p>

        <p className="text-gray-600 mt-3">
          <strong>Skills:</strong> {skills}
        </p>
      </div>
    </Link>
  );
}

export default JobCard;