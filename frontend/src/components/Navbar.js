import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Job Portal
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {user?.role === "candidate" && (
          <>
            <Link to="/my-applications">
              My Applications
            </Link>

            <Link to="/saved-jobs">
              Saved Jobs
            </Link>
          </>
        )}
  

        {user?.role === "recruiter" && (
          <>
            <Link to="/my-jobs">
              My Jobs
            </Link>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link
              to="/create-job"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create Job
            </Link>
          </>
        )}

        {user ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;