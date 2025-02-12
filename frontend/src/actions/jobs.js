const backendUrl = 'http://localhost:5000';

export const createNewJob = async (title, location, salary, description, requirements) => {
  const response = await fetch(`${backendUrl}/jobs/newjob`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('job_user')
    },
    body: JSON.stringify({ title, location, salary, description, requirements }),
  });

  const job = await response.json();
  return { job, success: true };
}


export const fetchRecruiterJobs = async () => {
  const response = await fetch(`${backendUrl}/jobs/recruiterjobs`, {
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const jobs = await response.json();
  return jobs;
}

export const getAllJobs = async () => {
  const response = await fetch(`${backendUrl}/jobs/alljobs`, {
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const jobs = await response.json();
  return jobs;
}

export const getJobDetails = async (id) => {
  const response = await fetch(`${backendUrl}/jobs/${id}`, {
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const job = await response.json();
  return job;
}

export const getSavedJobs = async () => {
  const response = await fetch(`${backendUrl}/jobs/get-savedjobs`, {
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const jobs = await response.json();
  return jobs;
}

export const saveAJob = async (jobId) => {
  const response = await fetch(`${backendUrl}/jobs/savejob/${jobId}`, {
    method: 'POST',
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const data = await response.json();
  return data;
}

export const removeSavedJob = async (jobId) => {
  const response = await fetch(`${backendUrl}/jobs/unsavejob/${jobId}`, {
    method: 'DELETE',
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const data = await response.json();
  return data;
}