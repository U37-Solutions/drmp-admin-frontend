import { useQuery } from '@tanstack/react-query';

import apiClient from '@services/api-client.ts';

export interface DictionaryDTO {
  id: number;
  name: string;
}

export enum DICTIONARY_KEYS {
  services = 'services',
  conditions = 'conditions',
  companyTypes = 'company-types',
  categories = 'categories',
}

const getDictionaryQueryOptions = (key: DICTIONARY_KEYS) => ({
  queryKey: ['dictionary', key],
  queryFn: async () => await apiClient.get(`/dictionary/${key}`).then((res) => res.data),
});

export type DictionarySelectOption = {
  label: string;
  value: number;
};

type ReturnType<T extends boolean> = T extends true ? Array<DictionarySelectOption> : Array<DictionaryDTO>;

export const useDictionaryService = <T extends boolean>(
  key: DICTIONARY_KEYS,
  formatSelectOptions: T = false as T,
): ReturnType<T> => {
  const { data } = useQuery<Array<DictionaryDTO>>(getDictionaryQueryOptions(key));

  if (!formatSelectOptions) {
    return (data || []) as ReturnType<T>;
  }

  return (data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) || []) as ReturnType<T>;
};
