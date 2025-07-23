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
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  COMPANY_USER = 'COMPANY_USER',
  EDITOR = 'EDITOR',
}

export enum Permission {
  // Chat
  CHAT_VIEW = 'chat:view',
  CHAT_CREATE = 'chat:create',
  CHAT_DELETE = 'chat:delete',
  CHAT_SEND_MESSAGE = 'chat:send_message',
  // User
  USERS_VIEW = 'users:view',
  USER_VIEW = 'user:view',
  USER_INVITE = 'user:invite',
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_RESET_PASSWORD = 'user:reset_password',
  // Company
  COMPANIES_VIEW = 'companies:view',
  COMPANY_VIEW = 'company:view',
  COMPANY_CREATE = 'company:create',
  COMPANY_UPDATE = 'company:update',
  COMPANY_DELETE = 'company:delete',
  // Company Office
  COMPANY_OFFICES_VIEW = 'company-offices:view',
  COMPANY_OFFICE_VIEW = 'company-office:view',
  COMPANY_OFFICE_CREATE = 'company-office:create',
  COMPANY_OFFICE_UPDATE = 'company-office:update',
  COMPANY_OFFICE_DELETE = 'company-office:delete',
  // Office
  OFFICES_VIEW = 'offices:view',
  OFFICE_VIEW = 'office:view',
  OFFICE_CREATE = 'office:create',
  OFFICE_UPDATE = 'office:update',
  OFFICE_DELETE = 'office:delete',
  // Feedback
  FEEDBACKS_VIEW = 'feedbacks:view',
  FEEDBACK_ASSIGN = 'feedback:assign',
  FEEDBACK_DELETE = 'feedback:delete',
}
