import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

const { Title } = Typography;

export const Route = createFileRoute('/_authorized/users')({
  component: UsersPage,
});

function UsersPage() {
  return (
    <div>
      <Title>Users</Title>
    </div>
  );
}
