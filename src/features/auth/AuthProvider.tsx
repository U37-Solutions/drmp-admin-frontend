import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useCookies } from 'react-cookie';

import type { LoginResponse } from '@features/auth/types';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const isAuthenticated = useMemo(() => !!cookies.accessToken || !!cookies.refreshToken, [cookies]);

  const login = React.useCallback(
    async (data: LoginResponse) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken, {
        expires: dayjs(data.refreshTokenExpiresAt?.replace('EEST', '+03:00')).toDate(),
      });
    },
    [setCookie],
  );

  const logout = React.useCallback(() => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
  }, [removeCookie]);

  const contextValue = React.useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
