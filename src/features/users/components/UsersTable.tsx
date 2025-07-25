import { Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useMemo } from 'react';

import { getColumns } from '@features/users/columns.tsx';
import type { UserDTO } from '@features/users/types.ts';

import filterTableData from '@services/filter-table-data';
import mapColumnsWithSort from '@services/sort-columns';

import useTableState from '@shared/hooks/useTableState';
import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

import DeleteUserAction from './DeleteUser/DeleteUserAction';
import ViewUserAction from './ViewUser/ViewUserAction';

import type { FileRouteTypes } from '@/routeTree.gen.ts';

type IProps = {
  data: Array<UserDTO>;
  isLoading: boolean;
  refetchData: () => void;
  routeId: FileRouteTypes['id'];
};

const UsersTable = ({ data, isLoading, refetchData, routeId }: IProps) => {
  const alertContext = useAlertContext();
  const { changePage, page, pageSize, search, changeSorting, sortBy, sortAsc } = useTableState(routeId);

  const columns = useMemo(
    () =>
      getColumns({
        getActions: (record) => [
          <ViewUserAction key="view-user" userId={record.id} />,
          <DeleteUserAction
            key="delete-user"
            user={record}
            onSuccess={() => {
              if (alertContext) {
                alertContext.openNotification('Користувача успішно видалено', 'success');
              }
              refetchData();
            }}
          />,
        ],
      }),
    [refetchData, alertContext],
  );
  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data, page, pageSize, search, ['firstName', 'lastName', 'email']),
    [data, page, pageSize, search],
  );

  return (
    <Table
      className="ant-responsive-table"
      loading={{ spinning: isLoading }}
      dataSource={pageFilteredData}
      locale={{ emptyText: 'Немає користувачів' }}
      columns={mapColumnsWithSort<UserDTO>(columns, sortBy, sortAsc)}
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
  );
};

export default UsersTable;
