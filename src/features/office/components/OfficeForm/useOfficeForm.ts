import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { getCustomFields } from '@features/formEdit/api.ts';
import type { CustomFieldDTO } from '@features/formEdit/types.ts';

import type { OfficeDTO } from '../../types';
import { type OfficeSchema, customFieldsFormSchema, officeSchema } from '../../validation';

type UseOfficeFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeSchema) => void;
};

export const useOfficeForm = ({ office, onSubmit }: UseOfficeFormProps) => {
  const { data } = useQuery<Array<CustomFieldDTO>>({
    queryKey: ['customFields'],
    queryFn: async () => await getCustomFields(),
  });

  const validationSchema = useMemo(
    () => (data ? officeSchema.merge(customFieldsFormSchema(data)) : officeSchema),
    [data],
  );

  const formatCustomFieldsInitialValues = (customFields: Array<CustomFieldDTO>, office?: OfficeDTO) => {
    if (!office) {
      return customFields.map((field) => ({
        structureId: field.id,
      }));
    }

    return customFields.map((field) => ({
      structureId: field.id,
      value: office.customFields?.find((customField) => customField.structureId === field.id)?.value || '',
    }));
  };

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<OfficeSchema>({
    resolver: zodResolver(validationSchema),
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

  useEffect(() => {
    if (data) {
      setValue('customFields', formatCustomFieldsInitialValues(data, office));
    }
  }, [data, office, setValue]);

  const submitHandler = useCallback(
    (data: OfficeSchema) => {
      const newValues: OfficeSchema = { ...data, customFields: data.customFields?.filter((field) => !!field.value) };

      if (onSubmit) {
        onSubmit(newValues);
      }

      reset(newValues);
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
