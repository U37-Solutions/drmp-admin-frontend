import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from 'antd';

import { type AuthContext } from '@features/auth/AuthProvider';

import type { UserRoleContext } from '@shared/providers/UserRoleProvider.tsx';

export interface MyRouterContext {
  queryClient: QueryClient;
  auth?: AuthContext;
  userRole?: UserRoleContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Layout style={{ height: '100%' }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
