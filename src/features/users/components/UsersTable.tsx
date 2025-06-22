import { Card, Input, Table, message } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo, useState } from 'react';

import { getColumns } from '@features/users/columns.tsx';
import InviteUserModal from '@features/users/components/InviteUserModal/InviteUserModal.tsx';
import UserHeader from '@features/users/components/UserHeader.tsx';
import type { UserDTO } from '@features/users/types.ts';

import filterTableData from '@services/filter-table-data';
import mapColumnsWithSort from '@services/sort-columns';

import useTableState from '@shared/hooks/useTableState';

import DeleteUserAction from './DeleteUser/DeleteUserAction/DeleteUserAction';
import ViewUserAction from './ViewUser/ViewUserAction/ViewUserAction';

type IProps = {
  data: Array<UserDTO>;
  isLoading: boolean;
  refetchData: () => void;
};

const UsersTable = ({ data, isLoading, refetchData }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } =
    useTableState('/_authorized/_admin/users');

  const [showInviteModal, setShowInviteModal] = useState(false);

  const columns = useMemo(
    () =>
      getColumns({
        getActions: (record) => [
          {
            key: 'view',
            label: <ViewUserAction userId={record.id} />,
          },
          {
            key: 'delete',
            label: <DeleteUserAction userId={record.id} onSuccess={refetchData} />,
          },
        ],
      }),
    [refetchData],
  );
  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data, page, pageSize, search, ['firstName', 'lastName', 'email']),
    [data, page, pageSize, search],
  );

  const handleInviteModalClose = useCallback(
    (success: boolean) => {
      if (success) {
        messageApi.open({
          type: 'success',
          content: 'Запрошення успішно надіслано',
        });
      }

      setShowInviteModal(false);
    },
    [messageApi],
  );

  return (
    <>
      {contextHolder}
      <Card
        title={<UserHeader handleInviteClick={() => setShowInviteModal(true)} />}
        style={{ margin: 20 }}
        styles={{ body: { padding: 0 } }}
        extra={<Input.Search defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
      >
        <Table
          className="ant-responsive-table"
          loading={{ spinning: isLoading }}
          dataSource={pageFilteredData}
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
      </Card>
      <InviteUserModal open={showInviteModal} handleClose={handleInviteModalClose} />
    </>
  );
};

export default UsersTable;
