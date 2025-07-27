import { Button, Flex, Form } from 'antd';
import clsx from 'clsx';
import { FormProvider } from 'react-hook-form';

import styles from './OfficeForm.module.scss';
import OfficeFormContent from './OfficeFormContent';
import { useOfficeForm } from './useOfficeForm';

import type { OfficeDTO } from '../../types';
import { type OfficeSchema } from '../../validation';

type OfficeFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeSchema) => void;
  scroll?: boolean;
};

const OfficeForm = ({ office, onSubmit, scroll }: OfficeFormProps) => {
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
        <div
          className={clsx(styles.formWrapper, {
            [styles.formWrapper_scroll]: scroll,
          })}
        >
          <OfficeFormContent />
        </div>
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
