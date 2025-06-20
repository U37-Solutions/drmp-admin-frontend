import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button, Flex, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { type TLoginForm, loginSchema } from '@features/auth/validation';

import styles from './LoginForm.module.scss';

const { Password } = Input;
const { Item } = Form;

type IProps = {
  onSubmit: (data: TLoginForm) => void;
};

const LoginForm = ({ onSubmit }: IProps) => {
  const navigate = useNavigate({ from: '/login' });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Item
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
      </Item>
      <Item
        label="Пароль"
        extra={errors.password?.message && <span className={styles.error}>{errors.password.message}</span>}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Password status={errors.password ? 'error' : ''} placeholder="********" {...field} />}
        />
      </Item>
      <Flex vertical gap={5}>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
          Увійти
        </Button>
        <Button type="link" onClick={() => navigate({ to: '/forgot-password' })}>
          Забули пароль?
        </Button>
      </Flex>
    </Form>
  );
};

export default LoginForm;
