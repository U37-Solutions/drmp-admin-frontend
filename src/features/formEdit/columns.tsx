import { Flex, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import { type CustomFieldDTO, type CustomFieldType } from '@features/formEdit/types.ts';

import FormatCustomFieldType from '@components/formatters/FormatCustomFieldType.tsx';

export const getColumns = (renderActions: (row: CustomFieldDTO) => React.ReactElement): ColumnsType<CustomFieldDTO> => [
  {
    key: 'title',
    title: 'Назва',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: {
      title: 'Сортувати за назвою поля',
    },
    render: (value: string) => <span style={{ display: 'flex', width: 200 }}>{value || '-'}</span>,
  },
  {
    key: 'type',
    title: 'Тип',
    dataIndex: 'type',
    sorter: (a, b) => a.type.localeCompare(b.type),
    showSorterTooltip: {
      title: 'Сортувати за типом поля',
    },
    render: (value: CustomFieldType) => <FormatCustomFieldType type={value} />,
  },
  {
    key: 'required',
    title: 'Обов’язкове',
    dataIndex: 'required',
    render: (value: boolean) => <span>{value ? 'Так' : 'Ні'}</span>,
  },
  {
    key: 'placeholder',
    title: 'Текст шаблону (placeholder)',
    dataIndex: 'placeholder',
    render: (value: string) => value || '-',
  },
  {
    key: 'tooltip',
    title: 'Підказка (tooltip)',
    dataIndex: 'tooltip',
    render: (value: string) => value || '-',
  },
  {
    key: 'options',
    title: 'Варіанти відповіді',
    dataIndex: 'options',
    render: (options: Array<string>) =>
      options?.length ? (
        <Flex wrap="wrap">
          {options.map((option, index) => (
            <Tag key={index} style={{ margin: '2px' }}>
              {option}
            </Tag>
          ))}
        </Flex>
      ) : (
        '-'
      ),
  },
  {
    key: 'actions',
    title: 'Дії',
    dataIndex: 'actions',
    fixed: 'right',
    render: (_value, row) => renderActions(row),
  },
];
