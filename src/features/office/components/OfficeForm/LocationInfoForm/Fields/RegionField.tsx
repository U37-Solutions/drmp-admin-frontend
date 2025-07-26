import { Select } from 'antd';
import { useMemo } from 'react';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import type { OfficeSchema } from '@features/office/validation';

import { REGION_TITLE } from '@components/map/constants';

const RegionField = ({
  placeholder,
  error,
  field,
}: {
  placeholder?: string;
  error?: FieldError;
  field: ControllerRenderProps<OfficeSchema, 'regionId'>;
}) => {
  const options = useMemo(
    () =>
      Object.entries(REGION_TITLE).map(([key, value]) => ({
        label: value,
        value: Number(key),
      })),
    [],
  );

  return <Select placeholder={placeholder} status={error ? 'error' : ''} options={options} {...field}></Select>;
};

export default RegionField;
