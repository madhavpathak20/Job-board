import { useEffect, useState } from 'react'
import { BuildingOfficeIcon, CurrencyDollarIcon, MapPinIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { getSavedJobs, removeSavedJob } from '../actions/jobs'


export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([])

  const handleRemove = async (id) => {
    await removeSavedJob(id);
    setSavedJobs(savedJobs.filter(job => job._id !== id))
  }

  useEffect(() => {
    (async () => {
      const savedJobs = await getSavedJobs();
      if (savedJobs) {
        setSavedJobs(savedJobs)
      }
    })();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Saved Jobs</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul className="divide-y divide-gray-200">
                {savedJobs.map((job, idx) => (
                  <li key={idx}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">{job.job.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <button
                            onClick={() => handleRemove(job._id)}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {job.job.company}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {job.job.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>{job.job.salary}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BookmarkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p>Saved on <time dateTime={job.date}>{new Date(job.date).toLocaleDateString()}</time></p>
                      </div>
                    </div>
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