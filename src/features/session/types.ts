export type SessionInfo = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: Array<{ id: Role; name: keyof Role }>;
};

export enum Role {
  ADMIN = 1,
  USER = 2,
}
