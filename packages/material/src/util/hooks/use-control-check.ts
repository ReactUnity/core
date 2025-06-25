import { useEffect, useRef } from 'react';

export interface ControlProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  readOnly?: boolean;
}

export interface ControlRef<T> {
  getValue: () => T | undefined;
  setValue: (value: T, skipNotify?: boolean) => void;
}

const error1 =
  'A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components';
const error2 =
  'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.';
const error3 =
  'App contains an input element with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components';
const error4 =
  'A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components';

export function useControlCheck<T>({ value, defaultValue, onChange, readOnly }: ControlProps<T>) {
  const valueInit = useRef(value);
  const warned = useRef(0);

  useEffect(() => {
    if (typeof value !== 'undefined') {
      if ((warned.current & 1) === 0 && typeof valueInit.current === 'undefined') {
        warned.current |= 1;
        console.error(error1);
      }

      if ((warned.current & 2) === 0 && typeof onChange === 'undefined' && typeof readOnly === 'undefined') {
        warned.current |= 2;
        console.warn(error2);
      }

      if ((warned.current & 4) === 0 && typeof defaultValue !== 'undefined') {
        warned.current |= 4;
        console.error(error3);
      }
    } else {
      if ((warned.current & 8) === 0 && typeof valueInit.current !== 'undefined') {
        warned.current |= 8;
        console.error(error4);
      }
    }
  }, [value, defaultValue, onChange, readOnly]);

  return typeof valueInit.current !== 'undefined';
}
