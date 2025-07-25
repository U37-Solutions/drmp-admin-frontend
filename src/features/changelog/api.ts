import { formatChangeLogValues } from '@features/changelog/util.ts';
import type { CompanyDTO } from '@features/company/types.ts';
import type { OfficeDTO } from '@features/office/types.ts';
import type { UserDTO } from '@features/users/types.ts';

import apiClient from '@services/api-client.ts';

export const getCompanyChangelog = async (companyId: string) =>
  await apiClient
    .get(`/changelog/companies/${companyId}`)
    .then(({ data }) => formatChangeLogValues<CompanyDTO>(data))
    .catch(() => {
      return [];
    });

export const getOfficeChangelog = async (officeId: number) =>
  await apiClient
    .get(`/changelog/offices/${officeId}`)
    .then(({ data }) => formatChangeLogValues<OfficeDTO>(data))
    .catch(() => {
      return [];
    });

export const getUsersChangelog = async () =>
  await apiClient
    .get(`/changelog/users`)
    .then(({ data }) => formatChangeLogValues<UserDTO>(data))
    .catch(() => {
      return [];
    });
