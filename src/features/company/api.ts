import type { CompanyStatusFilter } from '@features/company/constants.tsx';
import type { CompanyDTO } from '@features/company/types.ts';

import apiClient from '@services/api-client.ts';

export const getCompanies = async (statusFilter: CompanyStatusFilter) => {
  const URL = statusFilter === 'ALL' ? '/companies' : `/companies?status=${statusFilter}`;
  return await apiClient.get(URL).then((res) => res.data);
};

export const getCompanyById = async (id: number) => await apiClient.get(`/companies/${id}`).then((res) => res.data);

export const deleteCompany = async (id: number) => await apiClient.delete(`/companies/${id}`).then((res) => res.data);

export const updateCompany = async (id: number, data: CompanyDTO) =>
  await apiClient.put(`/companies/${id}`, data).then((res) => res.data);

export const approveCompany = async (id: number) =>
  await apiClient.post(`/company-register/${id}/approve`).then((res) => res.data);

interface RejectCompanyValues {
  message?: string;
  assignedEditorId?: number;
}

export const rejectCompany = async (id: number, values: RejectCompanyValues) =>
  await apiClient.post(`/company-register/${id}/reject`, values).then((res) => res.data);
