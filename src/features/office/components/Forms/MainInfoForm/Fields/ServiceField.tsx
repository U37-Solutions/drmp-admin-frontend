import { Select } from 'antd';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

import type { OfficeMainInfoSchema } from '@/features/office/validation';

const ServiceField = ({
  error,
  field,
}: {
  error?: FieldError[];
  field: ControllerRenderProps<OfficeMainInfoSchema, 'serviceIds'>;
}) => {
  const options = useDictionaryService(DICTIONARY_KEYS.services, true);

  return <Select status={error ? 'error' : ''} options={options} mode="multiple" {...field}></Select>;
};

export default ServiceField;
