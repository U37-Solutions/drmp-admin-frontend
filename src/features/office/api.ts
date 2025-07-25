import type { OfficeSchema } from '@features/office/validation.ts';

import apiClient from '@services/api-client.ts';

import type { CreateOfficeDTO, OfficeDTO } from './types';

export const getOfficeById = async (id: number): Promise<OfficeDTO> => {
  return await apiClient.get(`/offices/${id}`).then((res) => res.data);
};

export const getOffices = async (): Promise<OfficeDTO[]> => {
  return await apiClient.get(`/offices`).then((res) => res.data);
};

export const getOfficesByCompanyId = async (companyId: number): Promise<OfficeDTO[]> => {
  return await apiClient.get(`/offices/company/${companyId}`).then((res) => res.data);
};

export const createOffice = async (companyId: number, newOffice: CreateOfficeDTO): Promise<OfficeDTO> => {
  return await apiClient.post(`/offices/company/${companyId}`, newOffice).then((res) => res.data);
};

export const updateOffice = async (id: number, updatedOffice: OfficeSchema): Promise<OfficeDTO> => {
  return await apiClient
    .put(`/offices/${id}`, {
      ...updatedOffice,
    })
    .then((res) => res.data);
};

export const deleteOffice = async (id: number) => {
  return await apiClient.delete(`/offices/${id}`).then((res) => res.data);
};
