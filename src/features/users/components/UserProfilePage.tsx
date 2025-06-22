import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Typography } from 'antd';

import type { UserDTO } from '@features/users/types.ts';

import { getUser } from '../api';

import { useSessionInfo } from '@/features/session/store';

const UserProfilePage = () => {
  const sessionInfo = useSessionInfo();
  const { data, isPending } = useQuery<UserDTO>({
    queryKey: ['users', sessionInfo?.id],
    queryFn: async () => sessionInfo?.id && (await getUser(sessionInfo.id)),
    enabled: !!sessionInfo?.id,
  });

  return (
    <Card style={{ margin: 20 }} styles={{ body: { padding: 10 } }} loading={isPending}>
      <Flex key="user-info" vertical gap={12}>
        <Flex gap={8}>
          <Typography.Text strong>Ім'я:</Typography.Text>
          <Typography.Text>{data?.firstName}</Typography.Text>
        </Flex>
        <Flex gap={8}>
          <Typography.Text strong>Прізвище:</Typography.Text>
          <Typography.Text>{data?.lastName}</Typography.Text>
        </Flex>
        <Flex gap={8}>
          <Typography.Text strong>Email:</Typography.Text>
          <Typography.Text>{data?.email}</Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default UserProfilePage;
