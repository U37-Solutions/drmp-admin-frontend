import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Card, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Confetti from 'react-confetti';

import { useConfettiShow } from '@shared/ui/utils/confetti';

import styles from './index.module.scss';

export const Route = createFileRoute('/_unauthorized/_company')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isAuthenticated = !!context.auth?.isAuthenticated;

    if (isAuthenticated) {
      const fallback = '/';

      throw redirect({
        to: fallback,
      });
    }
  },
});

function RouteComponent() {
  const showConfetti = useConfettiShow();

  return (
    <>
      <Content>
        <Flex justify="center" align="center" className={styles.layout}>
          <Card variant="borderless" className={styles.wrapperCard}>
            <Outlet />
          </Card>
        </Flex>
      </Content>
      {showConfetti && <Confetti />}
    </>
  );
}
