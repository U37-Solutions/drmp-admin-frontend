import { z } from 'zod';

export const companyInfoSchema = z.object({
  name: z
    .string({ message: 'Введіть назву організації' })
    .min(1, { message: 'Назва організації не може бути порожньою' }),
  code: z.string({ message: 'Введіть код організації' }).min(1, { message: 'Код організації не може бути порожнім' }),
  ownershipType: z
    .string({ message: 'Вкажіть форму власності' })
    .min(1, { message: 'Поле Форма власності не може бути порожнім' }),
  companyTypeId: z
    .number({ message: 'Виберіть тип організації' })
    .min(1, { message: 'Тип організації не може бути порожнім' }),
  donorSupport: z.string().optional(),
});

export type CompanyInfoSchema = z.infer<typeof companyInfoSchema>;

export const companyContactSchema = z.object({
  contactName: z
    .string({ message: 'Введіть контактну особу' })
    .min(1, { message: 'Контактна особа не може бути порожньою' })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇґҐєЄ\s]+$/, {
      message: 'Контактна особа повинна містити лише літери та пробіли',
    })
    .refine((name) => {
      const words = name.trim().split(/\s+/);
      return words.length >= 2 && words.length <= 3;
    }, 'Контактна особа повинна містити від 2 до 3 слів'),
  phone: z.string({ message: 'Введіть номер телефону' }).min(1, { message: 'Номер телефону не може бути порожнім' }),
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  socials: z
    .array(
      z.object({
        type: z.enum(['facebook', 'instagram', 'website'], {
          errorMap: () => ({ message: 'Неправильний тип соціальної мережі' }),
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
