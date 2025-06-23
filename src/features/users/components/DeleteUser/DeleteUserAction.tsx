import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';

import DeleteUserModal from './DeleteUserModal';

import type { UserDTO } from '../../types';

type IProps = {
  user: UserDTO;
  onSuccess?: () => void;
};

const DeleteUserAction = ({ user, onSuccess }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Tooltip title="Видалити користувача">
        <Button variant="outlined" color="danger" icon={<DeleteOutlined />} onClick={() => setIsModalOpen(true)} />
      </Tooltip>
      <DeleteUserModal
        user={user}
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
