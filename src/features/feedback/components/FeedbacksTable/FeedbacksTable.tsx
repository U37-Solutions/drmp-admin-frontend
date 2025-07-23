import { Flex, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo } from 'react';

import { getColumns } from '@features/feedback/columns.tsx';
import DeleteFeedbackAction from '@features/feedback/components/DeleteFeedbackAction/DeleteFeedbackAction.tsx';
import type { FeedbackDTO } from '@features/feedback/types.ts';
import { Permission } from '@features/session/types.ts';

import filterTableData from '@services/filter-table-data.ts';
import { currentUserHasPermissions } from '@services/has-permissions.ts';
import mapColumnsWithSort from '@services/sort-columns.ts';

import useTableState from '@shared/hooks/useTableState.ts';

const FeedbacksTable = ({ data, isCompanyFlow = false }: { data: Array<FeedbackDTO>; isCompanyFlow?: boolean }) => {
  const { changePage, page, pageSize, search, changeSorting, sortBy, sortAsc } =
    useTableState('/_authorized/feedbacks');

  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data || [], page, pageSize, search, ['name', 'email']),
    [data, page, pageSize, search],
  );

  const renderActions = useCallback((row: FeedbackDTO) => {
    return currentUserHasPermissions(Permission.FEEDBACK_DELETE) ? (
      <Flex gap={4}>
        <DeleteFeedbackAction id={row.id} />
      </Flex>
    ) : null;
  }, []);

  const columns = useMemo(() => getColumns(renderActions, isCompanyFlow), [isCompanyFlow, renderActions]);

  return (
    <Table
      columns={mapColumnsWithSort<FeedbackDTO>(columns, sortBy, sortAsc)}
      onChange={(_pagination, _filters, sorter, { action }) => {
        changeSorting(action, sorter as SorterResult<unknown>);
      }}
      locale={{
        emptyText: 'Немає відгуків для відображення',
      }}
      pagination={{
        total: total || 0,
        showTotal: (totalCount: number) => `Всього: ${totalCount}`,
        current: page,
        pageSize: pageSize,
        onChange: changePage,
      }}
      dataSource={pageFilteredData}
    />
  );
};

export default FeedbacksTable;
