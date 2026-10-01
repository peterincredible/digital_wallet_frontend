import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: BASE_URL, // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or context / state)
    const auth =JSON.parse(localStorage.getItem('auth'));
    
    if (auth && auth.token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;