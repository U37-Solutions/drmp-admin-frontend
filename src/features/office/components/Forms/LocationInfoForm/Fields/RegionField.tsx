import { Select } from 'antd';
import { useMemo } from 'react';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

import type { OfficeLocationInfoSchema } from '@features/office/validation';

import { REGION_TITLE } from '@components/map/constants';

const RegionField = ({
  error,
  field,
}: {
  error?: FieldError;
  field: ControllerRenderProps<OfficeLocationInfoSchema, 'regionId'>;
}) => {
  const options = useMemo(
    () =>
      Object.entries(REGION_TITLE).map(([key, value]) => ({
        label: value,
        value: Number(key),
      })),
    [],
  );

  return <Select status={error ? 'error' : ''} options={options} {...field}></Select>;
};

export default RegionField;
