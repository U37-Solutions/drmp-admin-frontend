import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();
  const { accessToken, accessTokenExpiresAt } = body;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  cookieStore.set('accessToken', accessToken || '', {
    path: '/',
    expires: new Date(accessTokenExpiresAt),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ message: 'Session refreshed successfully' }, { status: 200 });
}
