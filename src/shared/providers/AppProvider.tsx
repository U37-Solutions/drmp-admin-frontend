import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from '@features/auth/AuthProvider';

import ThemeProvider from '@/shared/providers/ThemeProvider';

const COOKIE_SET_OPTIONS: { path: string; sameSite: 'strict'; secure: boolean } = {
  path: '/',
  sameSite: 'strict',
  secure: true,
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <CookiesProvider defaultSetOptions={COOKIE_SET_OPTIONS}>
        <AuthProvider>{children}</AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
