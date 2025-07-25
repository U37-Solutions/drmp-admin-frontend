import { Flex, Form, Input, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import { type CompanyInfoSchema } from '@features/company/validation.ts';

import CompanyTypeField from './CompanyTypeField';

import { OWNERSHIP_TYPES } from '../../constants';

const MainInfoFormContent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyInfoSchema>();

  return (
    <Flex style={{ flexDirection: 'column' }}>
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
          render={({ field }) => (
            <CompanyTypeField placeholder="Тип організації" error={errors.companyTypeId} field={field} />
          )}
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
    </Flex>
  );
};

export default MainInfoFormContent;
