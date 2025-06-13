import { cookies } from 'next/headers';

const Api = () => {
  const formatHeaders = (accessToken?: string, headers?: RequestInit['headers']): RequestInit['headers'] => ({
    ...headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  const sendRequest = async <T>(
    method: RequestInit['method'],
    path: string,
    options?: RequestInit,
  ): Promise<T | Error> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...options,
      method,
      headers: formatHeaders(accessToken, options?.headers),
    });

    // TODO: Implement error handling for these errors
    if (!response.ok && response.status !== 401 && response.status !== 403) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if ((response.status === 401 || response.status === 403) && refreshToken) {
      throw new Error('Refresh token expired');
    }

    return response.json();
  };

  const get = async <T>(path: string, options?: RequestInit): Promise<T | Error> => {
    return sendRequest<T>('GET', path, options);
  };

  const post = async <T>(path: string, options?: RequestInit): Promise<T | Error> => {
    return sendRequest<T>('POST', path, options);
  };

  const put = async <T>(path: string, options?: RequestInit): Promise<T | Error> => {
    return sendRequest<T>('PUT', path, options);
  };

  return {
    get,
    post,
    put,
  };
};

export default Api();
