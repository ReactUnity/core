import { useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { ReactUnity } from '../../models/generated';

type IsEqual<T = any> = (a: T, b: T) => boolean;

const createSubscriber = <T>(obj: ReactUnity.Helpers.IWatchable<T>, isEqual?: IsEqual<T>) => {
  const isWatchable = obj && typeof obj === 'object' && ('Value' in obj);
  let snapshot = isWatchable ? obj.Value : undefined;

  return {
    subscribe: (onStoreChange: () => void) => {
      snapshot = isWatchable ? obj.Value : undefined;

      const remove = obj?.AddListener((key, value, dic) => {
        const prev = snapshot;
        snapshot = isWatchable ? obj.Value : undefined;

        if (isEqual ? !isEqual(prev, snapshot) : (prev !== snapshot)) {
          onStoreChange();
        }
      });

      if (!remove) console.warn(`The watchable does not provide a change listener`);

      return () => remove?.();
    },
    getSnapshot: () => snapshot,
  };
};

export function useWatchable<T>(obj: ReactUnity.Helpers.IWatchable<T>, isEqual?: IsEqual<T>) {
  const sb = useMemo(() => createSubscriber(obj, isEqual), [obj, isEqual]);
  return useSyncExternalStore(sb.subscribe, sb.getSnapshot);
}
