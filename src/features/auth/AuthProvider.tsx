import dayjs from 'dayjs';
import React from 'react';
import { useCookies } from 'react-cookie';

import { LoginResponse } from '@features/auth/types';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const isAuthenticated = !!cookies.accessToken || !!cookies.refreshToken;

  const login = async (data: LoginResponse) => {
    setCookie('accessToken', data.accessToken, {
      expires: dayjs(data.accessTokenExpiresAt?.replace('EEST', '+03:00')).toDate(),
    });
    setCookie('refreshToken', data.refreshToken, {
      expires: dayjs(data.refreshTokenExpiresAt?.replace('EEST', '+03:00')).toDate(),
    });
  };

  const logout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
