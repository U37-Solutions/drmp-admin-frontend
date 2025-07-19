import { Permission, Role } from '@/features/session/types';

const rolesPermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.CHAT_VIEW,
    Permission.CHAT_CREATE,
    Permission.CHAT_DELETE,
    Permission.CHAT_SEND_MESSAGE,
    Permission.USERS_VIEW,
    Permission.USER_VIEW,
    Permission.USER_INVITE,
    Permission.USER_CREATE,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_RESET_PASSWORD,
    Permission.COMPANIES_VIEW,
    Permission.COMPANY_VIEW,
    Permission.COMPANY_CREATE,
    Permission.COMPANY_UPDATE,
    Permission.COMPANY_DELETE,
    Permission.OFFICES_VIEW,
    Permission.OFFICE_VIEW,
    Permission.OFFICE_CREATE,
    Permission.OFFICE_UPDATE,
    Permission.OFFICE_DELETE,
  ],
  [Role.EDITOR]: [
    Permission.CHAT_VIEW,
    Permission.CHAT_CREATE,
    Permission.CHAT_SEND_MESSAGE,
    Permission.USERS_VIEW,
    Permission.USER_VIEW,
    Permission.USER_CREATE,
  ],
  [Role.USER]: [Permission.CHAT_VIEW, Permission.CHAT_CREATE, Permission.CHAT_SEND_MESSAGE],
};

export const userHasPermissions = (role: Role, requiredPermissions: Permission | Permission[]) => {
  const rolePermissions = rolesPermissions[role];
  return Array.isArray(requiredPermissions)
    ? requiredPermissions.every((perm) => rolePermissions.includes(perm))
    : rolePermissions.includes(requiredPermissions);
};
