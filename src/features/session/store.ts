import { create } from 'zustand';

import { SessionInfo } from '@/features/session/types';

type SessionStore = {
  data: SessionInfo | null;
  setData: (data: SessionInfo | null) => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  data: null,
  setData: (data: SessionInfo | null) => set(() => ({ data })),
}));

export const useSessionInfo = () => {
  return useSessionStore((state) => state.data);
};

export const useSetSessionInfo = () => {
  return useSessionStore((state) => state.setData);
};
