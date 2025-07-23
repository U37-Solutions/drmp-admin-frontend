import { z } from 'zod';

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
  customFields: z.array(z.any()).optional(),
  locationName: z.string({ message: 'Введіть адресу' }).min(1, { message: 'Адреса не може бути порожньою' }).nullable(),
  latitude: z.number({ message: 'Широта має бути числом' }).nullable(),
  longitude: z.number({ message: 'Довгота має бути числом' }).nullable(),
  regionId: z.number({ message: 'ID регіону має бути числом' }),
});

export type OfficeSchema = z.infer<typeof officeSchema>;
