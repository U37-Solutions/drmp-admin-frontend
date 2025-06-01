import type { Metadata } from 'next';

import '@/shared/ui/styles/global.scss';

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
      <body>{children}</body>
    </html>
  );
}
