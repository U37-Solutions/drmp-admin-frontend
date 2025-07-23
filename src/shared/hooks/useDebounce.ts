import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <Func extends (...args: Parameters<Func>) => void>(func: Func, wait: number): Func => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<Func>) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        func(...args);
      }, wait);
    },
    [func, wait],
  );

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return debounced as Func;
};
