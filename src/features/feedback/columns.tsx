import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import AssignCompanyAction from '@features/feedback/components/AssignCompanyAction/AssignCompanyAction.tsx';
import type { FeedbackDTO } from '@features/feedback/types.ts';

import FormatCompanyUsage from '@components/formatters/FormatCompanyUsage.tsx';

import styles from './components/FeedbacksTable/FeedbacksTable.module.scss';

export const getColumns = (
  renderActions: (row: FeedbackDTO) => React.ReactNode,
  isCompanyFlow = false,
): ColumnsType<FeedbackDTO> => [
  {
    title: 'Ім’я',
    dataIndex: 'name',
    key: 'name',
    render: (value: string) => (value ? value : '-'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (value: string) => (value ? <a href={`mailto:${value}`}>{value}</a> : '-'),
  },
  {
    title: 'Коментар',
    dataIndex: 'message',
    key: 'message',
    render: (value: string) => (
      <Typography.Paragraph
        ellipsis={{
          expandable: 'collapsible',
          rows: 3,
          symbol: (expanded) => (expanded ? 'Сховати' : 'Більше'),
        }}
        className={styles.message}
      >
        {value}
      </Typography.Paragraph>
    ),
  },
  ...(!isCompanyFlow
    ? ([
        {
          title: 'Відповідальна організація',
          dataIndex: 'companyId',
          key: 'companyId',
          render: (value: string, row: FeedbackDTO) =>
            value ? <FormatCompanyUsage {...row} /> : <AssignCompanyAction id={row.id} />,
        },
        {
          title: 'Дії',
          key: 'actions',
          fixed: 'right',
          render: (_value: string, row: FeedbackDTO) => renderActions(row),
        },
      ] as ColumnsType<FeedbackDTO>)
    : []),
];
