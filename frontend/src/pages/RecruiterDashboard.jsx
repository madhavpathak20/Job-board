
import { useEffect, useState } from 'react'
import { BriefcaseIcon, UserGroupIcon, ChartBarIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { fetchRecruiterJobs } from '../actions/jobs'
import { fetchApplications, updateApplicationStatus } from '../actions/applications'

export default function RecruiterDashboard() {
  const [postedJobs, setPostedJobs] = useState([])
  const [recentApplications, setRecentApplications] = useState([])
  const navigate = useNavigate()

  const handleDeleteJob = (jobId) => {
    setPostedJobs(postedJobs.filter(job => job.id !== jobId))
  }

  useEffect(() => {
    (async () => {
      const jobs = await fetchRecruiterJobs();
      if (jobs) {
        setPostedJobs(jobs);
      }
    })();
    (async () => {
      const applications = await fetchApplications();
      if (applications) {
        setRecentApplications(applications);
      }
    })();
  }, []);

  const statusOptions = ["Applied", "Under Review", "Accepted", "Rejected"];

  const handleStatusChange = async (event, applicationId) => {
    const newStatus = event.target.value;
    const updatedApplication = await updateApplicationStatus(applicationId, newStatus);

    if (!updatedApplication) {
      return;
    }

    setRecentApplications(applications =>
      applications.map(app =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruiter Dashboard</h1>

          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BriefcaseIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{postedJobs.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{postedJobs.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{recentApplications.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Applications per Job</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{recentApplications.length / postedJobs.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Posted Jobs</h2>
              <button onClick={() => { navigate("/post-job") }} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Post New Job
              </button>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {postedJobs.map((job, idx) => (
                  <li key={idx} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-indigo-600 truncate">{job.title}</p>
                        <p className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800`}>
                            {job.location}
                          </span>
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-sm text-gray-500">{
                          recentApplications.filter(application => application.job.id === job.id).length
                        } applications</p>
                        <button onClick={()=>{navigate(`/job/${job._id}?viewer=recruiter`)}} className="ml-4 text-indigo-600 hover:text-indigo-900">
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h2>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {recentApplications.map((application, idx) => (
                  <li key={idx} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {application.applicant.fullname}
                        </p>
                        <p className="ml-2 text-sm text-gray-500 truncate">
                          applied for {application.job.title}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex items-center">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(e, application._id)}
                          className="w-32 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          {statusOptions.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="px-2 py-1 text-sm"
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                        <a href={`http://localhost:5000/${application?.resume}`} target='_blank' className="ml-4 text-indigo-600 hover:text-indigo-900" rel="noreferrer">
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div >
  )
}