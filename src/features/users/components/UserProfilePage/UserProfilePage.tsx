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

  const [isEditMode, setIsEditMode] = useState(false);

  const items: TabsProps['items'] = useMemo(
    () =>
      user
        ? [
            {
              key: 'info',
              label: 'Основна інформація',
              children: (
                <UserProfileInfoTab
                  isEditMode={isEditMode}
                  user={user}
                  refetchUser={refetchUser}
                  onSubmit={(success) => success && setIsEditMode(false)}
                />
              ),
            },
            {
              key: 'security',
              label: 'Безпека',
              children: (
                <UserProfileSecurityTab
                  isEditMode={isEditMode}
                  userId={user.id}
                  refetchUser={refetchUser}
                  onSubmit={(success) => success && setIsEditMode(false)}
                />
              ),
            },
          ]
        : [],
    [user, isEditMode, refetchUser],
  );

  return (
    <Card
      title={
        <Flex align="center" justify="space-between" gap={12}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Профіль
          </Typography.Title>
          {!isEditMode ? (
            <Button type="primary" onClick={() => setIsEditMode(true)}>
              Редагувати
            </Button>
          ) : (
            <Button variant="outlined" color="red" onClick={() => setIsEditMode(false)}>
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
