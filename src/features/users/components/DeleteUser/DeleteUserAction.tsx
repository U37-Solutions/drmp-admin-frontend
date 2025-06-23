import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';

import DeleteUserModal from './DeleteUserModal';

type IProps = {
  userId: number;
  onSuccess?: () => void;
};

const DeleteUserAction = ({ userId, onSuccess }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Tooltip title="Видалити користувача">
        <Button color="primary" icon={<DeleteOutlined />} onClick={() => setIsModalOpen(true)} />
      </Tooltip>
      <DeleteUserModal
        userId={userId}
        open={isModalOpen}
        handleClose={(success) => {
          setIsModalOpen(false);
          if (success && onSuccess) {
            onSuccess();
          }
        }}
      />
    </>
  );
};

export default DeleteUserAction;
