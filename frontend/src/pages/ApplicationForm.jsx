import { useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'


export default function JobApplicationForm() {
  const [sop, setSop] = useState('')
  const [resume, setResume] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!sop || !resume) {
      setError('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('resume', resume)
      formData.append('sop', sop)

      const response = await fetch(`http://localhost:5000/applications/apply/${id}`, {
        method: 'POST',
        body: formData,
        headers: {
          'auth-token': localStorage.getItem('job_user')
        },
        credentials: 'include'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit application')
      }

      navigate('/my-applications')
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Job Application</h2>
          <p className="mt-1 text-sm text-gray-600">Please fill out the form below to apply for this position.</p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="sop" className="block text-sm font-medium text-gray-700">
                Statement of Purpose
              </label>
              <div className="mt-1">
                <textarea
                  id="sop"
                  name="sop"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 p-2 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Explain why you're a great fit for this position..."
                  value={sop}
                  onChange={(e) => setSop(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              {resume && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {resume.name}
                </p>
              )}
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
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}