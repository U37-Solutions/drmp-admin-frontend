import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import { type CustomFieldDTO, type CustomFieldType, type StaticFieldDTO } from '@features/formEdit/types.ts';

import FormatCustomFieldType from '@components/formatters/FormatCustomFieldType.tsx';
import FormatFieldOptions from '@components/formatters/FormatFieldOptions.tsx';

export const getColumns = (
  renderActions: (row: CustomFieldDTO | StaticFieldDTO) => React.ReactElement,
): ColumnsType<CustomFieldDTO | StaticFieldDTO> => [
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
    render: (_options, row) => <FormatFieldOptions row={row} />,
  },
  {
    key: 'actions',
    title: 'Дії',
    dataIndex: 'actions',
    fixed: 'right',
    render: (_value, row) => renderActions(row),
  },
];
