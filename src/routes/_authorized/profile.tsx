import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authorized/profile"!</div>;
}
