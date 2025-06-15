import { getRouteApi } from '@tanstack/react-router';
import type { SorterResult } from 'antd/es/table/interface';
import { useMemo } from 'react';

import type { FileRouteTypes } from '@/routeTree.gen.ts';

interface PaginationState {
  page: number;
  pageSize: number;
  sortBy: string;
  sortAsc: boolean;
  search: string;
}

export interface TableState {
  page: number;
  pageSize: number;
  changePage: (paginationPage: number, newPageSize?: number) => void;
  search: string;
  changeSearch: (value: string) => void;
  sortBy: string;
  sortAsc: boolean;
  changeSorting: (action: string, sorter: SorterResult<unknown>) => void;
  resetFilters: () => void;
}

const useTableState = (route: FileRouteTypes['id']): TableState => {
  const routeApi = useMemo(() => getRouteApi(route), [route]);
  const data = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const updateSearchParams = async (newParams: Partial<PaginationState>) => {
    return await navigate({ search: (prev) => ({ ...prev, ...newParams }) });
  };

  const changePage = async (paginationPage: number, newPageSize = 10) => {
    await updateSearchParams({ page: paginationPage, pageSize: newPageSize });
  };

  const changeSearch = async (search: string) => {
    await updateSearchParams({ search, page: 1 });
  };

  const changeSorting = async (action: string, sorter: SorterResult<unknown>) => {
    if (action !== 'sort') return;

    if (!sorter.order) {
      await updateSearchParams({ sortAsc: true, sortBy: '' });
      return;
    }

    await updateSearchParams({
      sortAsc: sorter.order === 'ascend',
      sortBy: String(sorter.column?.key || sorter.field),
    });
  };

  const resetFilters = async () => {
    await updateSearchParams({});
  };

  return {
    ...(data as PaginationState),
    changePage,
    changeSearch,
    changeSorting,
    resetFilters,
  };
};

export default useTableState;
