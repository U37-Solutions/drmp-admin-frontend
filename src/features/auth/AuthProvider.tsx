import React from 'react';
import { useCookies } from 'react-cookie';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const isAuthenticated = !!cookies.accessToken;

  const login = async (username: string, password: string) => {
    // Simulate an API call
    if (username === 'admin' && password === 'password') {
      setCookie('accessToken', 'some-access-token', { path: '/' });
      setCookie('refreshToken', 'some-refresh-token', { path: '/' });
    } else {
      throw new Error('Invalid credentials');
    }
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
