export type SessionInfo = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  companyId: number | null;
};

export enum Role {
  ADMIN = 'ADMIN',
  COMPANY_USER = 'COMPANY_USER',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EDITOR = 'EDITOR',
}
