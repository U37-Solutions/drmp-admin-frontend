import { createFileRoute } from '@tanstack/react-router';
import { Flex, Typography } from 'antd';

const { Title } = Typography;

export const Route = createFileRoute('/_unauthorized/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex vertical gap={20} align="center">
      <Title level={2}>Забули пароль?</Title>
    </Flex>
  );
}
