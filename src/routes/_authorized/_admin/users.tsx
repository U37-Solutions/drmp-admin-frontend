import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { getUsers } from '@features/users/api.ts';
import UsersTable from '@features/users/components/UsersTable.tsx';
import type { UserDTO } from '@features/users/types.ts';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'firstName', 'lastName', 'email']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_admin/users')({
  component: UsersPage,
  validateSearch: zodValidator(searchSchema),
});

function UsersPage() {
  const { data: users, isPending } = useQuery<Array<UserDTO>>({
    queryKey: ['users'],
    queryFn: async () => await getUsers(),
  });

  return (
    <>
      <UsersTable data={users!} isLoading={isPending} />
    </>
  );
}
