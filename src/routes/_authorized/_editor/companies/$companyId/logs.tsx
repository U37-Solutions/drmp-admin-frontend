import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor/companies/$companyId/logs')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Логисісі</div>;
}
