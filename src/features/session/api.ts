import { cookies } from 'next/headers';
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

export const refreshSession = async (): Promise<string> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

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

  const { accessToken, accessTokenExpiresAt } = await response.json();

  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/refresh-session`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      accessTokenExpiresAt,
    }),
  });

  return accessToken;
};
