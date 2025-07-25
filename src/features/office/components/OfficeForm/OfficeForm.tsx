import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form } from 'antd';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './OfficeForm.module.scss';
import OfficeFormContent from './OfficeFormContent';

import type { OfficeDTO } from '../../types';
import { type OfficeSchema, officeSchema } from '../../validation';

type OfficeFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeSchema) => void;
};

const OfficeForm = ({ office, onSubmit }: OfficeFormProps) => {
  const form = useForm<OfficeSchema>({
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

  const {
    formState: { isSubmitting, isDirty },
    handleSubmit,
    reset,
  } = form;

  const submitHandler = useCallback(
    (data: OfficeSchema) => {
      if (onSubmit) {
        onSubmit(data);
      }

      reset(data);
    },
    [onSubmit, reset],
  );

  return (
    <FormProvider {...form}>
      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
        <OfficeFormContent />
        <Flex className={styles.actionBtnWrapper}>
          <Button
            type="default"
            variant="outlined"
            htmlType="button"
            onClick={() => {
              reset();
            }}
            disabled={isSubmitting || !isDirty}
          >
            Скасувати
          </Button>
          <Button type="primary" htmlType="submit" disabled={isSubmitting || !isDirty}>
            Зберегти
          </Button>
        </Flex>
      </Form>
    </FormProvider>
  );
};

export default OfficeForm;
