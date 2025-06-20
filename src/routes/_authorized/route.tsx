import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Layout, Skeleton, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense, useEffect } from 'react';

import { getSessionInfo } from '@features/session/api.ts';
import { useSetSessionInfo } from '@features/session/store';

import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

const sessionInfoQuery = {
  queryKey: ['sessionInfo'],
  queryFn: async () => await getSessionInfo(),
};

export const Route = createFileRoute('/_authorized')({
  component: AuthorizedLayout,
  errorComponent: () => <Skeleton />,
  loader: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }

    return context.queryClient.ensureQueryData(sessionInfoQuery);
  },
});

function AuthorizedLayout() {
  const setSessionInfo = useSetSessionInfo();
  const { data, isLoading } = useSuspenseQuery(sessionInfoQuery);

  useEffect(() => {
    setSessionInfo(data ?? null);
  }, [data, setSessionInfo]);

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <Header />
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <Suspense fallback={<Skeleton />}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
