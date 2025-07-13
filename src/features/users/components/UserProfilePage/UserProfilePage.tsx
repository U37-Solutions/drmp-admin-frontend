import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Tabs, type TabsProps, Typography, message } from 'antd';
import { useMemo, useState } from 'react';

import { useSessionInfo } from '@features/session/store';
import type { UserDTO } from '@features/users/types.ts';

import { useConfirmNavigation } from '@shared/hooks/useConfirmNavigation';

import UserProfileInfoTab from './UserProfileInfoTab';
import UserProfileSecurityTab from './UserProfileSecurityTab';

import { getUser } from '../../api';

const UserProfilePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
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

  const [isDirty, setIsDirty] = useState(false);

  useConfirmNavigation({
    message: 'Зміни не збережено! Ви впевнені, що хочете залишити сторінку?',
    shouldBlock: isDirty,
    onConfirm: () => setIsDirty(false),
    onCancel: () => ({}),
  });

  const items: TabsProps['items'] = useMemo(
    () =>
      user
        ? [
            {
              key: 'info',
              label: 'Основна інформація',
              icon: <UserOutlined />,
              children: (
                <UserProfileInfoTab
                  user={user}
                  refetchUser={refetchUser}
                  onSubmit={(success) => {
                    if (success) {
                      messageApi.open({
                        type: 'success',
                        content: 'Профіль успішно оновлено',
                      });
                    }
                  }}
                  setIsDirty={setIsDirty}
                />
              ),
            },
            {
              key: 'security',
              label: 'Безпека',
              icon: <LockOutlined />,
              children: (
                <UserProfileSecurityTab
                  refetchUser={refetchUser}
                  onSubmit={(success) => {
                    if (success) {
                      messageApi.open({
                        type: 'success',
                        content: 'Пароль успішно оновлено',
                      });
                    }
                  }}
                  setIsDirty={setIsDirty}
                />
              ),
            },
          ]
        : [],
    [user, setIsDirty, refetchUser, messageApi],
  );

  return (
    <>
      {contextHolder}
      <Card
        title={
          <Flex align="center" justify="space-between" gap={12}>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Профіль
            </Typography.Title>
          </Flex>
        }
        style={{ margin: 20 }}
        loading={isUserPending}
      >
        <Tabs defaultActiveKey={items[0]?.key} items={items} />
      </Card>
    </>
  );
};

export default UserProfilePage;
