import { useCallback } from "react";

export function useCombinedRefs<T>(...refs: React.ForwardedRef<T>[]) {
  return useCallback((val: T) => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(val);
      } else {
        ref.current = val;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
