import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from '@features/auth/AuthProvider';

import { AlertProvider } from '@shared/providers/AlertProvider.tsx';
import ThemeProvider from '@shared/providers/ThemeProvider';
import { UserRoleProvider } from '@shared/providers/UserRoleProvider.tsx';

const COOKIE_SET_OPTIONS: { path: string; sameSite: 'strict'; secure: boolean } = {
  path: '/',
  sameSite: 'strict',
  secure: true,
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <CookiesProvider defaultSetOptions={COOKIE_SET_OPTIONS}>
        <AuthProvider>
          <UserRoleProvider>
            <AlertProvider>{children}</AlertProvider>
          </UserRoleProvider>
        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
