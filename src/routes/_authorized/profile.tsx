import { createFileRoute } from '@tanstack/react-router';

import UserProfilePage from '@/features/users/components/UserProfilePage';

export const Route = createFileRoute('/_authorized/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserProfilePage />;
}
