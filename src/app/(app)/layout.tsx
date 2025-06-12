import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { Header, Sidebar } from '@/app/components';
import { getSessionInfo } from '@/features/session/api';
import SessionProvider from '@/lib/providers/session-provider';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const sessionInfo = await getSessionInfo();

  return (
    <SessionProvider sessionInfo={sessionInfo}>
      <Header />
      <Layout>
        <Sidebar />

        <Layout>
          <Content>
            <Flex justify="center" align="center">
              {children}
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </SessionProvider>
  );
};

export default AppLayout;
