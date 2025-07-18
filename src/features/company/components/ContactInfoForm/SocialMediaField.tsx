import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Select, Tooltip } from 'antd';
import { type Control, Controller, type FieldErrors, useFieldArray } from 'react-hook-form';

import { SOC_MEDIA_ICON_MAP } from '@features/company/constants.tsx';
import type { CompanySocial } from '@features/company/types.ts';
import type { CompanyContactSchema } from '@features/company/validation.ts';

import styles from '../styles.module.scss';

const formatSocMediaLabel = (type: CompanySocial['type']) => (
  <Flex gap={4} align="center">
    {SOC_MEDIA_ICON_MAP[type]}
    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
  </Flex>
);

const SOC_MEDIA_TYPES = [
  {
    label: formatSocMediaLabel('facebook'),
    value: 'facebook',
  },
  {
    label: formatSocMediaLabel('instagram'),
    value: 'instagram',
  },
  {
    label: formatSocMediaLabel('website'),
    value: 'website',
  },
];

const SocialMediaField = ({
  control,
  errors,
}: {
  control: Control<CompanyContactSchema>;
  errors: FieldErrors<CompanyContactSchema>;
}) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'socials' });

  return (
    <Flex vertical gap={8}>
      {fields.map((item, index) => (
        <Flex key={item.id} vertical style={{ marginBottom: '8px' }}>
          <Flex gap={8}>
            <Controller
              name={`socials.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select
                  options={SOC_MEDIA_TYPES}
                  placeholder="Тип соціальної мережі"
                  status={errors.socials?.root?.message ? 'error' : ''}
                  {...field}
                  className={styles.socMediaSelect}
                />
              )}
            />

            <Controller
              name={`socials.${index}.url`}
              control={control}
              render={({ field }) => (
                <Input
                  {...control.register(`socials.${index}.url`)}
                  placeholder="https://example.com"
                  status={errors.socials?.[index]?.url ? 'error' : ''}
                  {...field}
                />
              )}
            />
            <Tooltip title="Видалити соціальну мережу">
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
            </Tooltip>
          </Flex>
          <Flex vertical>
            {errors.socials?.root?.message && <span className={styles.error}>{errors.socials.root.message}</span>}
            {errors.socials?.[index]?.url?.message && (
              <span className={styles.error}>{errors.socials[index].url.message}</span>
            )}
          </Flex>
        </Flex>
      ))}
      {fields.length < 3 && (
        <Button
          type="dashed"
          onClick={() => {
            append({ type: 'facebook', url: '' });
          }}
        >
          Додати соціальну мережу
        </Button>
      )}
    </Flex>
  );
};

export default SocialMediaField;
