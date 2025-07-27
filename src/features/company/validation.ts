import { z } from 'zod';

import { FIELDS_LENGTH, UKRAINIAN_PHONE_REGEX } from './constants';

export const companyInfoSchema = z.object({
  name: z
    .string({ message: 'Введіть назву організації' })
    .min(1, { message: 'Назва організації не може бути порожньою' })
    .max(FIELDS_LENGTH.name, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.name}`,
    }),
  code: z.string({ message: 'Введіть код організації' }).min(1, { message: 'Код організації не може бути порожнім' }),
  ownershipType: z
    .string({ message: 'Вкажіть форму власності' })
    .min(1, { message: 'Поле Форма власності не може бути порожнім' }),
  companyTypeId: z
    .number({ message: 'Виберіть тип організації' })
    .min(1, { message: 'Тип організації не може бути порожнім' }),
  donorSupport: z
    .string()
    .max(FIELDS_LENGTH.donorSupport, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.donorSupport}`,
    })
    .optional(),
});

export type CompanyInfoSchema = z.infer<typeof companyInfoSchema>;

export const companyContactSchema = z.object({
  contactName: z
    .string({ message: 'Введіть контактну особу' })
    .min(1, { message: 'Контактна особа не може бути порожньою' })
    .max(FIELDS_LENGTH.contactName, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.contactName}`,
    })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇґҐєЄ\s]+$/, {
      message: 'Контактна особа повинна містити лише літери та пробіли',
    })
    .refine((name) => {
      const words = name.trim().split(/\s+/);
      return words.length >= 2 && words.length <= 3;
    }, 'Контактна особа повинна містити від 2 до 3 слів'),
  phone: z
    .string({ message: 'Введіть номер телефону' })
    .min(1, { message: 'Номер телефону не може бути порожнім' })
    .regex(UKRAINIAN_PHONE_REGEX, {
      message: 'Мобільний номер має бути у форматі +380XXXXXXXXX (без пробілів чи роздільників)',
    }),
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  socials: z
    .array(
      z.object({
        type: z.enum(['facebook', 'instagram', 'website'], {
          message: 'Неправильний тип соціальної мережі',
        }),
        url: z.string({ message: 'Введіть URL соціальної мережі' }).url('Неправильний URL'),
      }),
    )
    .refine((socials) => {
      const types = socials.map((social) => social.type);
      return new Set(types).size === types.length;
    }, 'Соціальні мережі не повинні дублюватися'),
});

export type CompanyContactSchema = z.infer<typeof companyContactSchema>;
