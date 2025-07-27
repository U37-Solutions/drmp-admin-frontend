import { CustomFieldType, type StaticFieldDTO } from '@features/formEdit/types.ts';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

export const useStaticFieldsConfig = () => {
  const services = useDictionaryService(DICTIONARY_KEYS.services, false);
  const conditions = useDictionaryService(DICTIONARY_KEYS.conditions, false);
  const categories = useDictionaryService(DICTIONARY_KEYS.categories, false);

  const staticFields: Array<StaticFieldDTO> = [
    {
      title: 'Послуги',
      required: true,
      id: -1,
      type: CustomFieldType.SELECT,
      options: services,
      dictionaryKey: DICTIONARY_KEYS.services,
    },
    {
      title: 'Умови',
      required: true,
      id: -1,
      type: CustomFieldType.SELECT,
      options: conditions,
      dictionaryKey: DICTIONARY_KEYS.conditions,
    },
    {
      title: 'Категорії',
      required: true,
      id: -1,
      type: CustomFieldType.SELECT,
      options: categories,
      dictionaryKey: DICTIONARY_KEYS.categories,
    },
  ];

  return { staticFields };
};
