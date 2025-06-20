export type SessionInfo = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EDITOR = 'EDITOR',
}
