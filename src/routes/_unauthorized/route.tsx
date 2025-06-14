import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Card, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';

export const Route = createFileRoute('/_unauthorized')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Content>
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Card style={{ width: 400 }} variant="borderless">
          <Outlet />
        </Card>
      </Flex>
    </Content>
  );
}
