import { useEffect } from 'react';

type ConfirmNavigationProps = {
  message: string;
  shouldBlock: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const useConfirmNavigation = ({ message, shouldBlock, onConfirm, onCancel }: ConfirmNavigationProps) => {
  useEffect(() => {
    if (!shouldBlock) return;

    window.history.pushState(null, '', window.location.href);

    const handlePop = () => {
      const proceed = window.confirm(message);
      if (proceed) {
        onConfirm?.();
        window.removeEventListener('popstate', handlePop);
        window.history.back();
      } else {
        onCancel?.();
        window.history.pushState(null, '', window.location.href);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldBlock) return;
      e.preventDefault();
      return message;
    };

    window.addEventListener('popstate', handlePop);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePop);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldBlock, message, onConfirm, onCancel]);
};
