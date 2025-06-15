type FilterTableData = <T>(
  data: Array<T>,
  page: number,
  pageSize: number,
  search?: string,
  searchKeys?: Array<keyof T>,
) => {
  total: number;
  data: Array<T>;
  pageFilteredData: Array<T>;
};

const filterTableData: FilterTableData = (data, page, pageSize, search, searchKeys) => {
  const from = (page - 1) * pageSize;
  const to = page * pageSize;

  const filteredData = (data || []).filter((el) => {
    return searchKeys?.some((searchKey) => {
      const value = el[searchKey];

      return String(value)
        .toLowerCase()
        .includes(search?.toLowerCase() || '');
    });
  });

  return {
    total: filteredData.length,
    data: filteredData,
    pageFilteredData: filteredData.slice(from, to),
  };
};

export default filterTableData;
