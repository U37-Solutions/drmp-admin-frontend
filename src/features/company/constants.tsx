import { FacebookOutlined, GlobalOutlined, InstagramOutlined } from '@ant-design/icons';
import React from 'react';

import type { CompanySocial, CompanyStatus } from '@features/company/types.ts';

export const SOC_MEDIA_ICON_MAP: Record<CompanySocial['type'], React.ReactNode> = {
  facebook: <FacebookOutlined />,
  instagram: <InstagramOutlined />,
  website: <GlobalOutlined />,
};

export const OWNERSHIP_TYPES = [
  { label: 'Державна установа', value: 'public' },
  { label: 'Приватна організація', value: 'private' },
  { label: 'Комунальне підприємство', value: 'municipal' },
  { label: 'Інше', value: 'other' },
];

export type CompanyStatusFilter = CompanyStatus | 'ALL';
export const COMPANY_STATUS_FILTER_OPTIONS: Array<{ label: string; value: CompanyStatusFilter }> = [
  { label: 'Всі', value: 'ALL' },
  { label: 'Верифікуються', value: 'REVIEW' },
  { label: 'Активні', value: 'ACTIVE' },
  { label: 'Відхилені', value: 'REJECTED' },
];

export const FIELDS_LENGTH = {
  name: 100,
  donorSupport: 255,
  contactName: 100,
};
