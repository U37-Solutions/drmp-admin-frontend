'use client';
import React, { useEffect } from 'react';

import { useSetSessionInfo } from '@/features/session/store';
import { SessionInfo } from '@/features/session/types';

type IProps = {
  sessionInfo: SessionInfo | null;
  children: React.ReactNode;
};

const SessionProvider = ({ sessionInfo, children }: IProps) => {
  const setSessionInfo = useSetSessionInfo();

  useEffect(() => {
    if (sessionInfo) {
      setSessionInfo(sessionInfo);
    }
  }, [sessionInfo, setSessionInfo]);

  return <>{children}</>;
};

export default SessionProvider;
