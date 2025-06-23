import { z } from 'zod';

export const FIRST_NAME_REGEX = new RegExp(/^[A-Za-zА-Яа-яіїєґІЇЄҐ]+$/);

export const inviteUserSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  firstName: z.string().max(20).regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом').optional(),
  lastName: z.string().max(20).optional(),
});

export const updateUserInfoSchema = z.object({
  firstName: z.string().max(20).regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом'),
  lastName: z.string().max(20).optional(),
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
});

export const updateUserSecuritySchema = z
  .object({
    newPassword: z
      .string({ message: 'Пароль обовʼязковий' })
      .min(8, 'Пароль має містити не менше 8 символів')
      .max(20, 'Пароль має містити не більше 20 символів'),
    confirmNewPassword: z.string({ message: 'Підтвердження паролю обовʼязкове' }),
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmNewPassword'],
  });

export type TInviteUserForm = z.infer<typeof inviteUserSchema>;
export type TUpdateUserInfoForm = z.infer<typeof updateUserInfoSchema>;
export type TUpdateUserSecurityForm = z.infer<typeof updateUserSecuritySchema>;
