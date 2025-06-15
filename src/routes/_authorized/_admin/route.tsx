import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_admin')({
  component: AdminLayout,
  loader: ({ context }) => {
    if (!context.userRole?.isAdmin) {
      throw redirect({
        to: '/profile',
      });
    }
  },
});

function AdminLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
