import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API methods
export const userAPI = {
  register: (userData) => api.post('/users', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData)
};

export const gameAPI = {
  getPuzzle: () => api.get('/games/puzzle'),
  validateSolution: (puzzleData) => api.post('/games/validate', puzzleData),
  recordGame: (gameData) => api.post('/games', gameData),
  getHistory: () => api.get('/games/history')
};

export const leaderboardAPI = {
  getLeaderboard: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
  getUserRank: (userId) => api.get(`/leaderboard/rank/${userId}`)
};

export default api;
