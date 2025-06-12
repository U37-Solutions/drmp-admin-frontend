import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { Layout } from 'antd';
import type { Metadata } from 'next';

import '@/shared/ui/styles/global.scss';
import styles from '@/app/(auth)/layout.module.scss';
import { ThemeProvider } from '@/app/components';

export const metadata: Metadata = {
  title: 'DRMP Admin Panel',
  description: 'Admin panel for digital referral mechanism platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ThemeProvider>
            <Layout className={styles.layout}>{children}</Layout>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
