import { DependencyList, useEffect, useRef, useState } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @param pr The promise to be watched
 */
export function usePromise<T = any>(pr: PromiseLike<T>): T | undefined;

/**
 * @param pr The promise to be watched
 * @param defaultValue Before promise completes, this value will be used
 */
export function usePromise<T = any>(pr: PromiseLike<T>, defaultValue: T): T;
export function usePromise<T = any>(
  pr: PromiseLike<T>,
  defaultValue?: T
): T | undefined {
  const [val, setVal] = useState<T | undefined>(defaultValue);

  useEffect(() => {
    pr?.then((x) => setVal(x));
  }, [pr]);

  return val;
}

/**
 * @param callback Callback which creates the observable to be subscribed
 * @param deps If present, observable will be re-created when the values in the list change.
 * @returns The value emited from the created observable
 */
export function useObservable<ResType>(
  callback: () => Observable<ResType>,
  deps?: DependencyList
): ResType | undefined;

/**
 * @param callback Callback which creates the observable to be subscribed
 * @param deps If present, observable will be re-created when the values in the list change.
 * @param initialValue Before observable emits any value, this value will be used
 * @returns The value emited from the created observable
 */
export function useObservable<ResType>(
  callback: () => Observable<ResType>,
  deps: DependencyList,
  initialValue: ResType
): ResType;

export function useObservable<ResType>(
  callback: () => Observable<ResType>,
  deps?: DependencyList,
  initialValue?: ResType
) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const obs = callback();
    const sub = obs.subscribe((x) => setState(x));
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return state;
}

/**
 * Creates a {@link BehaviorSubject} from the passed value and updates it every time the value changes.
 * The subject is unchanging and can be safely passed to dependency arrays.
 * @param value The value which is feeded to the returned {@link BehaviorSubject}
 */
export function useSubject<ResType>(value: ResType) {
  const res = useRef<BehaviorSubject<ResType>>();
  res.current = res.current || new BehaviorSubject<ResType>(value);

  useEffect(() => {
    res.current?.next(value);
  }, [value]);

  return res.current;
}
