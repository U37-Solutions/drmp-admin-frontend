import { useQuery } from '@tanstack/react-query';
import { Flex, Modal, Typography } from 'antd';

import { getUser } from '@features/users/api.ts';

import type { UserDTO } from '@/features/users/types';

enum ContentState {
  LOADING = 'loading',
  EMPTY = 'empty',
  SUCCESS = 'success',
}

type ContentStatus = {
  isLoading: boolean;
  isEmpty: boolean;
};

type UserContent = {
  status: ContentStatus;
  content: {
    [ContentState.LOADING]: React.ReactElement;
    [ContentState.EMPTY]: React.ReactElement;
    [ContentState.SUCCESS]: React.ReactElement;
  };
};

const getContentState = ({ isLoading, isEmpty }: ContentStatus): ContentState => {
  if (isLoading) return ContentState.LOADING;
  if (isEmpty) return ContentState.EMPTY;
  return ContentState.SUCCESS;
};

const getUserContent = ({ status: contentStatus, content }: UserContent) => content[getContentState(contentStatus)];

type IProps = {
  userId: number;
  open: boolean;
  handleClose: (success: boolean) => void;
};

const ViewUserModal = ({ userId, open, handleClose }: IProps) => {
  const { data, isPending } = useQuery<UserDTO>({
    queryKey: ['users', userId],
    queryFn: async () => await getUser(userId),
    enabled: open,
  });

  return (
    <Modal
      centered
      open={open}
      footer={null}
      destroyOnHidden
      loading={isPending}
      onCancel={() => handleClose(false)}
      title="Інформація про користувача"
    >
      {getUserContent({
        status: {
          isLoading: isPending,
          isEmpty: !data,
        },
        content: {
          [ContentState.LOADING]: <Typography.Text>Завантаження...</Typography.Text>,
          [ContentState.EMPTY]: (
            <Typography.Text type="secondary">
              Користувач не знайдений. Можливо, він ще не прийняв запрошення
            </Typography.Text>
          ),
          [ContentState.SUCCESS]: (
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
          ),
        },
      })}
    </Modal>
  );
};

export default ViewUserModal;
