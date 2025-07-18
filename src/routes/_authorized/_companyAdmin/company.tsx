import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import CompanyPage from '@features/company/components/CompanyPage/CompanyPage.tsx';
import { companyByIdQueryOptions } from '@features/company/queries.ts';
import type { CompanyDTO } from '@features/company/types.ts';

import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

export const Route = createFileRoute('/_authorized/_companyAdmin/company')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const companyId = context.userRole?.companyId;
    if (!companyId) {
      throw redirect({ to: '/profile' });
    }
    return context.queryClient.ensureQueryData(companyByIdQueryOptions(String(companyId)));
  },
  onError: () => {
    throw redirect({ to: '/profile' });
  },
});

function RouteComponent() {
  const roleContext = useRoleContext();
  const companyId = roleContext?.companyId;
  const { data } = useSuspenseQuery<CompanyDTO>(companyByIdQueryOptions(String(companyId)));

  return <CompanyPage data={data} />;
}
