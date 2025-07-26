import { create } from 'zustand';

type ConfettiStore = {
  show: boolean;
  showConfetti: (time: number) => void;
};

const useConfettiStore = create<ConfettiStore>((set) => ({
  show: false,
  showConfetti: (time: number) => {
    set({ show: true });

    if (time) {
      setTimeout(() => {
        set({ show: false });
      }, time);
    }
  },
}));

export const useConfettiShow = () => {
  return useConfettiStore((state) => state.show);
};

export const useShowConfetti = () => {
  return useConfettiStore((state) => state.showConfetti);
};
