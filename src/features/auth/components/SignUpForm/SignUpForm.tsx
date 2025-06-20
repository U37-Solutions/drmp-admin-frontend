import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Flex, Form, Input, Skeleton, Tooltip } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { getUserByTempTokenOptions, signUp } from '@features/auth/api.ts';
import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { LoginPrevStateFeedback } from '@features/auth/constants.ts';
import { type TSignUpForm, signUpSchema } from '@features/auth/validation.ts';

const SignUpForm = ({ token }: { token: string }) => {
  const navigate = useNavigate({ from: '/sign-up/$token' });
  const { data } = useSuspenseQuery(getUserByTempTokenOptions(token));

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (data: TSignUpForm) => await signUp(data),
    onSuccess: () => navigate({ to: '/login', search: { from: LoginPrevStateFeedback.signUpSuccess }, replace: true }),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpForm>({
    defaultValues: { ...data, token },
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (error) {
      setError('email', { message: error.message });
    }
  }, [error, setError]);

  return (
    <Skeleton loading={isPending}>
      <Form layout="vertical" onFinish={handleSubmit((data) => mutate(data))}>
        <Form.Item
          label="Електронна адреса"
          extra={errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Tooltip title="Ви не можете змінити електронну пошту">
                <Input
                  readOnly
                  disabled
                  type="email"
                  placeholder="example@domain.com"
                  status={errors.email ? 'error' : ''}
                  {...field}
                />
              </Tooltip>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Імʼя"
          extra={errors.firstName ? <span className={styles.error}>{errors.firstName.message}</span> : null}
        >
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => <Input placeholder="Імʼя" type="text" {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Прізвище"
          extra={errors.lastName ? <span className={styles.error}>{errors.lastName.message}</span> : null}
        >
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => <Input placeholder="Прізвище" type="text" {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          extra={errors.password ? <span className={styles.error}>{errors.password.message}</span> : null}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password placeholder="********" status={errors.password ? 'error' : ''} {...field} />
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
        <Flex vertical gap={4}>
          <Button type="primary" htmlType="submit">
            Зареєструватися
          </Button>
          <Button type="default" variant="outlined" htmlType="button" disabled={isSubmitting}>
            <Link to="/login">Повернутися до входу</Link>
          </Button>
        </Flex>
      </Form>
    </Skeleton>
  );
};

export default SignUpForm;
