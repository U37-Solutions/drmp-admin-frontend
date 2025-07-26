import { Select } from 'antd';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

import type { OfficeSchema } from '@/features/office/validation';

const ServiceField = ({
  placeholder,
  error,
  field,
}: {
  placeholder?: string;
  error?: FieldError[];
  field: ControllerRenderProps<OfficeSchema, 'serviceIds'>;
}) => {
  const options = useDictionaryService(DICTIONARY_KEYS.services, true);

  return (
    <Select
      placeholder={placeholder}
      status={error ? 'error' : ''}
      options={options}
      mode="multiple"
      {...field}
    ></Select>
  );
};

export default ServiceField;
