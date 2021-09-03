import { useRef } from 'react';

export default function useAutoRef<T>(val: T) {
  const ref = useRef<T>(val);
  ref.current = val;
  return ref;
}
