import { useQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Layout, Skeleton, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense } from 'react';

import apiClient from '@/services/api-client';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import { SessionInfo } from '@features/session/types';

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
    queryFn: async () => await apiClient.get('/session-info').then((res: SessionInfo) => res.data),
  });

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <Header sessionInfo={data} />
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
