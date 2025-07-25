import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Spin } from 'antd';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { CompanyDTO } from '@features/company/types.ts';
import { type CompanyInfoSchema, companyInfoSchema } from '@features/company/validation.ts';

import styles from '../styles.module.scss';

import MainInfoFormContent from './MainInfoFormContent';

interface Props {
  company?: CompanyDTO;
  onSubmit?: (data: CompanyInfoSchema) => void;
  isPending?: boolean;
}

const MainInfoForm = ({ company, onSubmit, isPending }: Props) => {
  const form = useForm<CompanyInfoSchema>({
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

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

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
    <FormProvider {...form}>
      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
        <Spin spinning={!!isPending} fullscreen />
        <MainInfoFormContent />

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
    </FormProvider>
  );
};

export default MainInfoForm;
