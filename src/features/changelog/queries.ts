import { getCompanyChangelog, getOfficeChangelog, getUsersChangelog } from '@features/changelog/api.ts';

export const createCompanyChangelogQueryOptions = (companyId: string) => ({
  queryKey: ['company-logs', companyId],
  queryFn: () => getCompanyChangelog(companyId),
});

export const createOfficeChangelogQueryOptions = (officeId: number) => ({
  queryKey: ['officeChangelog', officeId],
  queryFn: () => getOfficeChangelog(officeId),
  enabled: false,
});

export const createUsersChangelogQueryOptions = () => ({
  queryKey: ['usersChangeLog'],
  queryFn: getUsersChangelog,
  enabled: false,
});
