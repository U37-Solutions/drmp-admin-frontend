import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Flex, Input, Table, Tooltip, Typography } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo } from 'react';

import { getColumns } from '@features/office/columns';

import filterTableData from '@services/filter-table-data.ts';
import mapColumnsWithSort from '@services/sort-columns.ts';

import useTableState from '@shared/hooks/useTableState.ts';

import DeleteOfficeAction from '../DeleteOfficeAction';

import styles from './OfficesTable.module.scss';

import type { OfficeDTO } from '../../types';

import { Permission } from '@/features/session/types';
import type { FileRouteTypes } from '@/routeTree.gen';
import { currentUserHasPermissions } from '@/services/has-permissions';

type OfficesTableProps = {
  data: OfficeDTO[];
  route: FileRouteTypes['id'];
  isCompanyOffice?: boolean;
};

const OfficesTable: React.FC<OfficesTableProps> = ({ data, route, isCompanyOffice }) => {
  const navigate = useNavigate();
  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } = useTableState(route);

  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data || [], page, pageSize, search, ['locationName', 'companyId']),
    [data, page, pageSize, search],
  );

  const renderActions = useCallback(
    (row: OfficeDTO) => {
      return (
        <Flex gap={4}>
          <Tooltip title="Переглянути офіс">
            <Button variant="outlined" icon={<EyeOutlined />} onClick={() => navigate({ to: `/offices/${row.id}` })} />
          </Tooltip>

          {currentUserHasPermissions(isCompanyOffice ? Permission.COMPANY_OFFICE_DELETE : Permission.OFFICE_DELETE) && (
            <DeleteOfficeAction office={row} />
          )}
        </Flex>
      );
    },
    [isCompanyOffice, navigate],
  );

  const columns = useMemo(() => getColumns(renderActions), [renderActions]);

  return (
    <Card
      title={
        <Flex align="center" gap={20}>
          {!isCompanyOffice && (
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Офіси
            </Typography.Title>
          )}
          <Button>Створити офіс</Button>
        </Flex>
      }
      style={{ margin: !isCompanyOffice ? 20 : 0 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <Table
        className="ant-responsive-table"
        rowClassName={styles.row}
        dataSource={pageFilteredData}
        columns={mapColumnsWithSort<OfficeDTO>(columns, sortBy, sortAsc)}
        onChange={(_pagination, _filters, sorter, { action }) => {
          changeSorting(action, sorter as SorterResult<unknown>);
        }}
        locale={{
          emptyText: 'Немає офісів для відображення',
        }}
        onRow={(record) => ({
          onClick: () => navigate({ to: `/offices/${record.id}` }),
        })}
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

export default OfficesTable;
