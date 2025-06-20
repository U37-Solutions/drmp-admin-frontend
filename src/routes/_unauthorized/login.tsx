import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Alert, Spin, Typography } from 'antd';
import { useMemo } from 'react';
import { z } from 'zod';

import { useAuth } from '@features/auth/AuthProvider';
import LoginForm from '@features/auth/components/LoginForm/LoginForm';
import { LOGIN_PREV_STATE_FEEDBACK, LoginPrevStateFeedback } from '@features/auth/constants.ts';
import type { LoginResponse } from '@features/auth/types';
import type { TLoginForm } from '@features/auth/validation';

import apiClient from '@/services/api-client';

const searchSchema = z.object({
  from: fallback(z.nativeEnum(LoginPrevStateFeedback).optional(), undefined),
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

  const prevStateAlert = useMemo(() => {
    if (!search.from) {
      return null;
    }

    const alertConfig = LOGIN_PREV_STATE_FEEDBACK[search.from as LoginPrevStateFeedback];

    return <Alert style={{ marginBottom: '1em' }} showIcon {...alertConfig} />;
  }, [search.from]);

  return (
    <>
      <Spin spinning={isPending} fullscreen />
      <Typography.Title level={2}>Вхід</Typography.Title>
      {prevStateAlert}
      <LoginForm onSubmit={signInMutation} />
    </>
  );
}
