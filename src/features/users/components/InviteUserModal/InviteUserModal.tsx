import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input, Modal, Typography } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { inviteUser } from '@features/users/api.ts';
import { type TInviteUserForm, inviteUserSchema } from '@features/users/validation.ts';

type IProps = {
  open: boolean;
  handleClose: (success: boolean) => void;
};

const InviteUserModal = ({ open, handleClose }: IProps) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['invite-user'],
    mutationFn: async (data: TInviteUserForm) => await inviteUser(data),
    onError: (error) => error,
    onSuccess: () => handleClose(true),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<TInviteUserForm>({
    resolver: zodResolver(inviteUserSchema),
  });

  useEffect(() => {
    if (error) {
      setError('email', {
        message: error.message,
      });
    }
  }, [error, setError]);

  return (
    <Modal
      centered
      open={open}
      footer={null}
      destroyOnHidden
      loading={isPending}
      onCancel={() => handleClose(false)}
      title="Запросити нового редактора"
    >
      <Flex vertical gap={24}>
        <Typography.Text type="secondary">
          Введіть електронну адресу, та, за бажанням, імʼя та прізвище нового користувача. Лист із запрошенням та
          подальшими інструкціями прийде на введену Вами електронну пошту.
        </Typography.Text>
        <Form layout="vertical" onFinish={handleSubmit((data) => mutate(data))}>
          <Form.Item
            label="Електронна адреса"
            extra={errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input status={errors.email ? 'error' : ''} placeholder="example@example.com" type="email" {...field} />
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
          <Flex justify="flex-end" gap={12}>
            <Button htmlType="reset" onClick={() => handleClose(false)}>
              Скасувати
            </Button>
            <Button type="primary" htmlType="submit">
              Запросити
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  );
};

export default InviteUserModal;
