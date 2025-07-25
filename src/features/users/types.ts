import type { Role } from '@features/session/types.ts';

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface UserResetPassword {
  oldPassword: string;
  newPassword: string;
}
