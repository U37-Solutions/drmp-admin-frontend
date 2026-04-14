import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Card, Input } from 'antd';
import { useCallback, useState } from 'react';
import { z } from 'zod';

import { getUsers } from '@features/users/api.ts';
import InviteEditorModal from '@features/users/components/InviteEditorModal/InviteEditorModal.tsx';
import UserHeader from '@features/users/components/UserHeader.tsx';
import UsersTable from '@features/users/components/UsersTable.tsx';
import type { UserDTO } from '@features/users/types.ts';

import useTableState from '@shared/hooks/useTableState.ts';
import { useAlertContext } from '@shared/providers/AlertProvider.tsx';
import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 10).default(10),
  search: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['id', 'firstName', 'lastName', 'email', 'role']), 'id').default('id'),
  sortAsc: fallback(z.boolean(), true).default(true),
});

export const Route = createFileRoute('/_authorized/_editor/users')({
  component: UsersPage,
  validateSearch: zodValidator(searchSchema),
});

function UsersPage() {
  const alertContext = useAlertContext();
  const roleContext = useRoleContext();
  const isEditor = roleContext?.isEditor ?? false;
  const { search, changeSearch } = useTableState('/_authorized/_editor/users');
  const {
    data: users,
    isPending,
    refetch,
  } = useQuery<Array<UserDTO>>({
    queryKey: ['users'],
    queryFn: async () => await getUsers(),
  });

  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleInviteModalClose = useCallback(
    (success: boolean) => {
      if (success && alertContext) {
        alertContext.openNotification('Запрошення успішно надіслано', 'success');
      }

      setShowInviteModal(false);
    },
    [alertContext],
  );

  return (
    <Card
      title={<UserHeader handleInviteClick={() => setShowInviteModal(true)} showInviteButton={!isEditor} />}
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <UsersTable data={users!} isLoading={isPending} refetchData={refetch} routeId="/_authorized/_editor/users" />
      {!isEditor && <InviteEditorModal open={showInviteModal} handleClose={handleInviteModalClose} />}
    </Card>
  );
}
