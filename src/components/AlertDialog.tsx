import { Button, Flex, Modal, Typography } from 'antd';

import type { AlertProps } from '@shared/providers/AlertProvider.tsx';

const AlertDialog = ({ title, message, kind, reject, resolve }: AlertProps) => {
  return (
    <Modal centered open={true} footer={null} destroyOnHidden onCancel={reject} title={title}>
      <Flex vertical gap={24}>
        <Typography.Text type="secondary">{message}</Typography.Text>
        <Flex justify="flex-end" gap={12}>
          <Button onClick={reject}>Скасувати</Button>
          <Button type="primary" variant="solid" color={kind} onClick={resolve}>
            Видалити
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AlertDialog;
