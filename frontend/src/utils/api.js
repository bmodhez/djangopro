import axios from 'axios';

// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser environment
    const currentUrl = window.location.href;
    
    // If we're on a cloud domain (like .fly.dev), use the same domain for API
    if (currentUrl.includes('.fly.dev') || currentUrl.includes('localhost:3001')) {
      // Use the current origin but replace port 3001 with 3000 for localhost
      if (currentUrl.includes('localhost:3001')) {
        return 'http://localhost:3000';
      }
      // For cloud environments, use the current origin which should proxy to Django
      return window.location.origin;
    }
  }
  
  // Default fallback
  return '';
};

// Create axios instance with dynamic base URL
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error:', error.request);
    }
    return Promise.reject(error);
  }
);

export default api;
