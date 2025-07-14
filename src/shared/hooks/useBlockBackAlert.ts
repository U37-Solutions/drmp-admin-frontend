import { useEffect } from 'react';

export const useConfirmNavigation = (message: string, shouldBlock: boolean) => {
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (!shouldBlock) return;
      e.preventDefault();
      alert(message);
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [message, shouldBlock]);
};
