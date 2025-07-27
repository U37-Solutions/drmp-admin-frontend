import type { CustomFieldSchema } from '@features/formEdit/validation.ts';

import apiClient from '@services/api-client.ts';
import { DICTIONARY_KEYS, type DictionaryDTO } from '@services/dictionary-service.tsx';

export const getCustomFields = async () => await apiClient.get('/custom-structures').then((res) => res.data);

export const getCustomFieldById = async (id: number) =>
  await apiClient.get(`/custom-structures/${id}`).then((res) => res.data);

export const createCustomField = async (data: CustomFieldSchema) =>
  await apiClient.post('/custom-structures', data).then((res) => res.data);

export const updateCustomField = async (id: number, data: CustomFieldSchema) =>
  await apiClient.put(`/custom-structures/${id}`, data).then((res) => res.data);

export const deleteCustomField = async (id: number) =>
  await apiClient.delete(`/custom-structures/${id}`).then((res) => res.data);

export const bulkUpdateStaticFieldDictionary = async (key: DICTIONARY_KEYS, data: Array<DictionaryDTO>) =>
  await apiClient.put(`/dictionary/${key}`, data).then((res) => res.data);

export const bulkDeleteStaticFieldDictionary = async (key: DICTIONARY_KEYS, ids: Array<number>) =>
  await apiClient.delete(`/dictionary/${key}`, { data: ids }).then((res) => res.data);

export const addStaticFieldDictionary = async (key: DICTIONARY_KEYS, data: string) =>
  await apiClient.post(`/dictionary/${key}`, data).then((res) => res.data);
