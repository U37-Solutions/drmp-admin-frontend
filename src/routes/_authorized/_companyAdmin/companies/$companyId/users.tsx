import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Flex, Input } from 'antd';
import { useMemo } from 'react';
import { z } from 'zod';

import { Permission } from '@features/session/types.ts';
import { getUsersByCompany } from '@features/users/api.ts';
import InviteCompanyUserAction from '@features/users/components/InviteCompanyUserAction/InviteCompanyUserAction.tsx';
import UsersTable from '@features/users/components/UsersTable.tsx';
import type { UserDTO } from '@features/users/types.ts';

import { currentUserHasPermissions } from '@services/has-permissions.ts';

import useTableState from '@shared/hooks/useTableState.ts';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'firstName', 'lastName', 'email', 'role']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

const getUsersByCompanyQueryOptions = (companyId: number) => ({
  queryKey: ['users', companyId],
  queryFn: async () => await getUsersByCompany(Number(companyId)),
});

export const Route = createFileRoute('/_authorized/_companyAdmin/companies/$companyId/users')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ context, params }) => {
    const { companyId } = params;

    return await context.queryClient.ensureQueryData(getUsersByCompanyQueryOptions(Number(companyId)));
  },
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data, isPending, refetch } = useSuspenseQuery<Array<UserDTO>>(
    getUsersByCompanyQueryOptions(Number(companyId)),
  );

  const { search, changeSearch } = useTableState('/_authorized/_companyAdmin/companies/$companyId/users');

  const canInviteUsers = useMemo(() => currentUserHasPermissions(Permission.COMPANY_USERS_INVITE), []);

  return (
    <Flex vertical gap={8}>
      <Flex justify="space-between" align="center" gap={12}>
        {canInviteUsers && <InviteCompanyUserAction />}

        <Input.Search defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />
      </Flex>
      <UsersTable data={data} isLoading={isPending} refetchData={refetch} routeId={Route.id} />
    </Flex>
  );
}
