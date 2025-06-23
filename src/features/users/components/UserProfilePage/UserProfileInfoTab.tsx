import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import type { UserDTO } from '@features/users/types.ts';

import { updateUser } from '../../api';
import { type TUpdateUserInfoForm, updateUserInfoSchema } from '../../validation';

type IProps = {
  isEditMode?: boolean;
  user: UserDTO;
  refetchUser: () => void;
  onSubmit: (success: boolean) => void;
};

const UserProfileInfoTab = ({ isEditMode, user, refetchUser, onSubmit }: IProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, touchedFields, isDirty },
  } = useForm<TUpdateUserInfoForm>({
    resolver: zodResolver(updateUserInfoSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (data: TUpdateUserInfoForm) =>
      await updateUser(user.id, {
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    onError: (error) => error,
    onSuccess: () => {
      onSubmit(true);
      refetchUser();
    },
  });

  useEffect(() => {
    setValue('firstName', user.firstName || '');
    setValue('lastName', user.lastName || '');
    setValue('email', user.email || '');
  }, [user, setValue]);

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => mutate(data))}>
      <Form.Item
        label="Імʼя"
        extra={errors.firstName ? <span className={styles.error}>{errors.firstName.message}</span> : null}
      >
        <Controller
          control={control}
          name="firstName"
          disabled={!isEditMode}
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
          disabled={!isEditMode}
          render={({ field }) => <Input placeholder="Прізвище" type="text" {...field} />}
        />
      </Form.Item>
      <Form.Item
        label="Електронна адреса"
        extra={errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
      >
        <Controller
          control={control}
          name="email"
          disabled
          render={({ field }) => <Input status={errors.email ? 'error' : ''} type="email" {...field} />}
        />
      </Form.Item>
      {isEditMode && (
        <Flex justify="flex-end" gap={12}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={!touchedFields.firstName && !touchedFields.lastName && !touchedFields.email && !isDirty}
          >
            Зберегти
          </Button>
        </Flex>
      )}
    </Form>
  );
};

export default UserProfileInfoTab;
