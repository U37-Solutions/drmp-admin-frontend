import { redirect } from '@tanstack/react-router';
import axios from 'axios';

import { getCookie } from '@/services/cookie-client';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 403 || err.response?.status === 401) {
      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) return redirect({ to: '/login' });

      const { accessToken: newAccessToken } = await apiClient
        .post('/auth/refresh', { refreshToken })
        .then((res) => res.data);

      if (newAccessToken) {
        document.cookie = `accessToken=${newAccessToken}; path=/;`;
        err.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return await apiClient(err.config);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
