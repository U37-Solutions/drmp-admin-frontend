import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_companyAdmin')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.userRole?.isCompanyAdmin) {
      throw redirect({ to: '/profile' });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
