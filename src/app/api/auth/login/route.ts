import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const data = await req.json();

  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    cookieStore.set('accessToken', result.accessToken, {
      path: '/',
      expires: new Date(result.accessTokenExpiresAt),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('refreshToken', result.refreshToken, {
      path: '/',
      expires: new Date(result.refreshTokenExpiresAt),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid email or password', data: error }, { status: 500 });
  }
}
