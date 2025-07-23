import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import CompanyPage from '@features/company/components/CompanyPage/CompanyPage.tsx';
import { companyByIdQueryOptions } from '@features/company/queries.ts';
import type { CompanyDTO } from '@features/company/types.ts';

export const Route = createFileRoute('/_authorized/_companyAdmin/companies/$companyId')({
  component: RouteComponent,
  beforeLoad: async ({ params, context }) => {
    const { companyId } = params;
    if (!companyId) {
      throw redirect({ to: '/companies' });
    }

    return context.queryClient.ensureQueryData(companyByIdQueryOptions(companyId));
  },
  onError: () => {
    throw redirect({ to: '/companies' });
  },
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data } = useSuspenseQuery<CompanyDTO>(companyByIdQueryOptions(companyId));

  return <CompanyPage data={data} />;
}
