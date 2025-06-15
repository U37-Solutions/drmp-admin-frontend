import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Flex, Spin, Typography } from 'antd';

import { useAuth } from '@features/auth/AuthProvider';
import LoginForm from '@features/auth/components/LoginForm/LoginForm';
import type { LoginResponse } from '@features/auth/types';
import type { TLoginForm } from '@features/auth/validation';

import apiClient from '@/services/api-client';

const { Title } = Typography;

export const Route = createFileRoute('/_unauthorized/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      context.auth.logout();
    }
  },
});

function RouteComponent() {
  const auth = useAuth();
  const router = useRouter();

  const { mutate: signInMutation, isPending } = useMutation<{ data: LoginResponse }, Error, TLoginForm>({
    mutationFn: ({ email, password }) => apiClient.post('/auth/login', { email, password }),
    onSuccess: ({ data }) => {
      auth.login(data);
      router.navigate({ to: '/users' });
    },
  });

  return (
    <>
      <Spin spinning={isPending} fullscreen />
      <Flex vertical gap={20} align="center">
        <Title level={2}>Вхід</Title>
        <LoginForm onSubmit={signInMutation} />
      </Flex>
    </>
  );
}
