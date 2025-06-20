import React from 'react';

import { useSessionInfo } from '@features/session/store.ts';
import { Role } from '@features/session/types.ts';

export interface UserRoleContext {
  userId: number;
  roleId: number;
  isAdmin: boolean;
  isUser: boolean;
}

const UserRoleContext = React.createContext<UserRoleContext | null>(null);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionInfo = useSessionInfo();

  const contextValue: UserRoleContext | null = React.useMemo(() => {
    if (!sessionInfo) {
      return null;
    }

    const { id: roleId } = sessionInfo.roles?.[0] || {};

    return {
      userId: sessionInfo.id,
      roleId,
      isAdmin: roleId === Role.ADMIN,
      isUser: roleId === Role.USER,
    };
  }, [sessionInfo]);

  return <UserRoleContext.Provider value={contextValue}>{children}</UserRoleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoleContext = () => {
  return React.useContext(UserRoleContext);
};
