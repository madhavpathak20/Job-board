
import { useEffect, useState } from 'react'
import { CurrencyDollarIcon, MapPinIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getJobDetails } from '../actions/jobs';


export default function JobDetails() {
  const [isApplying, setIsApplying] = useState(false)
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [isRecruiter, setIsRecruiter] = useState(false);

  const handleApply = () => {
    navigate(`/apply-job/${id}`)
  }

  useEffect(() => {
    (async () => {
      const job = await getJobDetails(id);
      if (job) {
        setJobData(job);
      }
    })();
  }, [id])

  useEffect(() => {
    if (searchParams.get('viewer') === 'recruiter') {
      setIsRecruiter(true);
    }

  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">{jobData?.title}</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{jobData?.company}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{jobData?.location}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Salary
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">${jobData?.salary?.toLocaleString()} per year</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Posted Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(jobData?.date).toLocaleDateString()}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Recruiter
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{jobData?.recruiter.fullname}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{jobData?.description}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Requirements</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{jobData?.requirements}</dd>
                </div>
              </dl>
            </div>
            {
              !isRecruiter &&
              <div className="px-4 py-5 sm:px-6">
                <button onClick={handleApply}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply Now
                </button>
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}