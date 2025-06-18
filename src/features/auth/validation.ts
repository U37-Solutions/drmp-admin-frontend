import { z } from 'zod';

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
