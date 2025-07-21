import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input, Table, Tooltip, Typography } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { getColumns } from '@features/formEdit/columns.tsx';
import CustomFieldEditDialog from '@features/formEdit/components/CustomFieldEditDialog/CustomFieldEditDialog.tsx';
import DeleteCustomFieldAction from '@features/formEdit/components/CustomFieldsTable/DeleteCustomFieldAction.tsx';
import { type CustomFieldDTO, CustomFieldEditDialogMode } from '@features/formEdit/types.ts';

import filterTableData from '@services/filter-table-data.ts';
import mapColumnsWithSort from '@services/sort-columns.ts';

import useTableState from '@shared/hooks/useTableState.ts';

const CustomFieldsTable = ({ data, loading }: { data: Array<CustomFieldDTO>; loading: boolean }) => {
  const [editingRow, setEditingRow] = useState<CustomFieldDTO | null>(null);
  const [dialogMode, setDialogMode] = useState<CustomFieldEditDialogMode | undefined>();
  const isDialogOpen = (dialogMode === 'create' && !editingRow) || !!editingRow;

  const { changePage, page, pageSize, changeSearch, search, changeSorting, sortBy, sortAsc } = useTableState(
    '/_authorized/_admin/form-edit',
  );

  const { pageFilteredData, total } = useMemo(
    () => filterTableData(data || [], page, pageSize, search, ['title']),
    [data, page, pageSize, search],
  );

  const handleFieldEdit = (field: CustomFieldDTO) => {
    setDialogMode(field.id === -1 ? CustomFieldEditDialogMode.editStatic : CustomFieldEditDialogMode.edit);
    setEditingRow(field);
  };

  const handleCreateNewField = () => {
    setDialogMode(CustomFieldEditDialogMode.create);
    setEditingRow(null);
  };

  const renderActions = (row: CustomFieldDTO) => (
    <Flex gap={4}>
      <Tooltip title="Редагувати поле">
        <Button variant="outlined" icon={<EditOutlined />} onClick={() => handleFieldEdit(row)} />
      </Tooltip>

      <Tooltip title="Видалити поле">
        <DeleteCustomFieldAction field={row} />
      </Tooltip>
    </Flex>
  );

  return (
    <Card
      title={
        <Flex gap={12}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Поля анкети реєстрації
          </Typography.Title>
          <Tooltip placement="bottom" title="Створити нове поле">
            <Button onClick={handleCreateNewField} icon={<PlusOutlined />} />
          </Tooltip>
        </Flex>
      }
      style={{ margin: 20 }}
      styles={{ body: { padding: 0 } }}
      extra={<Input.Search allowClear defaultValue={search} placeholder="Пошук" onSearch={changeSearch} />}
    >
      <CustomFieldEditDialog
        mode={dialogMode}
        open={isDialogOpen}
        onClose={() => {
          setDialogMode(undefined);
          setEditingRow(null);
        }}
        field={editingRow}
      />
      <Table
        loading={{ spinning: loading }}
        locale={{ emptyText: 'На даний момент немає полів для відображення' }}
        columns={mapColumnsWithSort<CustomFieldDTO>(getColumns(renderActions), sortBy, sortAsc)}
        onChange={(_pagination, _filters, sorter, { action }) => {
          changeSorting(action, sorter as SorterResult<unknown>);
        }}
        dataSource={pageFilteredData}
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

export default CustomFieldsTable;
