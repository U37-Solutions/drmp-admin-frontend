import { useQuery } from '@tanstack/react-query';
import { Button, Card, Flex, Tabs, type TabsProps, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { useSessionInfo } from '@features/session/store';
import type { UserDTO } from '@features/users/types.ts';

import UserProfileInfoTab from './UserProfileInfoTab';
import UserProfileSecurityTab from './UserProfileSecurityTab';

import { getUser } from '../../api';

const UserProfilePage = () => {
  const sessionInfo = useSessionInfo();
  const {
    data: user,
    isPending: isUserPending,
    refetch: refetchUser,
  } = useQuery<UserDTO>({
    queryKey: ['users', sessionInfo?.id],
    queryFn: async () => sessionInfo?.id && (await getUser(sessionInfo.id)),
    enabled: !!sessionInfo?.id,
  });

  const [editMode, setEditMode] = useState(false);

  const items: TabsProps['items'] = useMemo(
    () =>
      user
        ? [
            {
              key: 'info',
              label: 'Основна інформація',
              children: <UserProfileInfoTab user={user} refetchUser={refetchUser} />,
            },
            {
              key: 'security',
              label: 'Безпека',
              children: <UserProfileSecurityTab userId={user.id} refetchUser={refetchUser} />,
            },
          ]
        : [],
    [user, refetchUser],
  );

  return (
    <Card
      title={
        <Flex gap={12}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Профіль
          </Typography.Title>
          {!editMode ? (
            <Button type="primary" onClick={() => setEditMode(true)}>
              Редагувати
            </Button>
          ) : (
            <Button type="primary" variant="outlined" onClick={() => setEditMode(false)}>
              Закрити редагування
            </Button>
          )}
        </Flex>
      }
      style={{ margin: 20 }}
      loading={isUserPending}
    >
      <Tabs defaultActiveKey={items[0]?.key} items={items} />
    </Card>
  );
};

export default UserProfilePage;
