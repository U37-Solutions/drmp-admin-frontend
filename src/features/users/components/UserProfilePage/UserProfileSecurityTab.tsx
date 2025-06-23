import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form } from 'antd';
import Password from 'antd/es/input/Password';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';

import { resetUserPassword } from '../../api';
import { type TUpdateUserSecurityForm, updateUserSecuritySchema } from '../../validation';

type IProps = {
  isEditMode?: boolean;
  userId: number;
  refetchUser: () => void;
  onSubmit: (success: boolean) => void;
};

const UserProfileSecurityTab = ({ isEditMode, refetchUser, onSubmit }: IProps) => {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, touchedFields, isDirty },
  } = useForm<TUpdateUserSecurityForm>({
    resolver: zodResolver(updateUserSecuritySchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['reset-password-user'],
    mutationFn: async (data: TUpdateUserSecurityForm) =>
      await resetUserPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    onError: (error) => error,
    onSuccess: () => {
      reset();
      onSubmit(true);
      refetchUser();
    },
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
        label="Введіть старий пароль"
        extra={errors.oldPassword ? <span className={styles.error}>{errors.oldPassword.message}</span> : null}
      >
        <Controller
          control={control}
          name="oldPassword"
          disabled={!isEditMode}
          render={({ field }) => (
            <Password status={errors.oldPassword ? 'error' : ''} placeholder="********" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Введіть новий пароль"
        extra={errors.newPassword ? <span className={styles.error}>{errors.newPassword.message}</span> : null}
      >
        <Controller
          control={control}
          name="newPassword"
          disabled={!isEditMode}
          render={({ field }) => (
            <Password status={errors.newPassword ? 'error' : ''} placeholder="********" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Повторіть новий пароль"
        extra={
          errors.confirmNewPassword ? <span className={styles.error}>{errors.confirmNewPassword.message}</span> : null
        }
      >
        <Controller
          control={control}
          name="confirmNewPassword"
          disabled={!isEditMode}
          render={({ field }) => (
            <Password status={errors.confirmNewPassword ? 'error' : ''} placeholder="********" {...field} />
          )}
        />
      </Form.Item>
      {isEditMode && (
        <Flex justify="flex-end" gap={12}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={!touchedFields.newPassword && !touchedFields.confirmNewPassword && !isDirty}
          >
            Зберегти
          </Button>
        </Flex>
      )}
    </Form>
  );
};

export default UserProfileSecurityTab;
