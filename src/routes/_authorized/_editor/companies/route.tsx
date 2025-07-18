import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor/companies')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
