import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Card, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { clearCookies } from '@services/cookie-client.ts';

import styles from './index.module.scss';

export const Route = createFileRoute('/_unauthorized')({
  component: RouteComponent,
  loader: () => {
    clearCookies();
  },
});

function RouteComponent() {
  return (
    <Content>
      <Flex justify="center" align="center" className={styles.layout}>
        <Card variant="borderless" className={styles.wrapperCard}>
          <Outlet />
        </Card>
      </Flex>
    </Content>
  );
}
