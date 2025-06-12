'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Spin, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { TLoginForm, loginSchema } from '@/features/auth/validation';

const { Password } = Input;
const { Item } = Form;
const { Title } = Typography;

const Page = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/users');
    } else {
      setFormError('password', { message: 'Неправильний пароль або електронна адреса' });
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap={20} align="center">
      <Spin spinning={loading} fullscreen />
      <Title level={2}>Вхід</Title>

      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(onSubmit)}>
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
            render={({ field }) => (
              <Password status={errors.password ? 'error' : ''} placeholder="********" {...field} />
            )}
          />
        </Item>
        <Flex vertical gap={10}>
          <Link href="/forgot-password">Забули пароль?</Link>
          <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
            Увійти
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default Page;
