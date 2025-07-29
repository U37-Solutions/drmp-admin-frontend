import { UserAddOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Modal, Typography } from 'antd';
import React from 'react';

import { inviteCompanyUser } from '@features/users/api.ts';
import InviteUserForm from '@features/users/components/InviteUserForm/InviteUserForm.tsx';
import { type TInviteUserForm, inviteCompanyUserSchema } from '@features/users/validation.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

const InviteCompanyUserAction = () => {
  const alertContext = useAlertContext();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ['invite-company-user'],
    mutationFn: async (data: TInviteUserForm) => await inviteCompanyUser(data),
    onError: (error) => {
      if (alertContext) {
        alertContext.openNotification(error.message, 'error');
      }
    },
    onSuccess: async () => {
      setIsModalOpen(false);
      if (alertContext) {
        alertContext.openNotification('Запрошення надіслано', 'success');
      }
      await queryClient.refetchQueries({ queryKey: ['users'], type: 'all' });
    },
  });

  return (
    <>
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        destroyOnHidden
        loading={isPending}
        onCancel={() => setIsModalOpen(false)}
        title="Запросити нового користувача"
      >
        <Flex vertical gap={16}>
          <Typography.Text type="secondary">
            Введіть електронну адресу, імʼя та прізвище нового користувача. Лист із даними для входу прийде на введену
            Вами електронну пошту.
          </Typography.Text>
          <InviteUserForm onSubmit={mutate} onCancel={() => setIsModalOpen(false)} schema={inviteCompanyUserSchema} />
        </Flex>
      </Modal>
      <Button icon={<UserAddOutlined />} onClick={() => setIsModalOpen(true)}>
        Запросити користувача
      </Button>
    </>
  );
};

export default InviteCompanyUserAction;
