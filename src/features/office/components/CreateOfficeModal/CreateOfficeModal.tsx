import { useMutation } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import { useAlertContext } from '@shared/providers/AlertProvider';

import OfficeForm from '../OfficeForm/OfficeForm';

import { createOffice } from '../../api';
import type { OfficeSubmittedFormData } from '../../types';

type CreateOfficeModalProps = {
  companyId: number;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CreateOfficeModal = ({ companyId, open, onClose, onSuccess }: CreateOfficeModalProps) => {
  const alertContext = useAlertContext();
  const [office, setOffice] = useState<OfficeSubmittedFormData>({});

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-office'],
    mutationFn: async (body: OfficeSubmittedFormData) =>
      body.mainInfo && body.locationInfo && (await createOffice(companyId, { ...body.mainInfo, ...body.locationInfo })),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Офіс створено успішно', 'success');
      }
      onSuccess();
    },
  });

  const handleClose = () => {
    setOffice({});
    onClose();
  };

  const handleSubmit = () => {
    if (!office.mainInfo || !office.locationInfo) {
      alertContext?.openNotification('Будь ласка, заповніть всі поля', 'error');
      return;
    }
    mutate(office);
    handleClose();
  };

  const onSaveForm = (data: OfficeSubmittedFormData) => {
    setOffice((prev) => ({ ...prev, ...data }));
  };

  return (
    <Modal
      open={open}
      title="Створити офіс"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Закрити
        </Button>,
        <Button key="submit" type="primary" loading={isPending} onClick={handleSubmit}>
          Створити
        </Button>,
      ]}
      width={{
        xs: '90%',
        sm: '80%',
        md: '70%',
        lg: '70%',
        xl: '70%',
        xxl: '70%',
      }}
      destroyOnHidden
    >
      <OfficeForm onSubmit={onSaveForm} isPending={isPending} />
    </Modal>
  );
};

export default CreateOfficeModal;
