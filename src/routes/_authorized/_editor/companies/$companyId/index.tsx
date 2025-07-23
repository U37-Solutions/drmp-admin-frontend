import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

import OfficesTable from '@features/office/components/OfficesTable/OfficesTable';
import { createOfficeByCompanyIdQueryOptions } from '@features/office/queries';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'locationName', 'workSchedule', 'companyId']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_editor/companies/$companyId/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ params, context }) => {
    const { companyId } = params;
    if (!companyId) {
      throw redirect({ to: '/companies' });
    }

    return context.queryClient.ensureQueryData(createOfficeByCompanyIdQueryOptions(+companyId));
  },
  onError: () => {
    throw redirect({ to: '/companies' });
  },
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data } = useSuspenseQuery(createOfficeByCompanyIdQueryOptions(+companyId));

  return <OfficesTable data={data} route="/_authorized/_editor/companies/$companyId/" companyId={+companyId} />;
}
