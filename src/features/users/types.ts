export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResetPassword {
  oldPassword: string;
  newPassword: string;
}
