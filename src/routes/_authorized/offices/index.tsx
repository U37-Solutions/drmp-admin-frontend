import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Card, Flex, Input, Typography } from 'antd';
import { useCallback } from 'react';
import { z } from 'zod';

import CreateOfficeAction from '@features/office/components/CreateOfficeAction.tsx';
import OfficesTable from '@features/office/components/OfficesTable/OfficesTable.tsx';

import useTableState from '@shared/hooks/useTableState.ts';
import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

import { createOfficesQueryOptions } from '@/features/office/queries';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'locationName', 'workSchedule', 'companyId']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/offices/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(createOfficesQueryOptions(context.userRole?.companyId));
  },
  onError: () => {
    throw redirect({ to: '/' });
  },
});

function RouteComponent() {
  const roleContext = useRoleContext();
  const queryClient = useQueryClient();
  const companyId = roleContext?.companyId;
  const { data } = useSuspenseQuery(createOfficesQueryOptions(companyId));

  const { search, changeSearch } = useTableState('/_authorized/offices/');

  const refreshData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['offices', companyId] });
  }, [companyId, queryClient]);

  return (
    <Card
      title={
        <Flex align="center" gap={20}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Офіси
          </Typography.Title>
          {companyId && <CreateOfficeAction companyId={companyId} refreshData={refreshData} />}
        </Flex>
      }
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <OfficesTable data={data} route="/_authorized/offices/" />
    </Card>
  );
}
