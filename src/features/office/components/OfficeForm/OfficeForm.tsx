import { Button, Flex, Form, Typography } from 'antd';

import LocationInfoForm from '../OfficeForm/LocationInfoForm/LocationInfoForm';
import MainInfoForm from '../OfficeForm/MainInfoForm/MainInfoForm';

import styles from './OfficeForm.module.scss';
import type { OfficeFormState } from './useOfficeForm';

type OfficeFormProps = {
  form: OfficeFormState;
  onCancel?: () => void;
};

const OfficeForm = ({ form, onCancel }: OfficeFormProps) => {
  const { handleSubmit, isSubmitting, isDirty, reset } = form;

  return (
    <Form layout="vertical" className={styles.form} onFinish={handleSubmit}>
      <Flex className={styles.formContent}>
        <Flex className={styles.formContent__part}>
          <Typography.Title level={4}>Основна інформація</Typography.Title>
          <MainInfoForm form={form} />
        </Flex>
        <Flex className={styles.formContent__part}>
          <Typography.Title level={4}>Локація</Typography.Title>
          <LocationInfoForm form={form} />
        </Flex>
      </Flex>
      <Flex className={styles.actionBtnWrapper}>
        <Button
          type="default"
          variant="outlined"
          htmlType="button"
          onClick={() => {
            reset();
            onCancel?.();
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
  );
};

export default OfficeForm;
