import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Select, Spin } from 'antd';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CompanyTypeField from '@features/company/components/MainInfoForm/CompanyTypeField.tsx';
import { OWNERSHIP_TYPES } from '@features/company/constants.tsx';
import type { CompanyDTO } from '@features/company/types.ts';
import { type CompanyInfoSchema, companyInfoSchema } from '@features/company/validation.ts';
import { Permission } from '@features/session/types.ts';

import { currentUserHasPermissions } from '@services/has-permissions.ts';

import styles from '../styles.module.scss';

interface Props {
  company?: CompanyDTO;
  onSubmit?: (data: CompanyInfoSchema) => void;
  isPending?: boolean;
}

const MainInfoForm = ({ company, onSubmit, isPending }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CompanyInfoSchema>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: company
      ? {
          name: company.name,
          code: company.code,
          companyTypeId: company.companyTypeId,
          ownershipType: company.ownershipType,
          donorSupport: company.donorSupport,
        }
      : {},
  });

  const submitHandler = useCallback(
    (data: CompanyInfoSchema) => {
      if (onSubmit) {
        onSubmit(data);
      }

      reset(data);
    },
    [onSubmit, reset],
  );

  return (
    <Form
      disabled={!currentUserHasPermissions(Permission.COMPANY_UPDATE)}
      layout="vertical"
      className={styles.form}
      onFinish={handleSubmit(submitHandler)}
    >
      <Spin spinning={isPending} fullscreen />
      <Form.Item
        label="Назва організації"
        extra={errors.name ? <span className={styles.error}>{errors.name.message}</span> : null}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Назва організації" status={errors.name ? 'error' : ''} {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Код ЄДРПОУ / ІПН"
        extra={errors.code ? <span className={styles.error}>{errors.code.message}</span> : null}
      >
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input placeholder="Код ЄДРПОУ / ІПН" status={errors.code ? 'error' : ''} {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Тип організації"
        extra={errors.companyTypeId ? <span className={styles.error}>{errors.companyTypeId.message}</span> : null}
      >
        <Controller
          name="companyTypeId"
          control={control}
          render={({ field }) => <CompanyTypeField error={errors.companyTypeId} field={field} />}
        />
      </Form.Item>
      <Form.Item
        label="Форма власності"
        extra={errors.ownershipType ? <span className={styles.error}>{errors.ownershipType.message}</span> : null}
      >
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <Select
              options={OWNERSHIP_TYPES}
              placeholder="Форма власності"
              status={errors.ownershipType ? 'error' : ''}
              {...field}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Донорська підтримка">
        <Controller
          name="donorSupport"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              rows={4}
              placeholder="Приклад: Організація отримує державне фінансування та підтримку від міжнародних донорів"
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

export default MainInfoForm;
