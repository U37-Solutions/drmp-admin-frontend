import { redirect } from '@tanstack/react-router';
import axios from 'axios';

import { getCookie } from '@services/cookie-client';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

let isRefreshingSession = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (isRefreshingSession) return;

    if (err.response?.status === 403 || err.response?.status === 401) {
      isRefreshingSession = true;
      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) return redirect({ to: '/login' });

      const { accessToken: newAccessToken } = await apiClient
        .post('/auth/refresh', { refreshToken })
        .then((res) => res.data)
        .catch(() => redirect({ to: '/login' }));

      if (newAccessToken) {
        document.cookie = `accessToken=${newAccessToken}; path=/;`;
        err.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        isRefreshingSession = false;
        return await apiClient(err.config);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
