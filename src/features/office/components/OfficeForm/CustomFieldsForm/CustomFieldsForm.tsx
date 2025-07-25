import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Form } from 'antd';
import { Controller, type UseFormReturn, useFieldArray } from 'react-hook-form';

import { getCustomFields } from '@features/formEdit/api.ts';
import CustomFieldBuilder from '@features/formEdit/components/CustomFieldBuilder/CustomFieldBuilder.tsx';
import type { CustomFieldDTO } from '@features/formEdit/types.ts';

import LabelWithHelpTip from '@components/LabelWithHelpTip/LabelWithHelpTip.tsx';

import type { OfficeSchema } from '@/features/office/validation';

type Props = {
  form: UseFormReturn<OfficeSchema>;
};

const CustomFieldsForm = ({ form }: Props) => {
  const fieldArray = useFieldArray({ control: form.control, name: 'customFields' });
  const { data } = useSuspenseQuery<Array<CustomFieldDTO>>({
    queryKey: ['customFields'],
    queryFn: async () => await getCustomFields(),
  });

  return (
    <Flex vertical>
      {fieldArray.fields.map((field, i) => {
        const fieldConfig = data.find((f) => f.id === field.structureId);
        const fieldError = form.formState.errors.customFields?.[i]?.value?.message;

        if (!fieldConfig) return null;

        return (
          <Form.Item
            label={<LabelWithHelpTip label={fieldConfig.title} tip={fieldConfig.tooltip} />}
            key={field.id}
            extra={fieldError ? <span className="field-error">{fieldError}</span> : null}
          >
            <Controller
              name={`customFields.${i}.value`}
              control={form.control}
              render={({ field: controllerField }) => (
                <CustomFieldBuilder fieldConfig={fieldConfig} field={controllerField} error={fieldError} />
              )}
            />
          </Form.Item>
        );
      })}
    </Flex>
  );
};

export default CustomFieldsForm;
