import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import React from 'react';

import type { CompanyStatus } from '@features/company/types.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const COMPANY_STATUS_CONFIG: Record<CompanyStatus, { color: string; icon: React.ReactNode; title: string }> = {
  REVIEW: { color: 'orange', icon: <ExclamationCircleOutlined />, title: 'Верифікація' },
  ACTIVE: { color: 'green', icon: <CheckCircleOutlined />, title: 'Активна' },
  REJECTED: { color: 'red', icon: <CloseCircleOutlined />, title: 'Відхилена' },
};

const FormatCompanyStatus = ({ status, variant = 'full' }: { status: CompanyStatus; variant: 'full' | 'small' }) => {
  const { icon, color, title } = COMPANY_STATUS_CONFIG[status];

  if (variant === 'small') {
    return (
      <Tooltip title={title}>
        <div style={{ color }}>{icon}</div>
      </Tooltip>
    );
  }

  return (
    <Tag style={{ maxHeight: 22 }} icon={icon} color={color}>
      {title}
    </Tag>
  );
};

export default FormatCompanyStatus;
