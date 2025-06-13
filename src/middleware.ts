import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshSession } from '@/features/session/api';

const ALLOWED_PATHS = ['/login', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isProtected = !ALLOWED_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!isProtected) {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return NextResponse.next();
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const { accessToken: newAccessToken, accessTokenExpiresAt } = await refreshSession(refreshToken);

      const res = NextResponse.redirect(request.nextUrl);
      res.cookies.set('accessToken', newAccessToken, {
        path: '/',
        expires: new Date(accessTokenExpiresAt),
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // If no access token and no refresh token, redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|api/auth).*)'],
};
