import { BriefcaseIcon, BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
  const location = useLocation();
  const [userType, setUserType] = useState('')
  const handleLogout = () => {
    localStorage.removeItem('job_user');
    localStorage.removeItem('job_user_role');
    window.location.href = '/login';
  }

  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('job_user_role');
    setUserType(role);
    if (role === 'recruiter'){
      setIsRecruiter(true);
    } else {
      setIsRecruiter(false);
    }
  }, [location.pathname]);

  if (isRecruiter) return (
    <RecruiterNav />
  )

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobPortal</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`border-indigo-500  inline-flex items-center px-1 pt-1 ${location.pathname === "/" ? "border-b-2 text-gray-900" : "text-gray-500"} text-sm font-medium`}>
                Dashboard
              </Link>
              <Link to="/my-applications" className={`border-indigo-500  inline-flex items-center px-1 pt-1 ${location.pathname === "/my-applications" ? "border-b-2 text-gray-900" : "text-gray-500"} text-sm font-medium`}>
                My Applications
              </Link>
              <Link to="/saved-jobs" className={`border-indigo-500  inline-flex items-center px-1 pt-1 ${location.pathname === "/saved-jobs" ? "border-b-2 text-gray-900" : "text-gray-500"} text-sm font-medium`}>
                Saved Jobs
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button onClick={handleLogout} type="button" className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const RecruiterNav = () => {
  const handleLogout = () => {
    localStorage.removeItem('job_user');
    localStorage.removeItem('job_user_role');
    window.location.href = '/login';
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobPortal</span>
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 text-sm font-medium">Welcome, Recruiter</span>
          </div>
          <button onClick={handleLogout} type="button" className="bg-white mt-5 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            Logout
          </button>
        </div>
      </div>
    </nav >
  )
}

export default Navbar