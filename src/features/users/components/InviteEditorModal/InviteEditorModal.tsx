import { useMutation } from '@tanstack/react-query';
import { Flex, Modal, Typography } from 'antd';

import { inviteUser } from '@features/users/api.ts';
import InviteUserForm from '@features/users/components/InviteUserForm/InviteUserForm.tsx';
import { type TInviteUserForm, inviteUserSchema } from '@features/users/validation.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

type IProps = {
  open: boolean;
  handleClose: (success: boolean) => void;
};

const InviteEditorModal = ({ open, handleClose }: IProps) => {
  const alertContext = useAlertContext();
  const { mutate, isPending } = useMutation({
    mutationKey: ['invite-user'],
    mutationFn: async (data: TInviteUserForm) => await inviteUser(data),
    onError: (error) => {
      if (alertContext) {
        alertContext.openNotification(error.message, 'error');
      }
    },
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
      title="Запросити нового редактора"
    >
      <Flex vertical gap={24}>
        <Typography.Text type="secondary">
          Введіть електронну адресу, та, за бажанням, імʼя та прізвище нового користувача. Лист із запрошенням та
          подальшими інструкціями прийде на введену Вами електронну пошту.
        </Typography.Text>
        <InviteUserForm onSubmit={mutate} onCancel={() => handleClose(false)} schema={inviteUserSchema} />
      </Flex>
    </Modal>
  );
};

export default InviteEditorModal;
