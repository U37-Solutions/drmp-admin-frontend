import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Spin } from 'antd';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { CompanyDTO } from '@features/company/types.ts';
import { type CompanyContactSchema, companyContactSchema } from '@features/company/validation.ts';

import ContactInfoFormContent from './ContactInfoFormContent';

interface Props {
  company?: CompanyDTO;
  onSubmit?: (data: CompanyContactSchema) => void;
  isPending?: boolean;
}

const ContactInfoForm = ({ company, onSubmit, isPending }: Props) => {
  const form = useForm<CompanyContactSchema>({
    resolver: zodResolver(companyContactSchema),
    defaultValues: company
      ? {
          email: company.email,
          contactName: company.contactName,
          phone: company.phone,
          socials: company.socials,
        }
      : {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  const submitHandler = useCallback(
    (data: CompanyContactSchema) => {
      if (!onSubmit) return;

      onSubmit(data);
      reset(data);
    },
    [onSubmit, reset],
  );

  return (
    <FormProvider {...form}>
      <Form layout="vertical" onFinish={handleSubmit(submitHandler)}>
        <Spin spinning={isPending} fullscreen />

        <ContactInfoFormContent />

        <Flex gap={8}>
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

export default ContactInfoForm;
