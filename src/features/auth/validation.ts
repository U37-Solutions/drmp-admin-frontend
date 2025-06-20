import { z } from 'zod';

import { FIRST_NAME_REGEX } from '@features/users/validation.ts';

export const loginSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  password: z.string({ message: 'Введіть пароль' }).min(1, 'Введіть пароль'),
});

export type TLoginForm = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
});

export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ message: 'Пароль обовʼязковий' })
      .min(8, 'Пароль має містити не менше 8 символів')
      .max(20, 'Пароль має містити не більше 20 символів'),
    confirmPassword: z.string({ message: 'Підтвердження паролю обовʼязкове' }),
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export type TResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const signUpSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    firstName: z
      .string({ message: 'Імʼя обовʼязкове' })
      .regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом')
      .min(2, 'Імʼя не може містити менше 2-х символів')
      .max(20, 'Імʼя не може містити більше 20-ти символів'),
    lastName: z
      .string({ message: 'Прізвище обовʼязкове' })
      .min(2, 'Прізвище не може містити менше 2-х символів')
      .max(20, 'Прізвище не може містити більше 20-ти символів'),
    password: z
      .string()
      .min(8, 'Пароль має містити не менше 8 символів')
      .max(20, 'Пароль має містити не більше 20 символів'),
    confirmPassword: z.string({ message: 'Підтвердження паролю обовʼязкове' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export type TSignUpForm = z.infer<typeof signUpSchema>;
