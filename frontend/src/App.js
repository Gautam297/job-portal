import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import CreateJob from "./pages/CreateJob";
import ProtectedRoute from "./components/ProtectedRoute";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CandidateProfile from "./pages/CandidateProfile";
import SavedJobs from "./pages/SavedJobs";
import MyInterviews from "./pages/MyInterviews";
import RecruiterInterviews from "./pages/RecruiterInterviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        <Route path="/applicants/:jobId" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        <Route path="/candidate/:id" element={<ProtectedRoute><CandidateProfile /></ProtectedRoute>} />
        <Route path="/edit-job/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
        <Route path="/create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
        <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        <Route path="/applicants/:jobId" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
        <Route path="/my-interviews" element={<ProtectedRoute><MyInterviews /></ProtectedRoute>} />
        <Route path="/recruiter-interviews" element={<ProtectedRoute><RecruiterInterviews /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;