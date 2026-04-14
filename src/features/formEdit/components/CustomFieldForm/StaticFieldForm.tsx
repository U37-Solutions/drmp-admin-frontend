import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Flex, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';

import {
  addStaticFieldDictionary,
  bulkDeleteStaticFieldDictionary,
  bulkUpdateStaticFieldDictionary,
} from '@features/formEdit/api.ts';
import DictionaryOptionsBuilderField from '@features/formEdit/components/OptionsBuilderField/DictionaryOptionsBuilderField.tsx';
import type { StaticFieldDTO } from '@features/formEdit/types.ts';
import { type StaticFieldSchema, staticFieldSchema } from '@features/formEdit/validation.ts';

import { type DictionaryDTO } from '@services/dictionary-service.tsx';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

type Props = {
  onClose(): void;
  field: StaticFieldDTO | null;
};

const getUpdatedOptions = (
  originalOptions: Array<DictionaryDTO>,
  newOptions: StaticFieldSchema['options'],
): {
  added: Array<string>;
  changed: Array<DictionaryDTO>;
  deleted: Array<DictionaryDTO>;
} => {
  return (newOptions || []).reduce(
    (acc, newOption) => {
      const originalOption = originalOptions.find((opt) => opt.id === newOption.id);
      if (!originalOption) {
        acc.added.push(newOption.name);
      } else if (originalOption.name !== newOption.name) {
        acc.changed.push({ ...originalOption, name: newOption.name });
      }
      return acc;
    },
    {
      added: [],
      changed: [],
      deleted: originalOptions.filter(({ id }) => !newOptions?.some(({ id: newId }) => id === newId)),
    } as {
      added: string[];
      changed: Array<DictionaryDTO>;
      deleted: Array<DictionaryDTO>;
    },
  );
};

const StaticFieldForm = ({ field, onClose }: Props) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<StaticFieldSchema>({
    resolver: zodResolver(staticFieldSchema),
    defaultValues: {
      options: field?.options || [],
    },
  });

  const updateStaticField = (data: StaticFieldSchema) => {
    if (!field || !alertContext) return;

    const { options: originalOptions } = field;
    const { options: newOptions } = data;

    const { added, changed, deleted } = getUpdatedOptions(originalOptions, newOptions || []);
    const promises: Array<Promise<string>> = [];
    if (added.length > 0) {
      promises.push(addStaticFieldDictionary(field.dictionaryKey, added));
    }
    if (changed.length > 0) {
      promises.push(bulkUpdateStaticFieldDictionary(field.dictionaryKey, changed));
    }
    if (deleted.length > 0) {
      promises.push(
        bulkDeleteStaticFieldDictionary(
          field.dictionaryKey,
          deleted.map(({ id }) => id),
        ),
      );
    }
    return Promise.all(promises)
      .then(async () => {
        onClose();
        await queryClient.invalidateQueries({ queryKey: ['dictionary', field.dictionaryKey] });
        alertContext.openNotification('Варіанти відповіді успішно оновлено', 'success');
      })
      .catch(() => {
        alertContext.openNotification('Не вдалося оновити варіанти відповіді', 'error');
      });
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
        <Input value={field?.title} disabled />
      </Form.Item>
      <Form.Item label="Варіанти відповіді">
        <DictionaryOptionsBuilderField control={control} errors={errors} />
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
