import type { ColumnGroupType, ColumnType, ColumnsType } from 'antd/es/table';

const isGroupedColumn = <T>(column: ColumnType<T> | ColumnGroupType<T>): column is ColumnGroupType<T> =>
  !('dataIndex' in column);

const mapColumnsWithSort = <T>(columns: ColumnsType<T>, sortBy: string, sortAsc: boolean): ColumnsType<T> =>
  columns.map((column) => {
    if (isGroupedColumn<T>(column)) return column;

    const columnKey = column.key || column.dataIndex;

    if (columnKey === sortBy) {
      return { ...column, defaultSortOrder: sortAsc ? 'ascend' : 'descend' };
    }
    return column;
  });

export default mapColumnsWithSort;
