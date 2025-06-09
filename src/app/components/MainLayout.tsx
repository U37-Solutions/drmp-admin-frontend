'use client';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

import { Header, Sidebar, ThemeProvider } from '@/app/components';

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <Layout>
        <Header />

        <Layout hasSider>
          <Sidebar />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default MainLayout;
