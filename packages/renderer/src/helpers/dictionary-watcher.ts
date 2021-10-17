import * as React from 'react';
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
}

/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */
export function createDictionaryWatcher<ValueType = any, RecordType = Record<string, ValueType>>
  (dictionary: ReactUnity.Helpers.WatchableRecord<ValueType>, displayName?: string): DictionaryWatcher<RecordType> {
  const ctx = React.createContext<RecordType>(undefined);
  if (displayName) ctx.displayName = displayName;

  const Provider = function Provider({ children }: { children?: React.ReactNode }) {
    const [render, setRender] = React.useState(0);

    React.useLayoutEffect(() => {
      const remove = dictionary?.AddListener((key, value, dic) => {
        setRender(x => x + 1);
      });

      if (!remove) {
        if (displayName) console.warn(`${displayName} dictionary does not provide a change listener`);
        else console.warn('The dictionary does not provide a change listener');
      }

      return () => remove?.();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value: any = React.useMemo(() => ({ ...dictionary }), [render]);

    return React.createElement(ctx.Provider, { value }, children);
  };

  function useContext() {
    const context = React.useContext(ctx);
    if (context === undefined) {
      if (displayName) throw new Error(`${displayName}.useContext must be used within a ${displayName}.Provider`);
      else throw new Error('useContext must be used within a provider');
    }
    return context;
  }

  return { context: ctx, Provider, useContext };
}

export const globalsWatcher = createDictionaryWatcher<any, DefaultGlobals>(Globals, 'globalsContext');
export const useGlobals = globalsWatcher.useContext;
export const GlobalsProvider = globalsWatcher.Provider;
