import type { CustomFieldSchema } from '@features/formEdit/validation.ts';

import apiClient from '@services/api-client.ts';

export const getCustomFields = async () => await apiClient.get('/custom-structures').then((res) => res.data);

export const getCustomFieldById = async (id: number) =>
  await apiClient.get(`/custom-structures/${id}`).then((res) => res.data);

export const createCustomField = async (data: CustomFieldSchema) =>
  await apiClient.post('/custom-structures', data).then((res) => res.data);

export const updateCustomField = async (id: number, data: CustomFieldSchema) =>
  await apiClient.put(`/custom-structures/${id}`, data).then((res) => res.data);

export const deleteCustomField = async (id: number) =>
  await apiClient.delete(`/custom-structures/${id}`).then((res) => res.data);
