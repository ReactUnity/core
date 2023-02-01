import { useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { ReactUnity } from '../../models/generated';

type IsEqual<T = any> = (a: T, b: T) => boolean;

function createSubscriber<T>(obj: ReactUnity.Helpers.IWatchable<T>, isEqual?: IsEqual<T>) {
  const isWatchable = obj && typeof obj === 'object' && ('Value' in obj);
  let snapshot = isWatchable ? obj.Value : undefined;

  return {
    subscribe: (onStoreChange: () => void) => {
      snapshot = isWatchable ? obj.Value : undefined;

      const remove = isWatchable && typeof obj.AddListener === 'function' &&
        obj?.AddListener((key, value, dic) => {
          const prev = snapshot;
          snapshot = isWatchable ? obj.Value : undefined;

          if (typeof isEqual !== 'function' || !isEqual(prev, snapshot)) {
            onStoreChange();
          }
        });

      if (isWatchable && typeof remove !== 'function')
        console.warn(`The watchable does not provide a change listener`);

      return () => remove?.();
    },
    getSnapshot: () => snapshot,
  };
}

export function useWatchable<T>(obj: ReactUnity.Helpers.IWatchable<T>, isEqual?: IsEqual<T>) {
  const sb = useMemo(() => createSubscriber(obj, isEqual), [obj, isEqual]);
  return useSyncExternalStore(sb.subscribe, sb.getSnapshot, sb.getSnapshot);
}
