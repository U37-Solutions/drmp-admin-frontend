import { z } from 'zod';

export const officeSchema = z.object({
  additionalDescription: z.string({ message: 'Введіть опис' }).min(1, { message: 'Опис не може бути порожнім' }),
  workSchedule: z
    .string({ message: 'Введіть графік роботи' })
    .min(1, { message: 'Графік роботи не може бути порожнім' }),
  serviceIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б одну послугу',
      required_error: 'Виберіть хоча б одну послугу',
    })
    .min(1, { message: 'Виберіть хоча б одну послугу' }),

  categoryIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б одну категорію',
      required_error: 'Виберіть хоча б одну категорію',
    })
    .min(1, { message: 'Виберіть хоча б одну категорію' }),

  conditionIds: z
    .array(z.number(), {
      invalid_type_error: 'Виберіть хоча б одну форму власності',
      required_error: 'Виберіть хоча б одну форму власності',
    })
    .min(1, { message: 'Виберіть хоча б одну форму власності' }),
  locationName: z.string({ message: 'Введіть адресу' }).min(1, { message: 'Адреса не може бути порожньою' }),
  latitude: z.number({ message: 'Широта має бути числом' }).min(1, { message: 'Широта має бути більше 0' }),
  longitude: z.number({ message: 'Довгота має бути числом' }).min(1, { message: 'Довгота має бути більше 0' }),
  regionId: z.number({ message: 'Виберіть регіон' }),
  customFields: z.array(z.any()).optional(),
});

export type OfficeSchema = z.infer<typeof officeSchema>;
