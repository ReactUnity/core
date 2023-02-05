import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useEffectSkipFirst = (
  effect: EffectCallback,
  deps: DependencyList | undefined,
  skip?: () => boolean
) => {
  const notInitialRender = useRef(false);
  useEffect(() => {
    if (notInitialRender.current) {
      return effect();
    } else {
      if (skip && skip()) return;
      notInitialRender.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
