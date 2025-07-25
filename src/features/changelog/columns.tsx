import type { ColumnsType } from 'antd/es/table';

import { ChangelogAction, type ChangelogValueUnion, type FormattedChangelogEntry } from '@features/changelog/types.ts';

import FormatChangelogFullData from '@components/formatters/FormatChangelogFullData.tsx';
import FormatChangelogValue from '@components/formatters/FormatChangelogValue.tsx';
import FormatChangeType from '@components/formatters/FormatChangeType.tsx';

export const getColumns = <K extends ChangelogValueUnion>(): ColumnsType<FormattedChangelogEntry<K>> => [
  {
    title: 'Дата',
    dataIndex: 'timestamp',
    key: 'timestamp',
    defaultSortOrder: 'ascend',
    showSorterTooltip: {
      title: 'Сортувати за датою',
    },
    sorter: (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    render: (timestamp: string) => new Date(timestamp).toLocaleString(),
  },
  {
    title: 'Тип',
    dataIndex: 'action',
    key: 'action',
    render: (value: ChangelogAction) => <FormatChangeType type={value} />,
  },
  {
    title: 'Змінені значення',
    dataIndex: 'prevValue',
    key: 'prevValue',
    render: (_value, row) => <FormatChangelogValue row={row} />,
  },
  {
    title: 'Користувач',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Дії',
    key: 'actions',
    fixed: 'right',
    render: (_text, record) => <FormatChangelogFullData row={record} />,
  },
];
