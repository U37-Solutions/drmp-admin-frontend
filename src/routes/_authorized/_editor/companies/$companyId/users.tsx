import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/_editor/companies/$companyId/users')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Юзерсісі</div>;
}
