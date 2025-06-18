import { createFileRoute, redirect } from '@tanstack/react-router';
import { Typography } from 'antd';

import ResetPasswordForm from '@features/auth/components/ResetPasswordForm/ResetPasswordForm.tsx';

export const Route = createFileRoute('/_unauthorized/reset-password/$token')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    if (!params.token) {
      redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  const { token } = Route.useParams();
  return (
    <>
      <Typography.Title level={2}>Оновлення паролю</Typography.Title>
      <ResetPasswordForm token={token} />
    </>
  );
}
