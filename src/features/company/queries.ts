import { getCompanyById } from '@features/company/api.ts';

export const companyByIdQueryOptions = (companyId: string) => ({
  queryKey: ['companies', companyId],
  queryFn: async () => await getCompanyById(Number(companyId)),
});
