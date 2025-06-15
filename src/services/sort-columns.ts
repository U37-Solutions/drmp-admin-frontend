import type { ColumnGroupType, ColumnType, ColumnsType } from 'antd/es/table';

const isGroupedColumn = (column: ColumnType | ColumnGroupType): column is ColumnGroupType => !('dataIndex' in column);

const mapColumnsWithSort = (columns: ColumnsType, sortBy: string, sortAsc: boolean): ColumnsType =>
  columns.map((column) => {
    if (isGroupedColumn(column)) return column;

    const columnKey = column.key || column.dataIndex;

    if (columnKey === sortBy) {
      return { ...column, defaultSortOrder: sortAsc ? 'ascend' : 'descend' };
    }
    return column;
  });

export default mapColumnsWithSort;
