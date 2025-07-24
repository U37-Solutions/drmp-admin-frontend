import { z } from 'zod';

import type { CustomFieldDTO } from '@features/formEdit/types.ts';

export const officeSchema = z.object({
  additionalDescription: z
    .string({ message: 'Введіть опис' })
    .min(1, { message: 'Опис не може бути порожнім' })
    .nullable(),
  serviceIds: z
    .array(z.number({ message: 'ID типу організації має бути числом' }))
    .min(1, { message: 'Виберіть хоча б один тип організації' }),
  categoryIds: z
    .array(z.number({ message: 'ID категорії має бути числом' }))
    .min(1, { message: 'Виберіть хоча б одну категорію' }),
  conditionIds: z
    .array(z.number({ message: 'ID форми власності має бути числом' }))
    .min(1, { message: 'Виберіть хоча б одну форму власності' }),
  workSchedule: z.string(),
  customFields: z
    .array(
      z.object({
        structureId: z.number({ message: 'ID поля має бути числом' }),
        value: z.string().optional(),
      }),
    )
    .optional(),
  locationName: z.string({ message: 'Введіть адресу' }).min(1, { message: 'Адреса не може бути порожньою' }).nullable(),
  latitude: z.number({ message: 'Широта має бути числом' }).nullable(),
  longitude: z.number({ message: 'Довгота має бути числом' }).nullable(),
  regionId: z.number({ message: 'ID регіону має бути числом' }),
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
