import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { type TInviteUserForm, inviteCompanyUserSchema, inviteUserSchema } from '@features/users/validation.ts';

type Props = {
  onSubmit(data: TInviteUserForm): void;
  onCancel: () => void;
  schema: typeof inviteCompanyUserSchema | typeof inviteUserSchema;
};

const InviteUserForm = ({ onSubmit, onCancel, schema }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TInviteUserForm>({
    resolver: zodResolver(schema),
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => onSubmit(data))}>
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
          render={({ field }) => (
            <Input status={errors.firstName ? 'error' : ''} placeholder="Імʼя" type="text" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Прізвище"
        extra={errors.lastName ? <span className={styles.error}>{errors.lastName.message}</span> : null}
      >
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <Input status={errors.lastName ? 'error' : ''} placeholder="Прізвище" type="text" {...field} />
          )}
        />
      </Form.Item>
      <Flex justify="flex-end" gap={12}>
        <Button htmlType="reset" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="primary" htmlType="submit">
          Запросити
        </Button>
      </Flex>
    </Form>
  );
};

export default InviteUserForm;
