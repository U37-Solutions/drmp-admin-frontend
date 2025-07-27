import { useMutation } from '@tanstack/react-query';
import { Modal, Typography } from 'antd';

import { useAlertContext } from '@shared/providers/AlertProvider';

import OfficeForm from '../OfficeForm/OfficeForm';

import { createOffice } from '../../api';
import type { OfficeSchema } from '../../validation';

type CreateOfficeModalProps = {
  companyId: number;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CreateOfficeModal = ({ companyId, open, onClose, onSuccess }: CreateOfficeModalProps) => {
  const alertContext = useAlertContext();

  const { mutate } = useMutation({
    mutationKey: ['create-office'],
    mutationFn: async (body: OfficeSchema) => await createOffice(companyId, body),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Офіс створено успішно', 'success');
      }
      onSuccess();
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (data: OfficeSchema) => {
    mutate(data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      title={<Typography.Title level={3}>Створити офіс</Typography.Title>}
      onCancel={onClose}
      width={{
        xs: '90%',
        sm: '90%',
        md: '90%',
        lg: '80%',
        xl: '80%',
        xxl: '80%',
      }}
      footer={null}
    >
      <OfficeForm onSubmit={handleSubmit} scroll />
    </Modal>
  );
};

export default CreateOfficeModal;
