import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form } from 'antd';
import Password from 'antd/es/input/Password';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';

import { updateUser } from '../../api';
import { type TUpdateUserSecurityForm, updateUserSecuritySchema } from '../../validation';

type IProps = {
  userId: number;
  refetchUser: () => void;
};

const UserProfileSecurityTab = ({ userId, refetchUser }: IProps) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['reset-password-user'],
    mutationFn: async (data: TUpdateUserSecurityForm) => await updateUser(userId, data),
    onError: (error) => error,
    onSuccess: () => refetchUser(),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TUpdateUserSecurityForm>({
    resolver: zodResolver(updateUserSecuritySchema),
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
    <Form layout="vertical" onFinish={handleSubmit((data) => mutate(data))}>
      <Form.Item
        label="Введіть пароль"
        extra={errors.newPassword ? <span className={styles.error}>{errors.newPassword.message}</span> : null}
      >
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <Password status={errors.newPassword ? 'error' : ''} placeholder="********" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Повторіть пароль"
        extra={
          errors.confirmNewPassword ? <span className={styles.error}>{errors.confirmNewPassword.message}</span> : null
        }
      >
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field }) => (
            <Password status={errors.confirmNewPassword ? 'error' : ''} placeholder="********" {...field} />
          )}
        />
      </Form.Item>
      <Flex justify="flex-end" gap={12}>
        <Button type="primary" htmlType="submit">
          Зберегти
        </Button>
      </Flex>
    </Form>
  );
};

export default UserProfileSecurityTab;
