import { Card, Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import styles from './layout.module.scss';

import { Header, ThemeProvider } from '@/app/components';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Layout className={styles.layout}>
        <Header />
        <Content>
          <Flex justify="center" align="center" className={styles.content}>
            <Card className={styles.contentCard} variant="borderless">
              {children}
            </Card>
          </Flex>
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default AuthLayout;
