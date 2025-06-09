import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  password: z.string({ message: 'Введіть пароль' }).min(1, 'Введіть пароль'),
});

export type TLoginForm = z.infer<typeof loginSchema>;
