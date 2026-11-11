import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('technova_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized, clear invalid token if not on login page
      const isAuthRequest = error.config.url?.includes('/auth/login') || error.config.url?.includes('/auth/register');
      if (!isAuthRequest) {
        localStorage.removeItem('technova_token');
        localStorage.removeItem('technova_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
