import { useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    } else {
      initialized.current = true;
      return undefined;
    }
  }, [value, delay, initialized]);

  return debouncedValue;
}

export function useDebounceRef<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState({ value });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      const handler = setTimeout(() => setDebouncedValue({ value }), delay);
      return () => clearTimeout(handler);
    } else {
      initialized.current = true;
      return undefined;
    }
  }, [value, delay, initialized]);

  return debouncedValue;
}
