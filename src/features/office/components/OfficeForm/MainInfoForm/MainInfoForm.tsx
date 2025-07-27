import { Flex, Form, Input } from 'antd';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { FIELDS_LENGTH } from '@features/office/constants';
import type { OfficeSchema } from '@features/office/validation';

import CategoryField from './Fields/CategoryField';
import ConditionField from './Fields/ConditionField';
import ServiceField from './Fields/ServiceField';
import styles from './MainInfoForm.module.scss';

type MainInfoFormProps = {
  form: UseFormReturn<OfficeSchema>;
};

const MainInfoForm: React.FC<MainInfoFormProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Flex style={{ flexDirection: 'column' }}>
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
              maxLength={FIELDS_LENGTH.additionalDescription}
              {...field}
              value={field.value ?? ''}
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
              maxLength={FIELDS_LENGTH.workSchedule}
              {...field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Категорії бенефіціарів"
        extra={errors.categoryIds ? <span className={styles.error}>{errors.categoryIds.message}</span> : null}
      >
        <Controller
          name="categoryIds"
          control={control}
          render={({ field }) => (
            <CategoryField
              placeholder="Виберіть категорії бенефіціарів"
              error={Array.isArray(errors.categoryIds) ? errors.categoryIds : undefined}
              field={field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Умови надання допомоги"
        extra={errors.conditionIds ? <span className={styles.error}>{errors.conditionIds.message}</span> : null}
      >
        <Controller
          name="conditionIds"
          control={control}
          render={({ field }) => (
            <ConditionField
              placeholder="Виберіть умови надання допомоги"
              error={Array.isArray(errors.conditionIds) ? errors.conditionIds : undefined}
              field={field}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Види послуг"
        extra={errors.serviceIds ? <span className={styles.error}>{errors.serviceIds.message}</span> : null}
      >
        <Controller
          name="serviceIds"
          control={control}
          render={({ field }) => (
            <ServiceField
              placeholder="Виберіть види послуг"
              error={Array.isArray(errors.serviceIds) ? errors.serviceIds : undefined}
              field={field}
            />
          )}
        />
      </Form.Item>
    </Flex>
  );
};

export default MainInfoForm;
