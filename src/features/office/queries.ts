import { queryOptions } from '@tanstack/react-query';

import { getOfficeById, getOffices, getOfficesByCompanyId } from '@features/office/api.ts';

export const createOfficeByIdQueryOptions = (officeId: number) => {
  return queryOptions({
    queryKey: ['office', officeId],
    queryFn: () => getOfficeById(officeId),
  });
};

export const createOfficesQueryOptions = (companyId?: number | null) => {
  return queryOptions({
    queryKey: ['offices', companyId],
    // If companyId is provided (which means Offices page is accessed by CA/CU), fetch offices by company ID, otherwise fetch all offices.
    queryFn: () => (companyId ? getOfficesByCompanyId(companyId) : getOffices()),
  });
};

export const createOfficeByCompanyIdQueryOptions = (companyId: number) => {
  return queryOptions({
    queryKey: ['company/offices', companyId],
    queryFn: () => getOfficesByCompanyId(companyId),
  });
};
