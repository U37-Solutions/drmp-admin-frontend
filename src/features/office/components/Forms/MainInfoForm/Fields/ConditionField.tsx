import { Select } from 'antd';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

import type { OfficeMainInfoSchema } from '@/features/office/validation';

const ConditionField = ({
  error,
  field,
}: {
  error?: FieldError[];
  field: ControllerRenderProps<OfficeMainInfoSchema, 'conditionIds'>;
}) => {
  const options = useDictionaryService(DICTIONARY_KEYS.conditions, true);

  return <Select status={error ? 'error' : ''} options={options} mode="multiple" {...field}></Select>;
};

export default ConditionField;
