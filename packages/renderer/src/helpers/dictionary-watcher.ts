import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { ReactUnity } from '../models/generated';

export interface DictionaryWatcher<T = Record<string, any>> {
  /** React Context that provides the value */
  context: React.Context<T>;

  /**
   * The provider component that should be used to wrap the components where this context will be used
   *
   * Usage:
   *
   * ```tsx
   * <watcher.Provider>
   *   <App />
   * </watcher.Provider>
   * ```
   */
  Provider: (props: { children?: React.ReactNode }) => React.FunctionComponentElement<React.ProviderProps<T>>;

  /**
   * React Hook for getting the value from Context
   *
   *  Usage:
   *
   * ```tsx
   * function App() {
   *   const values = watcher.useContext();
   *   ...
   * }
   * ```
   */
  useContext: () => T;

  /**
   * React Hook for getting the value of this Dictionary. This one will subscribe only to the properties that are accessed.
   *
   *  Usage:
   *
   * ```tsx
   * function App() {
   *   const { a, b } = watcher.useValue();
   *   ...
   * }
   * ```
   */
  useValue: (subscribeToAllFields?: boolean, isEqual?: IsEqual) => T;

  /**
   * React Hook for getting a partial value from Context
   *
   *  Usage:
   *
   * ```tsx
   * function App() {
   *   const count = watcher.useSelector(st => st.count);
   *   ...
   * }
   * ```
   */
  useSelector<Res>(selector: (store: T) => Res, isEqual?: IsEqual<Res>): Res
}

type Prop = (string | symbol | number);
type IsEqual<T = any> = (a: T, b: T) => boolean;

/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */
export function createDictionaryWatcher<
  ValueType = any,
  RecordType = Record<string, ValueType>
>(
  dictionary: ReactUnity.Helpers.WatchableRecord<ValueType>,
  displayName?: string,
): DictionaryWatcher<RecordType> {
  const ctx = createContext<RecordType>(undefined);
  if (displayName) ctx.displayName = displayName;


  const createSubscriber = (fields?: Set<Prop>, isEqual?: IsEqual) => {
    let snapshot: RecordType = ({ ...dictionary }) as any;

    return {
      subscribe: (onStoreChange: () => void) => {
        snapshot = ({ ...dictionary }) as any;

        const remove = dictionary?.AddListener(() => {
          const prev = snapshot;
          snapshot = ({ ...dictionary }) as any;

          if (!fields) onStoreChange();
          else {
            for (var it = fields.values(), field = null; field = it.next().value;) {
              if (isEqual ? !isEqual(prev[field], snapshot[field]) : (prev[field] !== snapshot[field])) {
                onStoreChange();
                break;
              }
            }
          }
        });

        if (!remove) {
          if (displayName) console.warn(`${displayName} dictionary does not provide a change listener`);
          else console.warn('The dictionary does not provide a change listener');
        }

        return () => remove?.();
      },
      getSnapshot: () => snapshot,
    };
  };

  const defaultSubscriber = createSubscriber();

  const Provider = function GlobalsProvider({ children }: { children?: React.ReactNode }) {
    const value: any = useSyncExternalStore(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot);
    return createElement(ctx.Provider, { value }, children);
  };

  function useDictionaryContext() {
    const context = useContext(ctx);
    if (context === undefined) {
      if (displayName) throw new Error(`${displayName}.useContext must be used within a ${displayName}.Provider`);
      else throw new Error('useContext must be used within a provider');
    }
    return context;
  }

  function useValue(subscribeToAllFields = false, fieldEqual?: IsEqual) {
    const fields = useMemo(() => new Set<Prop>(), []);
    const [allFieldsSubscribed, setAllFieldsSubscribed] = useState(false);
    subscribeToAllFields ||= allFieldsSubscribed;
    const subscriber = useMemo(() => subscribeToAllFields ? defaultSubscriber : createSubscriber(fields, fieldEqual), [subscribeToAllFields, fieldEqual]);
    const value: any = useSyncExternalStore(subscriber.subscribe, subscriber.getSnapshot, subscriber.getSnapshot);

    const proxy = new Proxy(value, {
      get(target, p, receiver) {
        fields.add(p);
        return value[p];
      },
      ownKeys(target) {
        if (!allFieldsSubscribed) setAllFieldsSubscribed(true);
        return Reflect.ownKeys(target);
      },
      getOwnPropertyDescriptor(target, p) {
        fields.add(p);

        return {
          ...Reflect.getOwnPropertyDescriptor(target, p),
          value: value[p],
        };
      }
    });

    return proxy as RecordType;
  }

  function useSelector<Res>(selector: (store: RecordType) => Res, isEqual?: IsEqual<Res>) {
    return useSyncExternalStoreWithSelector(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot, selector, isEqual);
  }

  return { context: ctx, Provider, useValue, useContext: useDictionaryContext, useSelector };
}
