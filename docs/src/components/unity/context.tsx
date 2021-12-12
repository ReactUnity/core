import React, { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import style from './index.module.scss';
import { Unity } from './instance';
import { defaultUnityInstanceName, UnityAPI } from './types';

export interface UnityContextType {
  instance?: UnityAPI;
  component: React.ReactElement | null;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  insertTo: (el: HTMLElement | undefined) => void;
  insertedTo?: HTMLElement;
  insertedToRef: MutableRefObject<HTMLElement | undefined>;
}

const UnityContext = React.createContext<UnityContextType>({
  component: null,
  setLoaded: () => null,
  insertTo: () => null,
  insertedToRef: { current: undefined },
});

export function GlobalUnityProvider(
  { children, instanceClassName = '', loadedId = defaultUnityInstanceName }:
    { children?: React.ReactNode, loadedId?: string, instanceClassName?: string }) {
  const [instance, setInstance] = React.useState<UnityAPI>();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [insertedTo, setInsertedTo] = React.useState<HTMLElement>();
  const insertedToRef = React.useRef<HTMLElement>();

  const component = React.useMemo(() => !loaded ? null :
    <Unity unityRef={setInstance} sampleName={loadedId} className={instanceClassName} />,
    [setInstance, instanceClassName, loadedId, loaded]);

  const container = React.useMemo<HTMLDivElement>(() => {
    const el = typeof document !== 'undefined' && document.createElement('div');
    if (el) el.className = style.globalUnityContainer;
    return el as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (!container) return;
    if (insertedTo) {
      insertedTo.appendChild(container);
      container.style.display = '';
    }
    else {
      container.style.display = 'none';
      document.body.appendChild(container);
    }
  }, [container, insertedTo]);

  const unityPortal = useMemo(() => !!container && !!component && createPortal(component, container, 'unity-instance'), [container, component]);

  const insertTo = useCallback((el?: HTMLElement) => {
    insertedToRef.current = el;
    setInsertedTo(el);
  }, [insertedToRef, setInsertedTo]);

  const value = useMemo(() =>
    ({ component, instance, insertedTo, insertTo, insertedToRef, setLoaded }),
    [component, instance, insertedTo, insertTo, insertedToRef, setLoaded]);

  return <>
    {unityPortal}
    <UnityContext.Provider value={value}>{children}</UnityContext.Provider>
  </>;
};

export function useGlobalUnity() {
  return React.useContext(UnityContext);
}
