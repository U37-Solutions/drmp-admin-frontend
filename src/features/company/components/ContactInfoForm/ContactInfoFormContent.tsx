import { Flex, Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '@features/auth/components/LoginForm/LoginForm.module.scss';
import SocialMediaField from '@features/company/components/ContactInfoForm/SocialMediaField.tsx';
import { type CompanyContactSchema } from '@features/company/validation.ts';

import { FIELDS_LENGTH } from '../../constants';

const ContactInfoFormContent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyContactSchema>();

  return (
    <Flex style={{ flexDirection: 'column' }}>
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
            <Input
              placeholder="Імʼя Прізвище"
              status={errors.contactName ? 'error' : ''}
              maxLength={FIELDS_LENGTH.contactName}
              {...field}
            />
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
    </Flex>
  );
};

export default ContactInfoFormContent;
