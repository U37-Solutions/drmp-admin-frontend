import React from 'react';

import { useSessionInfo } from '@features/session/store.ts';
import { Role } from '@features/session/types.ts';

export interface UserRoleContext {
  userId: number;
  role: Role;
  isAdmin: boolean;
  isCompanyUser: boolean;
  isCompanyAdmin: boolean;
  isEditor: boolean;
  companyId: number | null;
}

const UserRoleContext = React.createContext<UserRoleContext | null>(null);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionInfo = useSessionInfo();

  const contextValue: UserRoleContext | null = React.useMemo(() => {
    if (!sessionInfo) {
      return null;
    }

    const { role } = sessionInfo;

    return {
      userId: sessionInfo.id,
      role,
      isAdmin: role === Role.ADMIN,
      isEditor: role === Role.EDITOR,
      isCompanyUser: role === Role.COMPANY_USER,
      isCompanyAdmin: role === Role.COMPANY_ADMIN,
      companyId: sessionInfo.companyId,
    };
  }, [sessionInfo]);

  return <UserRoleContext.Provider value={contextValue}>{children}</UserRoleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoleContext = () => {
  return React.useContext(UserRoleContext);
};
