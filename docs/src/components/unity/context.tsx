import React, { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import style from './index.module.scss';
import { Unity } from './instance';
import { defaultUnityInstanceName, UnityAPI } from './types';

export interface UnityContextType {
  instance?: UnityAPI;
  component: React.ReactElement | null;
  loadedId?: string;
  loadUnity: (id?: string, className?: string) => void;
  unloadUnity: () => void;
  insertTo: (el: HTMLElement | undefined) => void;
  insertedTo?: HTMLElement;
  insertedToRef: MutableRefObject<HTMLElement | undefined>;
}

const UnityContext = React.createContext<UnityContextType>({
  component: null,
  loadUnity: () => null,
  unloadUnity: () => null,
  insertTo: () => null,
  insertedToRef: { current: undefined },
});

export function GlobalUnityProvider({ children }: { children?: React.ReactNode }) {
  const [loadedId, setLoadedId] = React.useState<string | undefined>();
  const [className, setClassName] = React.useState<string | undefined>();
  const [instance, setInstance] = React.useState<UnityAPI>();
  const [insertedTo, setInsertedTo] = React.useState<HTMLElement>();
  const insertedToRef = React.useRef<HTMLElement>();

  const loadUnity = useCallback((id?: string, className?: string) => {
    setLoadedId(id || defaultUnityInstanceName);
    setClassName(className);
  }, [setLoadedId, setClassName]);

  const unloadUnity = useCallback(() => {
    setLoadedId(undefined);
    setClassName(undefined);
  }, [setLoadedId, setClassName]);

  const component = React.useMemo(() => loadedId == null ? null :
    <Unity unityRef={setInstance} sampleName={loadedId} className={className} />,
    [setInstance, loadedId, className]);


  const container = React.useMemo<HTMLDivElement>(() => {
    const el = typeof document !== 'undefined' && document.createElement('div');
    if (el) el.className = style.globalUnityContainer;
    return el as HTMLDivElement;
  }, []);

  useEffect(() => {
    return () => container?.remove();
  }, [container]);

  useEffect(() => {
    if (!container) return;
    if (insertedTo) insertedTo.appendChild(container);
    else container.remove();

    return () => container.remove();
  }, [container, insertedTo]);

  const unityPortal = !!container && createPortal(component, container, 'unity-instance');

  const insertTo = useCallback((el?: HTMLElement) => {
    insertedToRef.current = el;
    setInsertedTo(el);
  }, [insertedToRef, setInsertedTo]);

  const value = useMemo(() =>
    ({ loadedId, component, instance, loadUnity, unloadUnity, insertedTo, insertTo, insertedToRef }),
    [loadedId, component, instance, loadUnity, unloadUnity, insertedTo, insertTo, insertedToRef]);

  return <>
    {unityPortal}
    <UnityContext.Provider value={value}>{children}</UnityContext.Provider>
  </>;
};

export function useGlobalUnity() {
  return React.useContext(UnityContext);
}
