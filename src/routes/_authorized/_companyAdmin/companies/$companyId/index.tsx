import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Flex, Input } from 'antd';
import { useCallback } from 'react';
import z from 'zod';

import CreateOfficeAction from '@features/office/components/CreateOfficeAction.tsx';
import OfficesTable from '@features/office/components/OfficesTable/OfficesTable';
import { createOfficeByCompanyIdQueryOptions } from '@features/office/queries';

import useTableState from '@shared/hooks/useTableState.ts';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'locationName', 'workSchedule', 'companyId']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_companyAdmin/companies/$companyId/')({
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
  const queryClient = useQueryClient();
  const { companyId } = Route.useParams();
  const { data } = useSuspenseQuery(createOfficeByCompanyIdQueryOptions(+companyId));

  const { search, changeSearch } = useTableState('/_authorized/_companyAdmin/companies/$companyId/');

  const refreshData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['company/offices', companyId] });
  }, [companyId, queryClient]);

  return (
    <Flex vertical gap={8}>
      <Flex gap={12} align="center" justify="space-between">
        {companyId && <CreateOfficeAction companyId={+companyId} refreshData={refreshData} showBtnText />}
        <Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />
      </Flex>

      <OfficesTable data={data} route="/_authorized/_companyAdmin/companies/$companyId/" />
    </Flex>
  );
}
