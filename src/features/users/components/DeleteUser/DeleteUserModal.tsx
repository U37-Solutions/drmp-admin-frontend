import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Modal, Typography } from 'antd';

import { deleteUser } from '@features/users/api.ts';

import type { UserDTO } from '../../types';

type IProps = {
  user: UserDTO;
  open: boolean;
  handleClose: (success: boolean) => void;
};

const DeleteUserModal = ({ user, open, handleClose }: IProps) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (userId: number) => await deleteUser(userId),
    onError: (error) => error,
    onSuccess: () => handleClose(true),
  });

  return (
    <Modal
      centered
      open={open}
      footer={null}
      destroyOnHidden
      loading={isPending}
      onCancel={() => handleClose(false)}
      title="Видалити користувача"
    >
      <Flex vertical gap={24}>
        <Typography.Text type="secondary">
          Ви дійсно хочете видалити{' '}
          <Typography.Text strong>{`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()}</Typography.Text>?
        </Typography.Text>
        <Flex justify="flex-end" gap={12}>
          <Button onClick={() => handleClose(false)}>Скасувати</Button>
          <Button type="primary" variant="solid" color="danger" onClick={() => mutate(user.id)}>
            Видалити
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteUserModal;
