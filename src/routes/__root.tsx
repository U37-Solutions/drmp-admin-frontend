import { type AuthContext } from '@features/auth/AuthProvider';
import type { QueryClient } from '@tanstack/react-query';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from 'antd';

export interface MyRouterContext {
  queryClient: QueryClient;
  auth?: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Layout>
      <div className="p-2 flex gap-2">
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
