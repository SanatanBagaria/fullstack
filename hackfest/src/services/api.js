import axios from 'axios';

// Use explicit URL for debugging
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const userAPI = {
  register: (userData) => api.post('/users', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData)
};

export const gameAPI = {
  getPuzzle: () => api.get('/games/puzzle'),
  validateSolution: (data) => api.post('/games/validate', data),
  recordGame: (gameData) => api.post('/games', gameData),
  getHistory: () => api.get('/games/history')
};

export const leaderboardAPI = {
  getLeaderboard: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
  getUserRank: () => api.get('/leaderboard/rank')
};

export default api;
