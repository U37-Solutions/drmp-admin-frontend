import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Flex, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import OptionsBuilderField from '@features/formEdit/components/OptionsBuilderField/OptionsBuilderField.tsx';
import type { CustomFieldDTO } from '@features/formEdit/types.ts';
import { type CustomFieldSchema, customFieldSchema } from '@features/formEdit/validation.ts';

type Props = {
  onClose(): void;
  field: CustomFieldDTO | null;
};

const StaticFieldForm = ({ field, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CustomFieldSchema>({
    resolver: zodResolver(customFieldSchema),
    defaultValues: {
      title: field?.title,
      options: field?.options || [],
    },
  });

  const updateStaticField = (data: CustomFieldSchema) => {
    // FIXME: Implement the logic to update the static field
    // es-lint-disable-next-line no-console
    console.log('Updating static field with data:', data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => updateStaticField(data))}>
      <Alert
        style={{ marginBottom: 12 }}
        showIcon
        type="info"
        message="Це поле є статичним та обовʼязковим для реєстрації. Ви можете змінити лише варіанти відповіді"
      />
      <Form.Item label="Назва поля">
        <Controller control={control} render={({ field }) => <Input {...field} disabled />} name="title" />
      </Form.Item>
      <Form.Item label="Варіанти відповіді">
        <OptionsBuilderField control={control} errors={errors} />
      </Form.Item>
      <Flex justify="flex-end" gap={12}>
        <Button type="default" variant="outlined" htmlType="button" disabled={isSubmitting} onClick={onClose}>
          Скасувати
        </Button>
        <Button type="primary" htmlType="submit" disabled={isSubmitting || !isDirty}>
          Зберегти
        </Button>
      </Flex>
    </Form>
  );
};

export default StaticFieldForm;
