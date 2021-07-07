import * as React from 'react';
import { ReactUnity } from '../../models/generated';

export function createEventDictionaryContext<ValueType = any, RecordType = Record<string, ValueType>>
  (dictionary: ReactUnity.Helpers.EventDictionary<ValueType>, name?: string) {
  const ctx = React.createContext<RecordType>(undefined);

  function Provider({ children }) {
    const [render, setRender] = React.useState(0);

    React.useEffect(() => {
      const remove = dictionary?.AddListener((key, value, dic) => {
        setRender(x => x + 1);
      });

      if (!remove) {
        if (name) console.warn(`${name} dictionary does not provide a change listener`);
        else console.warn('The dictionary does not provide a change listener');
      }

      return () => remove?.();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value: any = React.useMemo(() => ({ ...dictionary }), [render]);

    return React.createElement(ctx.Provider, { value }, children);
  }

  function useContext() {
    const context = React.useContext(ctx);
    if (context === undefined) {
      if (name) throw new Error(`${name}.useContext must be used within a ${name}.Provider`);
      else throw new Error('useContext must be used within a provider');
    }
    return context;
  }

  return { ...ctx, Provider, useContext };
}

export const globalsContext = createEventDictionaryContext<any, DefaultGlobals>(Globals as ReactUnity.Helpers.EventDictionary<any>, 'globalsContext');
export const useGlobals = globalsContext.useContext;
export const GlobalsProvider = globalsContext.Provider;
