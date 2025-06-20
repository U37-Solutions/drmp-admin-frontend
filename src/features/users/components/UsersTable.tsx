import { Button, Card, Input, Table, message } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo, useState } from 'react';

import { getColumns } from '@features/users/columns';
import InviteUserModal from '@features/users/components/InviteUserModal/InviteUserModal.tsx';
import UserHeader from '@features/users/components/UserHeader.tsx';
import type { UserDTO } from '@features/users/types.ts';

import filterTableData from '@services/filter-table-data';
import mapColumnsWithSort from '@services/sort-columns';

import useTableState from '@shared/hooks/useTableState';

type IProps = {
  data: Array<UserDTO>;
  isLoading: boolean;
};

const UsersTable = ({ data, isLoading }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } =
    useTableState('/_authorized/_admin/users');

  const [showInviteModal, setShowInviteModal] = useState(false);

  const rowActions = useMemo(() => {
    return <Button type="link">Редагувати</Button>;
  }, []);

  const columns = useMemo(() => getColumns(rowActions), [rowActions]);
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
      <InviteUserModal open={showInviteModal} handleClose={handleInviteModalClose} />
    </>
  );
};

export default UsersTable;
