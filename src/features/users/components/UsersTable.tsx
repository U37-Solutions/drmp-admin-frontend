import { Button, Card, Input, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useMemo } from 'react';

import { getColumns } from '@features/users/columns';
import type { UserDTO } from '@features/users/types.ts';

import filterTableData from '@services/filter-table-data';
import mapColumnsWithSort from '@services/sort-columns';

import useTableState from '@shared/hooks/useTableState';

type IProps = {
  data: Array<UserDTO>;
  isLoading: boolean;
};

const UsersTable = ({ data, isLoading }: IProps) => {
  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } =
    useTableState('/_authorized/_admin/users');

  const rowActions = useMemo(() => {
    return <Button type="link">Редагувати</Button>;
  }, []);

  const columns = useMemo(() => getColumns(rowActions), [rowActions]);
  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data, page, pageSize, search, ['firstName', 'lastName', 'email']),
    [data, page, pageSize, search],
  );

  return (
    <Card
      title="Користувачі"
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <Table
        loading={{ spinning: isLoading }}
        dataSource={pageFilteredData}
        columns={mapColumnsWithSort(columns, sortBy, sortAsc)}
        onChange={(_pagination, _filters, sorter, { action }) => {
          changeSorting(action, sorter as SorterResult<unknown>);
        }}
        pagination={{
          total: total || 0,
          showTotal: (totalCount: number) => `Всього: ${totalCount}`,
          current: page,
          pageSize: pageSize,
          onChange: changePage,
        }}
      />
    </Card>
  );
};

export default UsersTable;
