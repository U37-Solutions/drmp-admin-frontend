import { useSessionStore } from '@/features/session/store';
import { Permission, Role } from '@/features/session/types';

const rolePermissions: Record<Role, Permission[]> = {
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
    Permission.COMPANY_OFFICES_VIEW,
    Permission.COMPANY_OFFICE_VIEW,
    Permission.COMPANY_OFFICE_CREATE,
    Permission.COMPANY_OFFICE_UPDATE,
    Permission.COMPANY_OFFICE_DELETE,
    Permission.OFFICES_VIEW,
    Permission.OFFICE_VIEW,
    Permission.OFFICE_CREATE,
    Permission.OFFICE_UPDATE,
    Permission.OFFICE_DELETE,
  ],
  [Role.EDITOR]: [
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
    Permission.COMPANY_OFFICES_VIEW,
    Permission.COMPANY_OFFICE_VIEW,
    Permission.COMPANY_OFFICE_CREATE,
    Permission.COMPANY_OFFICE_UPDATE,
    Permission.COMPANY_OFFICE_DELETE,
    Permission.OFFICES_VIEW,
    Permission.OFFICE_VIEW,
    Permission.OFFICE_CREATE,
    Permission.OFFICE_UPDATE,
    Permission.OFFICE_DELETE,
  ],
  [Role.COMPANY_ADMIN]: [
    Permission.COMPANY_OFFICES_VIEW,
    Permission.COMPANY_OFFICE_VIEW,
    Permission.COMPANY_OFFICE_CREATE,
    Permission.COMPANY_OFFICE_UPDATE,
    Permission.COMPANY_OFFICE_DELETE,
  ],
  [Role.COMPANY_USER]: [Permission.COMPANY_OFFICES_VIEW, Permission.COMPANY_OFFICE_VIEW],
};

export const currentUserHasPermissions = (requiredPermissions: Permission | Permission[]) => {
  const role = useSessionStore.getState().data?.role;

  if (!role) {
    return false;
  }

  const permissions = rolePermissions[role];

  return Array.isArray(requiredPermissions)
    ? requiredPermissions.every((perm) => permissions.includes(perm))
    : permissions.includes(requiredPermissions);
};
