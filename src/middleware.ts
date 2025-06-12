import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  // If the route is not protected or the user has an access token, allow the request to proceed
  if (accessToken || refreshToken) {
    return NextResponse.next();
  }

  // If no access token and no refresh token, redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|api/auth).*)'],
};
