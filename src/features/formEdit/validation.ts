import { z } from 'zod';

import { CustomFieldType } from '@features/formEdit/types.ts';

export const customFieldSchema = z
  .object({
    type: z.enum([CustomFieldType.SELECT, CustomFieldType.TEXT, CustomFieldType.NUMBER, CustomFieldType.TEXTAREA], {
      message: 'Тип поля не може бути порожнім',
    }),
    title: z
      .string({ message: 'Вкажіть заголовок(назву) поля' })
      .min(1, { message: 'Заголовок(назва) поля не може бути порожнім' }),
    placeholder: z.string().optional().nullable(),
    tooltip: z.string().optional().nullable(),
    required: z.boolean().optional().nullable(),
    options: z
      .array(z.string().min(1, { message: 'Варіант відповіді не може бути пустим' }))
      .optional()
      .nullable(),
  })
  .refine((data) => (data.type === CustomFieldType.SELECT ? !!data.options?.length && data.options.length > 1 : true), {
    message: `Вкажіть хоча б два варіанти відповіді для випадаючого списку`,
    path: ['options'],
  })
  .refine(
    (data) => (data.type === CustomFieldType.SELECT ? new Set(data.options).size === data.options?.length : true),
    {
      message: 'Варіанти відповіді повинні бути унікальними',
      path: ['options'],
    },
  );

export type CustomFieldSchema = z.infer<typeof customFieldSchema>;
