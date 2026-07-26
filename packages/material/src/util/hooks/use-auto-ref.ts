import { useLayoutEffect, useRef } from 'react';

export function useAutoRef<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
