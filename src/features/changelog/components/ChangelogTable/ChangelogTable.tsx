import { Table } from 'antd';

import { getColumns } from '@features/changelog/columns.tsx';
import type { ChangelogValueUnion, FormattedChangelogEntry } from '@features/changelog/types.ts';

type Props<K extends ChangelogValueUnion> = {
  data: Array<FormattedChangelogEntry<K>>;
};

const ChangelogTable = <K extends ChangelogValueUnion>({ data }: Props<K>) => {
  return (
    <Table
      pagination={false}
      locale={{ emptyText: 'Немає записів у журналі змін' }}
      dataSource={data}
      columns={getColumns()}
    />
  );
};

export default ChangelogTable;
