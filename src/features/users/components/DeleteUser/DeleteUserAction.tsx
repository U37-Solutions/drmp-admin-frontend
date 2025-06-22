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
      <a onClick={() => setIsModalOpen(true)}>Видалити користувача</a>
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
