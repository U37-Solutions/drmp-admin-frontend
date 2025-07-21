import { type CustomFieldDTO, CustomFieldType } from '@features/formEdit/types.ts';

import { DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

export const useStaticFieldsConfig = () => {
  const services = useDictionaryService(DICTIONARY_KEYS.services, false);
  const conditions = useDictionaryService(DICTIONARY_KEYS.conditions, false);
  const categories = useDictionaryService(DICTIONARY_KEYS.categories, false);

  const staticFields: Array<CustomFieldDTO> = [
    { title: 'Послуги', required: true, id: -1, type: CustomFieldType.SELECT, options: services.map((el) => el.name) },
    { title: 'Умови', required: true, id: -1, type: CustomFieldType.SELECT, options: conditions.map((el) => el.name) },
    {
      title: 'Категорії',
      required: true,
      id: -1,
      type: CustomFieldType.SELECT,
      options: categories.map((el) => el.name),
    },
  ];

  return { staticFields };
};
