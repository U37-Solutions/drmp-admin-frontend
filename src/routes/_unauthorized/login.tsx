import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Alert, Spin, Typography } from 'antd';
import { z } from 'zod';

import { useAuth } from '@features/auth/AuthProvider';
import LoginForm from '@features/auth/components/LoginForm/LoginForm';
import type { LoginResponse } from '@features/auth/types';
import type { TLoginForm } from '@features/auth/validation';

import apiClient from '@/services/api-client';

const searchSchema = z.object({
  passwordReset: z.boolean().optional(),
});

export const Route = createFileRoute('/_unauthorized/login')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      context.auth.logout();
    }
  },
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const { mutate: signInMutation, isPending } = useMutation<{ data: LoginResponse }, Error, TLoginForm>({
    mutationFn: ({ email, password }) => apiClient.post('/auth/login', { email, password }),
    onSuccess: ({ data }) => {
      auth.login(data);
      navigate({ to: '/users' });
    },
  });

  return (
    <>
      <Spin spinning={isPending} fullscreen />
      <Typography.Title level={2}>Вхід</Typography.Title>
      {search.passwordReset && (
        <Alert
          style={{ marginBottom: '1em' }}
          message="Пароль успішно змінено"
          description="Тепер ви можете увійти, використовуючи новий пароль."
          type="success"
          showIcon
        />
      )}
      <LoginForm onSubmit={signInMutation} />
    </>
  );
}
