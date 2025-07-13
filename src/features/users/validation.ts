import { z } from 'zod';

export const FIRST_NAME_REGEX = new RegExp(/^[A-Za-zА-Яа-яіїєґІЇЄҐ]+$/);

export const inviteUserSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  firstName: z.string().max(20).regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом').optional(),
  lastName: z.string().max(20).optional(),
});

export const updateUserInfoSchema = z.object({
  firstName: z.string().max(20).regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом та без цифр'),
  lastName: z.string().max(20).optional(),
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
});

export const updateUserSecuritySchema = z
  .object({
    oldPassword: z.string({ message: 'Старий пароль обовʼязковий' }),
    newPassword: z
      .string({ message: 'Новий пароль обовʼязковий' })
      .min(8, 'Пароль має містити не менше 8 символів')
      .max(20, 'Пароль має містити не більше 20 символів'),
    confirmNewPassword: z.string({ message: 'Підтвердження паролю обовʼязкове' }),
  })
  .refine(({ oldPassword, newPassword }) => oldPassword !== newPassword, {
    message: 'Новий пароль не повинен співпадати зі старим',
    path: ['newPassword'],
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmNewPassword'],
  });

export type TInviteUserForm = z.infer<typeof inviteUserSchema>;
export type TUpdateUserInfoForm = z.infer<typeof updateUserInfoSchema>;
export type TUpdateUserSecurityForm = z.infer<typeof updateUserSecuritySchema>;
