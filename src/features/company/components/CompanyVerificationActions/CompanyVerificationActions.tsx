import { CheckCircleOutlined, CloseCircleOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex } from 'antd';
import { useState } from 'react';

import ApproveCompanyAction from '@features/company/components/CompanyVerificationActions/ApproveCompanyAction.tsx';
import RejectCompanyAction from '@features/company/components/CompanyVerificationActions/RejectCompanyAction.tsx';
import type { CompanyStatus } from '@features/company/types.ts';

const CompanyVerificationActions = ({ status, id }: { status: CompanyStatus; id: number }) => {
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const handleClick = (type: string) => {
    switch (type) {
      case 'approve':
        setApproveDialogOpen(true);
        break;
      case 'reject':
        setRejectDialogOpen(true);
    }
  };

  return (
    <>
      <ApproveCompanyAction companyId={id} open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)} />
      <RejectCompanyAction open={rejectDialogOpen} companyId={id} onClose={() => setRejectDialogOpen(false)} />
      <Dropdown
        menu={{
          items: [
            {
              key: 'approve',
              label: (
                <Flex align="center" gap={6}>
                  <CheckCircleOutlined style={{ color: '#389e0d' }} />
                  <span>Активувати</span>
                </Flex>
              ),
            },
            {
              key: 'reject',
              label: (
                <Flex align="center" gap={6}>
                  <CloseCircleOutlined style={{ color: '#cf1322' }} />
                  <span>Відхилити</span>
                </Flex>
              ),
              disabled: status === 'REJECTED',
            },
          ],
          onClick: ({ key }) => handleClick(key),
        }}
      >
        <Button variant="solid" color="orange">
          Верифікувати
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CompanyVerificationActions;
