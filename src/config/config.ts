const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  // Default to localhost:3001 if no API URL is provided
  if (!url) return 'http://localhost:3001/api';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const config = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  apiUrl: getApiUrl(),
  auth: {
    tokenKey: 'auth_token',
    getToken: () => localStorage.getItem('auth_token'),
    setToken: (token: string) => localStorage.setItem('auth_token', token),
    removeToken: () => localStorage.removeItem('auth_token'),
    isAuthenticated: () => !!localStorage.getItem('auth_token')
  }
};

export default config;
