import { Select } from 'antd';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

import type { OfficeSchema } from '@/features/office/validation';

const CategoryField = ({
  error,
  field,
}: {
  error?: FieldError[];
  field: ControllerRenderProps<OfficeSchema, 'categoryIds'>;
}) => {
  const options = useDictionaryService(DICTIONARY_KEYS.categories, true);

  return <Select status={error ? 'error' : ''} options={options} mode="multiple" {...field}></Select>;
};

export default CategoryField;
