import type { ColumnsType } from 'antd/es/table';
import React from 'react';

export const getColumns = (actions: React.ReactNode): ColumnsType => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    showSorterTooltip: {
      title: 'Сортувати за ID',
    },
  },
  {
    title: 'Імʼя',
    dataIndex: 'firstName',
    sorter: (a, b) => a.firstName?.localeCompare(b.firstName),
    showSorterTooltip: {
      title: 'Сортувати за іменем',
    },
  },
  {
    title: 'Прізвище',
    dataIndex: 'lastName',
    sorter: (a, b) => a.lastName?.localeCompare(b.lastName),
    showSorterTooltip: {
      title: 'Сортувати за прізвищем',
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email?.localeCompare(b.email),
    showSorterTooltip: {
      title: 'Сортувати за email',
    },
  },
  {
    title: 'Дії',
    key: 'actions',
    render: () => actions,
  },
];
