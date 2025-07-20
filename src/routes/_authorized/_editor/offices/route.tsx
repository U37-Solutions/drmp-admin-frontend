import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor/offices')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
