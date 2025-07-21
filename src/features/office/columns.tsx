import { Link } from '@tanstack/react-router';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import FormatDictionaryValue from '@components/formatters/FormatDictionaryValue';

import { DICTIONARY_KEYS } from '@services/dictionary-service';

import type { OfficeDTO } from './types';

export const getColumns = (renderActions: (row: OfficeDTO) => React.ReactElement): ColumnsType<OfficeDTO> => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    showSorterTooltip: {
      title: 'Сортувати за ID',
    },
  },
  {
    key: 'locationName',
    title: 'Адреса',
    dataIndex: 'locationName',
    sorter: (a, b) => a.locationName.localeCompare(b.locationName),
    showSorterTooltip: {
      title: 'Сортувати за адресою',
    },
    render: (value: string) => <span style={{ display: 'flex', width: 200 }}>{value || '-'}</span>,
  },
  {
    key: 'additionalDescription',
    title: 'Опис',
    dataIndex: 'additionalDescription',
    sorter: false,
    render: (value: string) => <span style={{ display: 'flex', width: 200 }}>{value || '-'}</span>,
  },
  {
    key: 'workSchedule',
    title: 'Графік роботи',
    dataIndex: 'workSchedule',
    sorter: false,
    render: (value: string) => <span style={{ display: 'flex', width: 200 }}>{value || '-'}</span>,
  },
  {
    key: 'companyId',
    title: 'Компанія',
    dataIndex: 'companyId',
    sorter: (a, b) => a.companyId - b.companyId,
    showSorterTooltip: {
      title: 'Сортувати за компанією',
    },
    render: (value) => (
      <Link to="/companies/$companyId" params={{ companyId: value }}>
        {value}
      </Link>
    ),
  },
  {
    key: 'categoryIds',
    title: 'Категорії',
    dataIndex: 'categoryIds',
    sorter: false,
    render: (value) => <FormatDictionaryValue value={value} dictionaryKey={DICTIONARY_KEYS.categories} />,
  },
  {
    key: 'conditionIds',
    title: 'Умови',
    dataIndex: 'conditionIds',
    sorter: false,
    render: (value) => <FormatDictionaryValue value={value} dictionaryKey={DICTIONARY_KEYS.conditions} />,
  },
  {
    key: 'serviceIds',
    title: 'Послуги',
    dataIndex: 'serviceIds',
    sorter: false,
    render: (value) => <FormatDictionaryValue value={value} dictionaryKey={DICTIONARY_KEYS.services} />,
  },
  {
    key: 'actions',
    title: 'Дії',
    render: (_value, row: OfficeDTO) => renderActions(row),
    fixed: 'right',
  },
];
