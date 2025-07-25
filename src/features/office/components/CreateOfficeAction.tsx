import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';

import CreateOfficeModal from '@features/office/components/CreateOfficeModal/CreateOfficeModal.tsx';

type Props = {
  companyId: number;
  refreshData: () => Promise<void>;
  showBtnText?: boolean;
};

const CreateOfficeAction = ({ companyId, refreshData, showBtnText = false }: Props) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <Tooltip title="Створити офіс">
        <Button onClick={() => setCreateModalOpen(true)} icon={<PlusOutlined />}>
          {showBtnText && 'Створити офіс'}
        </Button>
      </Tooltip>

      <CreateOfficeModal
        companyId={companyId}
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={refreshData}
      />
    </>
  );
};

export default CreateOfficeAction;
