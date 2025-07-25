import { redirect } from '@tanstack/react-router';
import axios from 'axios';

import { refreshSession } from '@features/session/api.ts';

import { getCookie } from '@services/cookie-client';

const ALLOWED_REQUESTS = ['/auth/', 'confirm-registration', '/temporary'];

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    const isLoginRequest = !!config.url?.includes('login');

    if (accessToken && !isLoginRequest) {
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
    const originalRequest = err.config;
    const isAuthFlow = ALLOWED_REQUESTS.some((url) => originalRequest.url?.includes(url));

    if (err.response?.status === 401 && !originalRequest._retry && !isAuthFlow) {
      originalRequest._retry = true;
      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) {
        throw redirect({ to: '/login', throw: true });
      }

      try {
        const newToken = await refreshSession(refreshToken);
        document.cookie = `accessToken=${newToken}; path=/;`;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        redirect({ to: '/login' });
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
