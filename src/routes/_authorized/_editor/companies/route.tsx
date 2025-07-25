import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor/companies')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.userRole?.isCompanyAdmin && context.userRole?.companyId) {
      return redirect({
        to: '/companies/$companyId',
        params: { companyId: String(context.userRole.companyId) },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
