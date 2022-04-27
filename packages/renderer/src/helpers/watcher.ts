import { useCallback, useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { ReactUnity } from '../models/generated';

export function useWatchable<T>(obj: ReactUnity.Helpers.IWatchable<T>) {
  const isWatchable = useMemo(() => obj && typeof obj === 'object' && ('Value' in obj), [obj]);

  const subscribe = useCallback((onStoreChange: () => void) => {
    if (isWatchable && 'AddListener' in obj) {
      const unsub = obj.AddListener(() => onStoreChange());
      return () => unsub?.();
    }
    return () => { };
  }, [obj, isWatchable]);

  const getSnapshot = useCallback(() => isWatchable ? obj.Value : undefined, [obj, isWatchable]);

  return useSyncExternalStore(subscribe, getSnapshot);
}
