import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';

import { createCustomField, updateCustomField } from '@features/formEdit/api.ts';
import OptionsBuilderField from '@features/formEdit/components/OptionsBuilderField/OptionsBuilderField.tsx';
import { type CustomFieldDTO, CustomFieldType, CustomFieldTypeTitle } from '@features/formEdit/types.ts';
import { type CustomFieldSchema, customFieldSchema } from '@features/formEdit/validation.ts';

import LabelWithHelpTip from '@components/LabelWithHelpTip/LabelWithHelpTip.tsx';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

type Props = {
  onClose(): void;
  initialValues?: CustomFieldDTO;
};

const TYPE_OPTIONS = [
  { label: CustomFieldTypeTitle.TEXT, value: CustomFieldType.TEXT },
  { label: CustomFieldTypeTitle.NUMBER, value: CustomFieldType.NUMBER },
  { label: CustomFieldTypeTitle.SELECT, value: CustomFieldType.SELECT },
  { label: CustomFieldTypeTitle.TEXTAREA, value: CustomFieldType.TEXTAREA },
];

const CustomFieldForm = ({ initialValues, onClose }: Props) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CustomFieldSchema>({
    defaultValues: initialValues ?? { type: CustomFieldType.TEXT },
    resolver: zodResolver(customFieldSchema),
  });

  const onMutateSuccess = async () => {
    if (alertContext) {
      alertContext.openNotification('Поле успішно збережено', 'success');
    }
    await queryClient.refetchQueries({ queryKey: ['customFields'], type: 'all' });
    await queryClient.invalidateQueries({ queryKey: ['customField', initialValues?.id], type: 'all' });
    onClose();
  };

  const onMutateError = (error: Error) => {
    if (error instanceof AxiosError && error.response?.data.error.includes('already exists')) {
      setError('title', { message: 'Поле з такою назвою вже існує' });
    }
  };

  const { mutate: createField } = useMutation({
    mutationKey: ['customField', 'create'],
    mutationFn: async (values: CustomFieldSchema) => createCustomField(values),
    onSuccess: onMutateSuccess,
    onError: onMutateError,
  });

  const { mutate: updateField } = useMutation({
    mutationKey: ['customField', 'update', initialValues?.id],
    mutationFn: async (values: CustomFieldSchema) => updateCustomField(initialValues!.id, values),
    onSuccess: onMutateSuccess,
    onError: onMutateError,
  });

  const required = watch('required');
  const fieldType = watch('type');
  const isSelectType = fieldType === CustomFieldType.SELECT;

  const onSubmit = (data: CustomFieldSchema) => {
    if (initialValues) {
      updateField(data);
    } else {
      createField(data);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit((data) => onSubmit(data))}>
      <Form.Item label="Валідація" style={{ marginBottom: 12 }}>
        <Controller
          control={control}
          name="required"
          render={({ field }) => (
            <Checkbox defaultChecked={!!initialValues?.required} checked={!!required} {...field}>
              Обовʼязкове поле
            </Checkbox>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Тип поля"
        extra={errors.type?.message ? <span className="field-error">{errors.type.message}</span> : null}
      >
        <Controller
          control={control}
          name="type"
          defaultValue={initialValues?.type || CustomFieldType.TEXT}
          render={({ field }) => (
            <Select
              status={errors.type?.message ? 'error' : ''}
              placeholder="Оберіть тип поля"
              options={TYPE_OPTIONS}
              {...field}
            />
          )}
        />
      </Form.Item>
      {isSelectType && (
        <Form.Item label="Варіанти відповіді">
          <OptionsBuilderField control={control} errors={errors} />
        </Form.Item>
      )}
      <Form.Item
        extra={errors.title?.message ? <span className="field-error">{errors.title.message}</span> : null}
        label="Назва поля"
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input status={errors.title?.message ? 'error' : ''} placeholder="Введіть назву поля" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        extra={errors.placeholder?.message ? <span className="field-error">{errors.placeholder.message}</span> : null}
        label="Текст шаблону (placeholder)"
      >
        <Controller
          control={control}
          name="placeholder"
          render={({ field }) => (
            <Input
              status={errors.placeholder?.message ? 'error' : ''}
              placeholder="Текст шаблону виглядатиме так"
              {...field}
              value={field.value ?? ''}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        extra={errors.tooltip?.message ? <span className="field-error">{errors.tooltip.message}</span> : null}
        label={<LabelWithHelpTip label="Підказка поля (tooltip)" tip="Тут відображатиметься підказка" />}
      >
        <Controller
          control={control}
          name="tooltip"
          render={({ field }) => (
            <Input
              status={errors.tooltip?.message ? 'error' : ''}
              placeholder="Введіть підказку поля"
              {...field}
              value={field.value ?? ''}
            />
          )}
        />
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

export default CustomFieldForm;
