import { Card, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';

import styles from './layout.module.scss';

import { Header } from '@/app/components';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Content>
        <Flex justify="center" align="center" className={styles.content}>
          <Card className={styles.contentCard} variant="borderless">
            {children}
          </Card>
        </Flex>
      </Content>
    </>
  );
};

export default AuthLayout;
