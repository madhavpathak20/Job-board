import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantSignup from './pages/ApplicantRegister';
import RecruiterSignup from './pages/RecruiterRegister';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MyApplications from './pages/MyApplication';
import SavedJobs from './pages/SavedJobs';
import JobDetails from './pages/JobDetails';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostNewJob from './pages/NewJobForm';
import JobApplicationForm from './pages/ApplicationForm';

const Contact = () => <h1>Contact</h1>;

const App = () => {
  return (
    <Router>
      <div>
        < Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<RecruiterDashboard />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/post-job" element={<PostNewJob />} />
          <Route path="/apply-job/:id" element={<JobApplicationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/applicant-register" element={<ApplicantSignup />} />
          <Route path="/recruiter-register" element={<RecruiterSignup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;