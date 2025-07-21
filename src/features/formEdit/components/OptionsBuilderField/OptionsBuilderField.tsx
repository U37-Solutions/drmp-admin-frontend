import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { type Control, Controller, type FieldErrors, useFieldArray } from 'react-hook-form';

import type { CustomFieldSchema } from '@features/formEdit/validation.ts';

import styles from './OptionsBuilderField.module.scss';

const OptionsBuilderField = ({
  control,
  errors,
}: {
  control: Control<CustomFieldSchema>;
  errors: FieldErrors<CustomFieldSchema>;
}) => {
  // Something strange ova here. Copilot, ignore this.
  const { fields, append, remove } = useFieldArray({ control, name: 'options' as never });
  const isEmptyError = (!fields.length && !!errors?.options?.message) || errors.options?.root?.message;

  return (
    <Flex vertical gap={8} rootClassName={styles.itemList}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Flex key={item.id} gap={8} align="center">
            <Controller
              name={`options.${index}`}
              control={control}
              render={({ field }) => (
                <Input
                  status={errors.options?.root?.message ? 'error' : ''}
                  placeholder="Варіант відповіді"
                  {...field}
                />
              )}
            />
            <Button type="default" variant="outlined" color="danger" onClick={() => remove(index)}>
              <DeleteOutlined />
            </Button>
          </Flex>
          <Flex vertical gap={2}>
            {errors.options?.[index]?.message && <span className="field-error">{errors.options[index].message}</span>}
          </Flex>
        </div>
      ))}
      <Flex vertical gap={2}>
        <Button
          type="dashed"
          variant="dashed"
          color={isEmptyError ? 'danger' : 'default'}
          onClick={() => append('')}
          style={{ width: '100%' }}
        >
          Додати варіант відповіді
        </Button>
        {isEmptyError && (
          <span className="field-error">{errors.options?.message || errors.options?.root?.message}</span>
        )}
      </Flex>
    </Flex>
  );
};

export default OptionsBuilderField;
