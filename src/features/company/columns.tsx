import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import { OWNERSHIP_TYPES } from '@features/company/constants.tsx';
import type { CompanyDTO, CompanyStatus } from '@features/company/types.ts';

import { FormatCompanyStatus, FormatContact, FormatSocialMedia } from '@components/formatters';
import FormatDictionaryValue from '@components/formatters/FormatDictionaryValue.tsx';

import { DICTIONARY_KEYS } from '@services/dictionary-service.tsx';

export const getColumns = (renderActions: (row: CompanyDTO) => React.ReactElement): ColumnsType<CompanyDTO> => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    showSorterTooltip: {
      title: 'Сортувати за ID',
    },
  },
  {
    key: 'name',
    title: 'Назва',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    showSorterTooltip: {
      title: 'Сортувати за назвою',
    },
    render: (value: string) => <span style={{ display: 'flex', width: 200 }}>{value || '-'}</span>,
  },
  {
    key: 'status',
    title: 'Статус',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    showSorterTooltip: {
      title: 'Сортувати за статусом',
    },
    render: (value: CompanyStatus) => <FormatCompanyStatus status={value} variant="full" />,
  },
  {
    key: 'code',
    title: 'Код',
    dataIndex: 'code',
    sorter: false,
    render: (value: string) => value || '—',
  },
  {
    key: 'companyTypeId',
    title: 'Тип організації',
    dataIndex: 'companyTypeId',
    sorter: (a, b) => a.companyTypeId - b.companyTypeId,
    showSorterTooltip: {
      title: 'Сортувати за типом організації',
    },
    render: (value) => <FormatDictionaryValue value={value} dictionaryKey={DICTIONARY_KEYS.companyTypes} />,
  },
  {
    key: 'ownershipType',
    title: 'Форма власності',
    dataIndex: 'ownershipType',
    sorter: false,
    render: (value: string) => <span>{OWNERSHIP_TYPES.find((el) => el.value === value)?.label}</span>,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    showSorterTooltip: {
      title: 'Сортувати за email',
    },
    render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
  },
  {
    key: 'contact',
    title: 'Контактна особа',
    dataIndex: 'contactName',
    render: (_value, row: CompanyDTO) => <FormatContact company={row} />,
  },
  {
    key: 'socials',
    title: 'Соціальні мережі',
    dataIndex: 'socials',
    render: (_value, row: CompanyDTO) => <FormatSocialMedia company={row} />,
  },
  {
    key: 'actions',
    title: 'Дії',
    render: (_value, row: CompanyDTO) => renderActions(row),
    fixed: 'right',
  },
];
