import { CheckCircleOutlined } from '@ant-design/icons';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Flex, Typography } from 'antd';

export const Route = createFileRoute('/_unauthorized/check-email')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex vertical align="center" gap={20}>
      <Typography.Title level={2}>Лист відправлено</Typography.Title>
      <CheckCircleOutlined style={{ fontSize: '40px' }} />
      <Typography.Text style={{ textAlign: 'center' }}>
        Перевірте свою електронну пошту, щоб підтвердити реєстрацію. Якщо ви не отримали листа, перевірте папку спаму
        або
        <Link to="/forgot-password" replace>
          {' '}
          cпробуйте ще раз
        </Link>
      </Typography.Text>
    </Flex>
  );
}
