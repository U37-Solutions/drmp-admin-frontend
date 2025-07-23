import { createFileRoute } from '@tanstack/react-router';
import { Layout } from 'antd';

import SignUpCompanyPage from '@features/auth/components/SignUpCompanyPage/SignUpCompanyPage';

export const Route = createFileRoute('/_unauthorized/sign-up/company')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <SignUpCompanyPage />
    </Layout>
  );
}
