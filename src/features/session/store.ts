import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SessionInfo } from '@features/session/types';

type SessionStore = {
  data: SessionInfo | null;
  setData: (data: SessionInfo | null) => void;
};

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data: SessionInfo | null) => set(() => ({ data })),
    }),
    {
      name: 'session-info',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useSessionInfo = () => {
  return useSessionStore((state) => state.data);
};

export const useSetSessionInfo = () => {
  return useSessionStore((state) => state.setData);
};
