'use client';
import { ConfigProvider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';

import { DarkTheme, LightTheme } from '@/shared/ui/themes';

import { Header, Sidebar } from '@/app/components';

type ThemeType = 'light' | 'dark';

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as ThemeType;
      setTheme(storedTheme);
    }
  }, []);

  const themeConfig = theme === 'light' ? DarkTheme : LightTheme;

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout>
        <Header />

        <Layout hasSider>
          <Sidebar />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
