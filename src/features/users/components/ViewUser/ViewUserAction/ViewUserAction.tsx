import { useState } from 'react';

import ViewUserModal from '../ViewUserModal/ViewUserModal';

type IProps = {
  userId: number;
};

const ViewUserAction = ({ userId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <a onClick={() => setIsModalOpen(true)}>Переглянути користувача</a>
      <ViewUserModal userId={userId} open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ViewUserAction;
