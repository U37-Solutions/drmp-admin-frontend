import { DICTIONARY_KEYS, type DictionaryDTO } from '@services/dictionary-service.tsx';

export enum CustomFieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  TEXTAREA = 'TEXTAREA',
}

export const CustomFieldTypeTitle: Record<CustomFieldType, string> = {
  [CustomFieldType.TEXT]: 'Текстове поле',
  [CustomFieldType.NUMBER]: 'Числове поле',
  [CustomFieldType.SELECT]: 'Випадаючий список',
  [CustomFieldType.TEXTAREA]: 'Велике текстове поле',
};

export enum CustomFieldEditDialogMode {
  create = 'create',
  edit = 'edit',
  editStatic = 'edit-static',
}

export interface CustomFieldDTO {
  id: number;
  type: CustomFieldType;
  title: string;
  placeholder?: string;
  tooltip?: string;
  required: boolean;
  options: Array<string>;
}

export interface StaticFieldDTO extends Omit<CustomFieldDTO, 'options'> {
  options: Array<DictionaryDTO>;
  dictionaryKey: DICTIONARY_KEYS;
}

export const getIsFieldStatic = (field: CustomFieldDTO | StaticFieldDTO): field is StaticFieldDTO =>
  'dictionaryKey' in field;

export interface CustomFieldValueDTO {
  structureId: number;
  value: string;
}
