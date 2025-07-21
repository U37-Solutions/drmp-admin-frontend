import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Spin } from 'antd';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CategoryField from './Fields/CategoryField';
import ConditionField from './Fields/ConditionField';
import ServiceField from './Fields/ServiceField';
import styles from './MainInfoForm.module.scss';

import type { OfficeDTO } from '@/features/office/types';
import { type OfficeMainInfoSchema, officeMainInfoSchema } from '@/features/office/validation';

type MainInfoFormProps = {
  office: OfficeDTO;
  onSubmit?: (data: OfficeMainInfoSchema) => void;
  isPending?: boolean;
};

const MainInfoForm: React.FC<MainInfoFormProps> = ({ office, onSubmit, isPending }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<OfficeMainInfoSchema>({
    resolver: zodResolver(officeMainInfoSchema),
    defaultValues: office
      ? {
          additionalDescription: office.additionalDescription,
          workSchedule: office.workSchedule,
          serviceIds: office.serviceIds,
          categoryIds: office.categoryIds,
          conditionIds: office.conditionIds,
          customFields: office.customFields,
        }
      : {},
  });

  const submitHandler = useCallback(
    (data: OfficeMainInfoSchema) => {
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
        label="Опис"
        extra={
          errors.additionalDescription ? (
            <span className={styles.error}>{errors.additionalDescription.message}</span>
          ) : null
        }
      >
        <Controller
          name="additionalDescription"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 12 }}
              placeholder="Приклад: Офіс розташований у центрі міста, має сучасний дизайн та обладнання"
              status={errors.additionalDescription ? 'error' : ''}
              {...field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Робочий графік"
        extra={errors.workSchedule ? <span className={styles.error}>{errors.workSchedule.message}</span> : null}
      >
        <Controller
          name="workSchedule"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 7 }}
              placeholder="Приклад: Пн-Пт 9:00-18:00, Сб 10:00-16:00"
              status={errors.workSchedule ? 'error' : ''}
              {...field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Категорії"
        extra={errors.categoryIds ? <span className={styles.error}>{errors.categoryIds.message}</span> : null}
      >
        <Controller
          name="categoryIds"
          control={control}
          render={({ field }) => (
            <CategoryField error={Array.isArray(errors.categoryIds) ? errors.categoryIds : undefined} field={field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Форми власності"
        extra={errors.conditionIds ? <span className={styles.error}>{errors.conditionIds.message}</span> : null}
      >
        <Controller
          name="conditionIds"
          control={control}
          render={({ field }) => (
            <ConditionField
              error={Array.isArray(errors.conditionIds) ? errors.conditionIds : undefined}
              field={field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Типи організації"
        extra={errors.serviceIds ? <span className={styles.error}>{errors.serviceIds.message}</span> : null}
      >
        <Controller
          name="serviceIds"
          control={control}
          render={({ field }) => (
            <ServiceField error={Array.isArray(errors.serviceIds) ? errors.serviceIds : undefined} field={field} />
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

export default MainInfoForm;
