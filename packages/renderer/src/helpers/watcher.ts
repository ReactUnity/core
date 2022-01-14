import { useEffect, useState } from 'react';
import { ReactUnity } from '../models/generated';

export function useWatchable<T>(obj: ReactUnity.Helpers.IWatchable<T>) {
  const isWatchable = obj && typeof obj === 'object' && ('Value' in obj);

  const [state, setState] = useState(isWatchable ? obj.Value : undefined);

  useEffect(() => {
    if (!isWatchable) {
      setState(undefined);
      return;
    }

    setState(obj.Value);

    if ('AddListener' in obj) return obj.AddListener((val) => setState(val));
  }, [obj, isWatchable]);

  return state;
}
