import { redirect } from 'next/navigation';

import { SessionInfo } from '@/features/session/types';
import Api from '@/lib/api-client';

export const getSessionInfo = async () => {
  const response = await Api.get<SessionInfo>('/session-info');

  if (response instanceof Error) {
    return null;
  }

  return response;
};

export const refreshSession = async (
  refreshToken: string,
): Promise<{ accessToken: string; accessTokenExpiresAt: string }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    redirect('/login');
  }

  return response.json();
};
