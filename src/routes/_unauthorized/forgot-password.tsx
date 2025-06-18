import { createFileRoute } from '@tanstack/react-router';
import { Flex, Typography } from 'antd';

import ForgotPasswordForm from '@features/auth/components/ForgotPasswordForm/ForgotPasswordForm.tsx';

export const Route = createFileRoute('/_unauthorized/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex vertical gap={20} align="center">
      <Typography.Title level={2}>Забули пароль?</Typography.Title>

      <Typography.Text style={{ textAlign: 'center' }} type="secondary">
        Для відновлення паролю введіть свій email, на який буде надіслано інструкції щодо відновлення паролю.
      </Typography.Text>

      <ForgotPasswordForm />
    </Flex>
  );
}
