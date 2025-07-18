import { Select } from 'antd';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import type { CompanyInfoSchema } from '@features/company/validation.ts';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

const CompanyTypeField = ({
  error,
  field,
}: {
  error?: FieldError;
  field: ControllerRenderProps<CompanyInfoSchema, 'companyTypeId'>;
}) => {
  const options = useDictionaryService(DICTIONARY_KEYS.companyTypes, true);

  return <Select status={error ? 'error' : ''} options={options} {...field}></Select>;
};

export default CompanyTypeField;
