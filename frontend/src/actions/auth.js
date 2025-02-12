const backendUrl = 'http://localhost:5000';

export const loginApplicant = async (email, password) => {
  const response = await fetch(`${backendUrl}/auth/login-applicant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const { token, user } = await response.json();

  return { token, user };
}

export const registerApplicant = async (fullname, email, password, skills, bio) => {
  const response = await fetch(`${backendUrl}/auth/register-applicant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, email, password, skills, bio }),
  });

  const { token, user } = await response.json();

  return { token, user };
}

export const registerRecruiter = async (fullname, email, password, organization) => {
  const response = await fetch(`${backendUrl}/auth/register-recruiter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, email, password, organization }),
  });

  const { token, user } = await response.json();

  return { token, user };
}

export const loginRecruiter = async (email, password) => {
  const response = await fetch(`${backendUrl}/auth/login-recruiter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const { token, user } = await response.json();

  return { token, user };
}

export const getProfile = async () => {
  const response = await fetch(`${backendUrl}/auth/getprofile`, {
    headers: {
      'auth-token': localStorage.getItem('job_user')
    }
  });

  const user = await response.json();
  return user;
}