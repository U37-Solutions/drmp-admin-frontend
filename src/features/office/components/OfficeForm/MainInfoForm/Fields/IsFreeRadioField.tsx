import { Radio } from 'antd';
import type { ControllerRenderProps } from 'react-hook-form';

import type { OfficeSchema } from '@features/office/validation.ts';

const RADIO_OPTIONS = [
  { label: 'Безкоштовно', value: true },
  { label: 'Платно', value: false },
];

const IsFreeRadioField = ({ field }: { field: ControllerRenderProps<OfficeSchema, 'isFree'> }) => {
  return (
    <Radio.Group {...field}>
      {RADIO_OPTIONS.map((option, idx) => (
        <Radio key={`option-${idx}`} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default IsFreeRadioField;
