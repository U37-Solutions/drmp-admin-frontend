import { EyeOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';

import ViewUserModal from './ViewUserModal';

type IProps = {
  userId: number;
};

const ViewUserAction = ({ userId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Tooltip title="Переглянути користувача">
        <Button color="primary" icon={<EyeOutlined />} onClick={() => setIsModalOpen(true)} />
      </Tooltip>
      <ViewUserModal userId={userId} open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ViewUserAction;
