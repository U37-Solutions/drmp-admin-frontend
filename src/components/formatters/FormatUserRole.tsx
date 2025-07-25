import { Tag } from 'antd';

import { Role } from '@features/session/types.ts';

const ROLE_LABELS: Record<Role, { color: string; title: string }> = {
  [Role.ADMIN]: { color: 'orange', title: 'Адміністратор' },
  [Role.EDITOR]: { color: 'purple', title: 'Редактор' },
  [Role.COMPANY_ADMIN]: { color: 'pink', title: 'Адміністратор організації' },
  [Role.COMPANY_USER]: { color: 'green', title: 'Користувач організації' },
};

const FormatUserRole = ({ role }: { role: Role }) => {
  const { title, color } = ROLE_LABELS[role];
  return <Tag color={color}>{title}</Tag>;
};

export default FormatUserRole;
