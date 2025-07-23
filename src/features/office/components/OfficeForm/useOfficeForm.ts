import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import type { OfficeDTO } from '../../types';
import { type OfficeSchema, officeSchema } from '../../validation';

type UseOfficeFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeSchema) => void;
};

export const useOfficeForm = ({ office, onSubmit }: UseOfficeFormProps) => {
  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<OfficeSchema>({
    resolver: zodResolver(officeSchema),
    defaultValues: office
      ? {
          additionalDescription: office.additionalDescription,
          workSchedule: office.workSchedule,
          serviceIds: office.serviceIds,
          categoryIds: office.categoryIds,
          conditionIds: office.conditionIds,
          customFields: office.customFields,
          regionId: office.regionId,
          latitude: office.latitude,
          longitude: office.longitude,
          locationName: office.locationName,
        }
      : {},
  });

  const submitHandler = useCallback(
    (data: OfficeSchema) => {
      if (onSubmit) {
        onSubmit(data);
      }

      reset(data);
    },
    [onSubmit, reset],
  );

  return {
    control,
    errors,
    isSubmitting,
    isDirty,
    getValues,
    setValue,
    reset,
    handleSubmit: handleSubmit(submitHandler),
  };
};

export type OfficeFormState = ReturnType<typeof useOfficeForm>;
