import { Tag, Tooltip } from 'antd';
import type { PresetColorKey } from 'antd/es/theme/interface';

import { CustomFieldType, CustomFieldTypeTitle } from '@features/formEdit/types.ts';

const FIELD_TYPE_CONFIG: Record<CustomFieldType, { color: PresetColorKey; title: string }> = {
  [CustomFieldType.SELECT]: {
    color: 'gold',
    title: CustomFieldType.SELECT,
  },
  [CustomFieldType.TEXT]: {
    color: 'cyan',
    title: CustomFieldType.TEXT,
  },
  [CustomFieldType.NUMBER]: {
    color: 'volcano',
    title: CustomFieldType.NUMBER,
  },
  [CustomFieldType.TEXTAREA]: {
    color: 'blue',
    title: CustomFieldType.TEXTAREA,
  },
};

const FormatCustomFieldType = ({ type }: { type: CustomFieldType }) => {
  const { color, title } = FIELD_TYPE_CONFIG[type];
  const tooltip = CustomFieldTypeTitle[type];

  return (
    <Tooltip title={tooltip}>
      <Tag color={color}>{title}</Tag>
    </Tooltip>
  );
};

export default FormatCustomFieldType;
