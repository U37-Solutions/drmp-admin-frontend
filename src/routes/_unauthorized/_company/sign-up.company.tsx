import { createFileRoute } from '@tanstack/react-router';

import SignUpCompanyPage from '@features/auth/components/SignUpCompanyPage/SignUpCompanyPage';

export const Route = createFileRoute('/_unauthorized/_company/sign-up/company')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpCompanyPage />;
}
