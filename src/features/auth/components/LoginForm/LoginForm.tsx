import { TLoginForm, loginSchema } from '@features/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import styles from './LoginForm.module.scss';

const { Password } = Input;
const { Item } = Form;
const { Title } = Typography;

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    console.log('there');
  };

  return (
    <Flex vertical gap={20} align="center">
      {/*<Spin spinning={loading} fullscreen />*/}
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
          {/*<Link to="/forgot-password">Забули пароль?</Link>*/}
          <Button block type="primary" htmlType="submit" disabled={isSubmitting}>
            Увійти
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default LoginForm;
