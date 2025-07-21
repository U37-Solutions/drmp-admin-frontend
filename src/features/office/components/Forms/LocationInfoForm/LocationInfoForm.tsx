import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Spin } from 'antd';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './LocationInfoForm.module.scss';

import type { OfficeDTO } from '@/features/office/types';
import { type OfficeLocationInfoSchema, officeLocationInfoSchema } from '@/features/office/validation';

type LocationInfoFormProps = {
  office: OfficeDTO;
  onSubmit?: (data: OfficeLocationInfoSchema) => void;
  isPending?: boolean;
};

const LocationInfoForm: React.FC<LocationInfoFormProps> = ({ office, onSubmit, isPending }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<OfficeLocationInfoSchema>({
    resolver: zodResolver(officeLocationInfoSchema),
    defaultValues: office
      ? {
          regionId: office.regionId,
          latitude: office.latitude,
          longitude: office.longitude,
          locationName: office.locationName,
        }
      : {},
  });

  const submitHandler = useCallback(
    (data: OfficeLocationInfoSchema) => {
      if (onSubmit) {
        onSubmit(data);
      }

      reset(data);
    },
    [onSubmit, reset],
  );

  return (
    <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
      <Spin spinning={isPending} fullscreen />
      <Form.Item
        label="Адреса"
        extra={errors.locationName ? <span className={styles.error}>{errors.locationName.message}</span> : null}
      >
        <Controller
          name="locationName"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Приклад: Чернівці, вул. Головна 123"
              status={errors.locationName ? 'error' : ''}
              {...field}
            />
          )}
        />
      </Form.Item>

      <Flex gap={8} className={styles.actionBtnWrapper}>
        <Button
          block
          type="default"
          variant="outlined"
          htmlType="button"
          onClick={() => reset()}
          disabled={isSubmitting || !isDirty}
        >
          Скасувати
        </Button>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting || !isDirty}>
          Зберегти
        </Button>
      </Flex>
    </Form>
  );
};

export default LocationInfoForm;
