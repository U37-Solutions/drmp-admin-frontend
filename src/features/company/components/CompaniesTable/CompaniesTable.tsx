import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Flex, Input, Segmented, Table, Tooltip, Typography } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo, useState } from 'react';

import { getCompanies } from '@features/company/api.ts';
import { getColumns } from '@features/company/columns.tsx';
import DeleteCompanyAction from '@features/company/components/DeleteCompanyAction.tsx';
import { COMPANY_STATUS_FILTER_OPTIONS, type CompanyStatusFilter } from '@features/company/constants.tsx';
import type { CompanyDTO } from '@features/company/types.ts';

import filterTableData from '@services/filter-table-data.ts';
import mapColumnsWithSort from '@services/sort-columns.ts';

import useTableState from '@shared/hooks/useTableState.ts';
import { useRoleContext } from '@shared/providers/UserRoleProvider.tsx';

import styles from './CompaniesTable.module.scss';

const CompaniesTable = () => {
  const navigate = useNavigate();
  const roleContext = useRoleContext();
  const [companyStatusFilter, setCompanyStatusFilter] = useState<CompanyStatusFilter>('ALL');
  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } = useTableState(
    '/_authorized/_editor/companies',
  );

  const { data, isPending } = useQuery<Array<CompanyDTO>>({
    queryKey: ['companies', companyStatusFilter],
    queryFn: async () => await getCompanies(companyStatusFilter),
  });

  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data || [], page, pageSize, search, ['name', 'email', 'code']),
    [data, page, pageSize, search],
  );

  const renderActions = useCallback(
    (row: CompanyDTO) => {
      return (
        <Flex gap={4}>
          <Tooltip title="Переглянути організацію">
            <Button
              variant="outlined"
              icon={<EyeOutlined />}
              onClick={() => navigate({ to: `/companies/${row.id}` })}
            />
          </Tooltip>

          {!!roleContext?.isAdmin && <DeleteCompanyAction company={row} />}
        </Flex>
      );
    },
    [navigate, roleContext?.isAdmin],
  );

  const columns = useMemo(() => getColumns(renderActions), [renderActions]);

  return (
    <Card
      title={
        <Flex align="center" gap={20}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Організації
          </Typography.Title>
          <Tooltip title="Фільтр по статусу організації">
            <Segmented<CompanyStatusFilter>
              options={COMPANY_STATUS_FILTER_OPTIONS}
              defaultValue="ALL"
              onChange={setCompanyStatusFilter}
            />
          </Tooltip>
        </Flex>
      }
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <Table
        className="ant-responsive-table"
        rowClassName={styles.row}
        loading={{ spinning: isPending }}
        dataSource={pageFilteredData}
        columns={mapColumnsWithSort<CompanyDTO>(columns, sortBy, sortAsc)}
        onChange={(_pagination, _filters, sorter, { action }) => {
          changeSorting(action, sorter as SorterResult<unknown>);
        }}
        locale={{
          emptyText: 'Немає компаній для відображення',
        }}
        onRow={(record) => ({
          onClick: () => navigate({ to: `/companies/${record.id}` }),
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

export default CompaniesTable;
