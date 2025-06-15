import { useQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Layout, Skeleton, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense } from 'react';

import type { SessionInfo } from '@features/session/types';

import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

import apiClient from '@/services/api-client';

export const Route = createFileRoute('/_authorized')({
  component: AuthorizedLayout,
  loader: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function AuthorizedLayout() {
  const { data, isLoading } = useQuery<SessionInfo>({
    queryKey: ['sessionInfo'],
    queryFn: async () => await apiClient.get<SessionInfo>('/session-info').then((res) => res.data),
  });

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      {/* TODO: Update logic with ! symbol */}
      <Header sessionInfo={data!} />
      <Layout>
        <Sidebar />
        <Layout>
          <Content style={{ padding: 20 }}>
            <Suspense fallback={<Skeleton />}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
