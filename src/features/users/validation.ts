import { z } from 'zod';

export const FIRST_NAME_REGEX = new RegExp(/^[A-Za-zА-Яа-яіїєґІЇЄҐ]+$/);

export const inviteUserSchema = z.object({
  email: z.string({ message: 'Введіть електронну адресу' }).email('Неправильна електронна адреса'),
  firstName: z.string().max(20).regex(FIRST_NAME_REGEX, 'Імʼя повинне бути одним словом').optional(),
  lastName: z.string().max(20).optional(),
});

export type TInviteUserForm = z.infer<typeof inviteUserSchema>;
