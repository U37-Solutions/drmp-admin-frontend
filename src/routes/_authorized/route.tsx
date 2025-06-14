import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
  loader: ({ context }) => {
    console.log('context', context);
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/_authorized/"!
      <Outlet />
    </div>
  );
}
