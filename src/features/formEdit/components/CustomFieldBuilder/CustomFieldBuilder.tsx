import { Input, Select } from 'antd';
import type { ControllerRenderProps } from 'react-hook-form';

import { type CustomFieldDTO, CustomFieldType } from '@features/formEdit/types.ts';
import type { OfficeSchema } from '@features/office/validation.ts';

import InputNumber from '@/components/fields/InputNumber';

type Props = {
  fieldConfig: CustomFieldDTO;
  field: ControllerRenderProps<OfficeSchema, `customFields.${number}.value`>;
  error?: string;
};

const fieldComponents = {
  [CustomFieldType.SELECT]: Select,
  [CustomFieldType.TEXT]: Input,
  [CustomFieldType.TEXTAREA]: Input.TextArea,
  [CustomFieldType.NUMBER]: InputNumber,
};

const getFieldComponent = (fieldType: CustomFieldType) => fieldComponents[fieldType];

const CustomFieldBuilder = ({ fieldConfig, field, error }: Props) => {
  const Component = getFieldComponent(fieldConfig.type);

  return (
    <Component
      {...field}
      placeholder={fieldConfig.placeholder ? fieldConfig.placeholder : ''}
      status={error ? 'error' : ''}
      {...(fieldConfig.type === CustomFieldType.SELECT
        ? {
            options: fieldConfig.options.map((value) => ({ label: value, value })),
          }
        : {})}
    />
  );
};

export default CustomFieldBuilder;
