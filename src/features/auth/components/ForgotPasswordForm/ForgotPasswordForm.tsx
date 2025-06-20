import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Flex, Form, Input, Spin } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { forgotPassword } from '@features/auth/api.ts';
import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { type TForgotPasswordForm, forgotPasswordSchema } from '@features/auth/validation.ts';

const ForgotPasswordForm = () => {
  const navigate = useNavigate({ from: '/forgot-password' });
  const { mutate, error, isPending } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (email: string) => await forgotPassword(email),
    onSuccess: () => navigate({ to: '/check-email', replace: true }),
    onError: (error) => error,
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (error) {
      setError('email', {
        type: 'manual',
        message: error.message || 'Сталася помилка при надсиланні інструкцій для відновлення паролю. Спробуйте ще раз.',
      });
    }
  }, [error, setError]);

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => mutate(data.email))}>
      <Spin spinning={isPending} fullscreen />
      <Form.Item
        label="Електронна адреса"
        extra={errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder="example@domain.com" status={errors.email ? 'error' : ''} {...field} />
          )}
        />
      </Form.Item>

      <Flex vertical gap={4}>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
          Надіслати інструкції
        </Button>
        <Button block type="default" variant="outlined" htmlType="button" disabled={isSubmitting}>
          <Link to="/login">Повернутися до входу</Link>
        </Button>
      </Flex>
    </Form>
  );
};

export default ForgotPasswordForm;
