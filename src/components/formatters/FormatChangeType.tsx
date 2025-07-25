import { Tag } from 'antd';

import { ChangelogAction } from '@features/changelog/types.ts';

const TAG_TYPES: Record<ChangelogAction, { color: string; title: string }> = {
  [ChangelogAction.CREATE]: { color: 'green', title: 'Створення' },
  [ChangelogAction.UPDATE]: { color: 'blue', title: 'Оновлення' },
  [ChangelogAction.DELETE]: { color: 'red', title: 'Видалення' },
};

const FormatChangeType = ({ type }: { type: ChangelogAction }) => {
  const { title, color } = TAG_TYPES[type];
  return <Tag color={color}>{title}</Tag>;
};

export default FormatChangeType;
