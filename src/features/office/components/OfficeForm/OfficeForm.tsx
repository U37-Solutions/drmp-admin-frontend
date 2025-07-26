import { Button, Flex, Form } from 'antd';
import { FormProvider } from 'react-hook-form';

import styles from './OfficeForm.module.scss';
import OfficeFormContent from './OfficeFormContent';
import { useOfficeForm } from './useOfficeForm';

import type { OfficeDTO } from '../../types';
import { type OfficeSchema } from '../../validation';

type OfficeFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeSchema) => void;
};

const OfficeForm = ({ office, onSubmit }: OfficeFormProps) => {
  const form = useOfficeForm({ office, onSubmit });

  const {
    formState: { isSubmitting, isDirty },
    handleSubmit,
    reset,
    submitHandler,
  } = form;

  return (
    <FormProvider {...form}>
      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
        <OfficeFormContent />
        <Flex className={styles.actionBtnWrapper}>
          <Button
            type="default"
            variant="outlined"
            htmlType="button"
            onClick={() => {
              reset();
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
    </FormProvider>
  );
};

export default OfficeForm;
