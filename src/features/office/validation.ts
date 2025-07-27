import { z } from 'zod';

import type { CustomFieldDTO } from '@features/formEdit/types.ts';

import { FIELDS_LENGTH } from './constants';

export const officeSchema = z.object({
  additionalDescription: z
    .string({ message: 'Введіть опис' })
    .min(1, { message: 'Опис не може бути порожнім' })
    .max(FIELDS_LENGTH.additionalDescription, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.additionalDescription}`,
    }),
  workSchedule: z
    .string({ message: 'Введіть графік роботи' })
    .min(1, { message: 'Графік роботи не може бути порожнім' })
    .max(FIELDS_LENGTH.workSchedule, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.workSchedule}`,
    }),
  serviceIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б один вид послуг',
      required_error: 'Виберіть хоча б один вид послуг',
    })
    .min(1, { message: 'Виберіть хоча б один вид послуг' }),

  categoryIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б одну категорію бенефіціарів',
      required_error: 'Виберіть хоча б одну категорію бенефіціарів',
    })
    .min(1, { message: 'Виберіть хоча б одну категорію бенефіціарів' }),

  conditionIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б одну умову надання допомоги',
      required_error: 'Виберіть хоча б одну умову надання допомоги',
    })
    .min(1, { message: 'Виберіть хоча б одну умову надання допомоги' }),
  locationName: z
    .string({ message: 'Введіть адресу' })
    .min(1, { message: 'Адреса не може бути порожньою' })
    .max(FIELDS_LENGTH.locationName, {
      message: `Кількість символів не може перевищувати ${FIELDS_LENGTH.locationName}`,
    }),
  latitude: z.number({ message: 'Широта має бути числом' }).min(1, { message: 'Широта має бути більше 0' }),
  longitude: z.number({ message: 'Довгота має бути числом' }).min(1, { message: 'Довгота має бути більше 0' }),
  regionId: z.number({ message: 'Виберіть регіон' }),
  customFields: z
    .array(
      z.object({
        structureId: z.number({ message: 'ID поля має бути числом' }),
        value: z.string().optional(),
      }),
    )
    .optional(),
});

export type OfficeSchema = z.infer<typeof officeSchema>;

export const customFieldsFormSchema = (fieldsConfig: Array<CustomFieldDTO>) =>
  z.object({
    customFields: z.array(
      z
        .object({
          structureId: z.number({ message: 'ID поля має бути числом' }),
          value: z.string().optional(),
        })
        .superRefine((field, ctx) => {
          const meta = fieldsConfig.find((f) => f.id === field.structureId);
          if (!meta) return;

          const value = field.value?.trim();

          if (meta.required && (!value || value.length === 0)) {
            ctx.addIssue({
              path: ['value'],
              code: z.ZodIssueCode.custom,
              message: 'Це поле є обовʼязковим',
            });
            return;
          }

          if (!value) return;

          switch (meta.type) {
            case 'NUMBER':
              if (isNaN(Number(value))) {
                ctx.addIssue({
                  path: ['value'],
                  code: z.ZodIssueCode.custom,
                  message: 'Введіть коректне число',
                });
              }
              break;

            case 'SELECT':
              if (!meta.options.includes(value)) {
                ctx.addIssue({
                  path: ['value'],
                  code: z.ZodIssueCode.custom,
                  message: 'Оберіть значення зі списку',
                });
              }
              break;

            default:
              break;
          }
        }),
    ),
  });
