import axios from 'axios';

import type { SessionInfo } from '@features/session/types.ts';

import apiClient from '@services/api-client.ts';

export const getSessionInfo = async () => await apiClient.get<SessionInfo>('/session-info').then((res) => res.data);

export const refreshSession = async (refreshToken: string) =>
  await axios
    .post<{ accessToken: string }>(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      refreshToken,
    })
    .then((res) => res.data?.accessToken);
