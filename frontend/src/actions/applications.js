const backendUrl = 'http://localhost:5000/applications';


export const fetchMyApplications = async () => {
  try {
    const response = await fetch(`${backendUrl}/my-applications`, {
      headers: {
        'auth-token': localStorage.getItem('job_user')
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const fetchApplications = async () => {
  try {
    const response = await fetch(`${backendUrl}/applications`, {
      headers: {
        'auth-token': localStorage.getItem('job_user')
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    console.log(applicationId, status);
    const response = await fetch(`${backendUrl}/update-status/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('job_user')
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update application status');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}