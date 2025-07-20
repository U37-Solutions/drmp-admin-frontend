import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import OfficesTable from '@features/office/components/OfficesTable/OfficesTable.tsx';

import { createOfficesQueryOptions } from '@/features/office/queries';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'locationName', 'workSchedule', 'companyId']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_editor/offices/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ context }) => {
    return context.queryClient.ensureQueryData(createOfficesQueryOptions());
  },
  onError: () => {
    throw redirect({ to: '/offices' });
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(createOfficesQueryOptions());

  return <OfficesTable data={data} route="/_authorized/_editor/offices/" />;
}
