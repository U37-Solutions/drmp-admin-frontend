import { z } from 'zod';

export const officeMainInfoSchema = z.object({
  additionalDescription: z.string({ message: 'Введіть опис' }).min(1, { message: 'Опис не може бути порожнім' }),
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
});

export type OfficeMainInfoSchema = z.infer<typeof officeMainInfoSchema>;

export const officeLocationInfoSchema = z.object({
  locationName: z.string({ message: 'Введіть адресу' }).min(1, { message: 'Адреса не може бути порожньою' }),
  latitude: z.number({ message: 'Широта має бути числом' }),
  longitude: z.number({ message: 'Довгота має бути числом' }),
  regionId: z.number({ message: 'ID регіону має бути числом' }),
});

export type OfficeLocationInfoSchema = z.infer<typeof officeLocationInfoSchema>;
