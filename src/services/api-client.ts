import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
