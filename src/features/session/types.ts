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

export enum Permission {
  // Chats
  CHAT_VIEW = 'chat:view',
  CHAT_CREATE = 'chat:create',
  CHAT_DELETE = 'chat:delete',
  CHAT_SEND_MESSAGE = 'chat:send_message',
  // Users
  USERS_VIEW = 'users:view',
  USER_VIEW = 'user:view',
  USER_INVITE = 'user:invite',
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_RESET_PASSWORD = 'user:reset_password',
  // Companies
  COMPANIES_VIEW = 'companies:view',
  COMPANY_VIEW = 'company:view',
  COMPANY_CREATE = 'company:create',
  COMPANY_UPDATE = 'company:update',
  COMPANY_DELETE = 'company:delete',
  // Offices
  OFFICES_VIEW = 'offices:view',
  OFFICE_VIEW = 'office:view',
  OFFICE_CREATE = 'office:create',
  OFFICE_UPDATE = 'office:update',
  OFFICE_DELETE = 'office:delete',
}
