import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.userRole?.isAdmin && !context.userRole?.isEditor) {
      throw redirect({
        to: '/profile',
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
