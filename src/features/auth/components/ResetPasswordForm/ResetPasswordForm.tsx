import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Flex, Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { resetPassword } from '@features/auth/api.ts';
import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { LoginPrevStateFeedback } from '@features/auth/constants.ts';
import { type TResetPasswordForm, resetPasswordSchema } from '@features/auth/validation.ts';

const ResetPasswordForm = ({ token }: { token: string }) => {
  const navigate = useNavigate({ from: '/reset-password/$token' });
  const { mutate, error } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async ({ newPassword, token }: { newPassword: string; token: string }) =>
      await resetPassword(token, newPassword),
    onSuccess: () =>
      navigate({ to: '/login', search: { from: LoginPrevStateFeedback.resetPasswordSuccess }, replace: true }),
    onError: (error) => error,
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (error) {
      setError('newPassword', {
        type: 'manual',
        message: error.message,
      });
    }
  }, [error, setError]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit((data) =>
        mutate({
          token,
          newPassword: data.newPassword,
        }),
      )}
    >
      <div>
        <Form.Item
          label="Новий пароль"
          extra={errors.newPassword ? <span className={styles.error}>{errors.newPassword.message}</span> : null}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password placeholder="********" status={errors.newPassword ? 'error' : ''} {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Підтвердження паролю"
          extra={errors.confirmPassword ? <span className={styles.error}>{errors.confirmPassword.message}</span> : null}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password placeholder="********" status={errors.confirmPassword ? 'error' : ''} {...field} />
            )}
          />
        </Form.Item>
      </div>

      <Flex vertical gap={4}>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
          Оновити пароль
        </Button>
        <Button block type="default" variant="outlined" htmlType="button" disabled={isSubmitting}>
          <Link to="/login">Повернутися до входу</Link>
        </Button>
      </Flex>
    </Form>
  );
};

export default ResetPasswordForm;
