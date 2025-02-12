
import { useState } from 'react'
import { BriefcaseIcon, CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { createNewJob } from '../actions/jobs'

export default function PostNewJob() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (Object.values(formData).some(field => field.trim() === '')) {
      setError('Please fill in all fields.')
      setIsSubmitting(false)
      return
    }

    try {
      const { title, location, salary, description, requirements } = formData
      const { success } = await createNewJob(title, location, salary, description, requirements)

      if (success) {
        navigate('/dashboard')
      }

    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Post a New Job</h2>
          <p className="mt-1 text-sm text-gray-600">Fill out the form below to create a new job listing.</p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block py-2 w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="focus:ring-indigo-500 focus:border-indigo-500 py-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="focus:ring-indigo-500 focus:border-indigo-500 py-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. $80,000 - $120,000"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 p-2 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Describe the job role, responsibilities, and expectations..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              <div className="mt-1">
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 p-2 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="List the required skills, experience, and qualifications..."
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}