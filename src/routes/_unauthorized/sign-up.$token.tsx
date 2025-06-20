import { createFileRoute, redirect } from '@tanstack/react-router';
import { Skeleton, Typography } from 'antd';

import { getUserByTempTokenOptions } from '@features/auth/api.ts';
import SignUpForm from '@features/auth/components/SignUpForm/SignUpForm.tsx';
import { LoginPrevStateFeedback } from '@features/auth/constants.ts';

export const Route = createFileRoute('/_unauthorized/sign-up/$token')({
  loader: async ({ params, context }) => {
    if (!params.token) {
      return redirect({ to: '/login' });
    }

    return context.queryClient.ensureQueryData(getUserByTempTokenOptions(params.token));
  },
  onError: () => {
    throw redirect({
      from: `/sign-up/$token`,
      to: '/login',
      replace: true,
      search: { from: LoginPrevStateFeedback.signUpFail },
    });
  },
  pendingComponent: () => <Skeleton />,
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useParams();
  return (
    <>
      <Typography.Title level={2}>Реєстрація</Typography.Title>
      <SignUpForm token={token} />
    </>
  );
}
