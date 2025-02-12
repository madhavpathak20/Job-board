import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, BriefcaseIcon, UserCircleIcon, CurrencyRupeeIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { getAllJobs, saveAJob } from '../actions/jobs'
import { getProfile } from '../actions/auth'

export default function ApplicantHome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const token = localStorage.getItem('job_user');
    if (token === null || token.trim() === '') {
      window.location.href = '/login';
    }

    (async () => {
        const jobs = await getAllJobs();
        if (jobs) {
            setJobs(jobs);
        }
    })();


    (async () => {
      const profileData = await getProfile();
      if (profileData) {
        setProfile(profileData);
      }
    })();

  }, [])

  const saveJob = async (e, jobId) => {
    e.preventDefault();

    const savedJob = await saveAJob(jobId);

    if (savedJob) {
      navigate('/saved-jobs');
      console.log('Job saved successfully');
    }
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Welcome back, {profile?.fullname}!</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Profile</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile?.fullname}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile?.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Skills</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {
                            profile?.skills.map(skill => (
                                <span key={skill} className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">{skill}</span>
                            ))
                        }
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile?.bio}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Find Your Next Opportunity</h3>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search for jobs, companies, or locations"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredJobs.map((job, idx) => (
                  <li key={idx}>
                    <Link to={`/job/${job._id}`} className="block hover:bg-gray-50 relative">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">{job.title}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {job.type}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between ">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              {job.company}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <UserCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              {job.location}
                            </p>
                          </div>
                          <div onClick={(e)=>{saveJob(e, job._id)}} className="mt-2 absolute right-4 top-4 flex items-center text-sm text-gray-500 sm:mt-0">
                            <BookmarkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 hover:text-gray-900 text-gray-400" aria-hidden="true" />
                          </div>

                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CurrencyRupeeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              {job.salary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}