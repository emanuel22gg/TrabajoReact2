const API_URL = 'https://api.escuelajs.co/api/v1';

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    return null; 
  }

  const data = await response.json();

  const profileRes = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  });

  if (!profileRes.ok) {
    return null;
  }

  const user = await profileRes.json();
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  };
};