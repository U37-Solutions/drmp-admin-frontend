import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Spin } from 'antd';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import SocialMediaField from '@features/company/components/ContactInfoForm/SocialMediaField.tsx';
import type { CompanyDTO } from '@features/company/types.ts';
import { type CompanyContactSchema, companyContactSchema } from '@features/company/validation.ts';
import { Permission } from '@features/session/types.ts';

import { currentUserHasPermissions } from '@services/has-permissions.ts';

interface Props {
  company?: CompanyDTO;
  onSubmit?: (data: CompanyContactSchema) => void;
  isPending?: boolean;
}

const ContactInfoForm = ({ company, onSubmit, isPending }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CompanyContactSchema>({
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

  const submitHandler = useCallback(
    (data: CompanyContactSchema) => {
      if (!onSubmit) return;

      onSubmit(data);
      reset(data);
    },
    [onSubmit, reset],
  );

  return (
    <Form
      disabled={!currentUserHasPermissions(Permission.COMPANY_UPDATE)}
      layout="vertical"
      onFinish={handleSubmit(submitHandler)}
    >
      <Spin spinning={isPending} fullscreen />
      <Form.Item
        label="Електронна адреса"
        extra={errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder="example@domain.com" status={errors.email ? 'error' : ''} {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Контактна особа"
        extra={errors.contactName ? <span className={styles.error}>{errors.contactName.message}</span> : null}
      >
        <Controller
          name="contactName"
          control={control}
          render={({ field }) => (
            <Input placeholder="Імʼя Прізвище" status={errors.contactName ? 'error' : ''} {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Номер телефону"
        extra={errors.phone ? <span className={styles.error}>{errors.phone.message}</span> : null}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <Input placeholder="+380XXXXXXXXX" status={errors.phone ? 'error' : ''} {...field} />}
        />
      </Form.Item>

      <Form.Item label="Соціальні мережі">
        <SocialMediaField control={control} errors={errors} />
      </Form.Item>

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
  );
};

export default ContactInfoForm;
