import { queryOptions } from '@tanstack/react-query';

import { getOfficeById, getOffices, getOfficesByCompanyId } from '@features/office/api.ts';

export const createOfficeByIdQueryOptions = (officeId: number) => {
  return queryOptions({
    queryKey: ['office', officeId],
    queryFn: () => getOfficeById(officeId),
  });
};

export const createOfficesQueryOptions = () => {
  return queryOptions({
    queryKey: ['offices'],
    queryFn: () => getOffices(),
  });
};

export const createOfficeByCompanyIdQueryOptions = (companyId: number) => {
  return queryOptions({
    queryKey: ['company/offices', companyId],
    queryFn: () => getOfficesByCompanyId(companyId),
  });
};
