import type { CompanyDTO } from '@features/company/types.ts';
import type { OfficeDTO } from '@features/office/types.ts';
import type { UserDTO } from '@features/users/types.ts';

const USER_CHANGELOG_VALUE_TITLE_MAP: Record<keyof UserDTO, string> = {
  id: 'ID',
  email: 'Email',
  firstName: "Ім'я",
  lastName: 'Прізвище',
  role: 'Роль',
};

const COMPANY_CHANGELOG_VALUE_TITLE_MAP: Record<keyof CompanyDTO, string> = {
  id: 'ID',
  name: 'Назва організації',
  code: 'Код організації',
  contactName: 'Контактна особа',
  phone: 'Телефон',
  email: 'Email',
  status: 'Статус',
  companyTypeId: 'Тип організації',
  userId: 'ID користувача',
  socials: 'Соціальні мережі',
  ownershipType: 'Форма власності',
  donorSupport: 'Підтримка донорів',
};

const OFFICE_CHANGELOG_VALUE_TITLE_MAP: Record<keyof OfficeDTO, string> = {
  id: 'ID',
  additionalDescription: 'Опис офісу',
  locationName: 'Адреса офісу',
  latitude: 'Широта',
  longitude: 'Довгота',
  regionId: 'Регіон',
  companyId: 'ID організації',
  companyName: 'Назва організації',
  workSchedule: 'Робочий графік',
  serviceIds: 'Послуги',
  categoryIds: 'Категорії',
  conditionIds: 'Умови',
  customFields: 'Користувацькі поля',
};

export const CHANGELOG_VALUES_TITLE_MAP = {
  ...COMPANY_CHANGELOG_VALUE_TITLE_MAP,
  ...OFFICE_CHANGELOG_VALUE_TITLE_MAP,
  ...USER_CHANGELOG_VALUE_TITLE_MAP,
};
