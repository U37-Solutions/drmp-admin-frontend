import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from 'antd';

import { type AuthContext } from '@features/auth/AuthProvider';

export interface MyRouterContext {
  queryClient: QueryClient;
  auth?: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Layout style={{ height: '100%' }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
