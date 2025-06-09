'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { TLoginForm, loginSchema } from '@/features/auth/validation';

const { Password } = Input;
const { Item } = Form;
const { Title } = Typography;

const Page = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginForm) => console.log('Form submitted:', data);

  const renderPasswordExtra = useCallback(
    () => (
      <Flex justify="space-between" className={styles.passwordExtra}>
        <div>
          {errors.password && errors.password.message && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <Link href="/forgot-password">Забули пароль?</Link>
      </Flex>
    ),
    [errors.password],
  );

  return (
    <Flex vertical gap={20} align="center">
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
        <Item label="Пароль" extra={renderPasswordExtra()}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password status={errors.password ? 'error' : ''} placeholder="********" {...field} />
            )}
          />
        </Item>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
          Увійти
        </Button>
      </Form>
    </Flex>
  );
};

export default Page;
