import { useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { ReactUnity } from '../../models/generated';

type IsEqual<T = any> = (a: T, b: T) => boolean;

function createSubscriber<T>(obj: ReactUnity.Reactive.IReactive<T>, isEqual?: IsEqual<T>) {
  const isReactive = obj && typeof obj === 'object' && 'Value' in obj;
  let snapshot = isReactive ? obj.Value : undefined;

  return {
    subscribe: (onStoreChange: () => void) => {
      snapshot = isReactive ? obj.Value : undefined;

      const remove =
        isReactive &&
        typeof obj.AddListener === 'function' &&
        obj?.AddListener(() => {
          const prev = snapshot;
          snapshot = isReactive ? obj.Value : undefined;

          if (typeof isEqual !== 'function' || !isEqual(prev, snapshot)) {
            onStoreChange();
          }
        });

      if (isReactive && typeof remove !== 'function') console.warn('The reactive value does not provide a change listener');

      return () => remove?.();
    },
    getSnapshot: () => snapshot,
  };
}

export function useReactiveValue<T>(obj: ReactUnity.Reactive.IReactive<T>, isEqual?: IsEqual<T>) {
  const sb = useMemo(() => createSubscriber(obj, isEqual), [obj, isEqual]);
  return useSyncExternalStore(sb.subscribe, sb.getSnapshot, sb.getSnapshot);
}
