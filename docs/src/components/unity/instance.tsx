import cn from 'classnames';
import { type Ref, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './index.module.scss';
import {
  defaultUnityInstanceName,
  isLoaderScriptLoaded,
  type UnityAPI,
  type UnityInstance,
} from './types';

const LOADER_SRC = '/Unity/injectable/Build/WebInjectable.loader.js';

/*
 * Unity's loader is a plain script that defines a global `createUnityInstance`, so it
 * cannot be imported -- the Next.js version dropped a <script> into next/head. Appending
 * it here keeps that lazy: the ~100 MB player is only fetched on pages where a code
 * example actually mounts, not on every page in the site.
 */
function ensureLoaderScript() {
  if (document.querySelector(`script[src="${LOADER_SRC}"]`)) return;
  const script = document.createElement('script');
  script.src = LOADER_SRC;
  script.async = true;
  document.head.appendChild(script);
}

interface Props {
  className?: string;
  sampleName?: string;
  innerRef?: Ref<HTMLDivElement>;
  unityRef?: (unityInstance: UnityAPI | undefined) => void;
}

export function Unity({
  className,
  sampleName = defaultUnityInstanceName,
  unityRef,
  innerRef,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(isLoaderScriptLoaded());
  const [unityInstance, setUnityInstance] = useState<UnityAPI>();

  const id = useMemo(
    () => `unity-canvas-ref-${Math.round(Math.random() * 10000)}`,
    []
  );

  const portal = useMemo(() => {
    return createPortal(
      <div style={{ width: 0, height: 0 }} id={id} />,
      document.body,
      id
    );
  }, [id]);

  const setCanvasRef = useCallback(
    async (canvas: HTMLCanvasElement | null) => {
      if (!canvas || !scriptLoaded) {
        return;
      }

      const unityInstance: UnityInstance = await global.createUnityInstance(
        canvas,
        {
          dataUrl: `/Unity/${sampleName}/Build/WebInjectable.data`,
          frameworkUrl: `/Unity/${sampleName}/Build/WebInjectable.framework.js`,
          codeUrl: `/Unity/${sampleName}/Build/WebInjectable.wasm`,
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'reactunity',
          productName: sampleName,
          productVersion: '0.1',
        },
        setProgress
      );

      setUnityInstance({
        SendMessage: unityInstance.SendMessage.bind(unityInstance),
        SetFullscreen: unityInstance.SetFullscreen.bind(unityInstance),
        Quit: unityInstance.Quit.bind(unityInstance),
        SetReactScript: (jsx, html, css) => {
          if (jsx) unityInstance.SendMessage('ReactCanvas', 'SetJSX', jsx);
          if (html) unityInstance.SendMessage('ReactCanvas', 'SetHTML', html);
          if (css) unityInstance.SendMessage('ReactCanvas', 'SetCSS', css);
          unityInstance.SendMessage('ReactCanvas', 'RenderBridge');
        },
        ReplaceCSS: (css) => {
          unityInstance.SendMessage('ReactCanvas', 'ReplaceCSS', css);
        },
        LoadScene: (sceneName) =>
          unityInstance.SendMessage('ReactCanvas', 'LoadScene', sceneName),
        ReloadScene: () =>
          unityInstance.SendMessage('ReactCanvas', 'ReloadScene'),
      });
    },
    [sampleName, scriptLoaded, setUnityInstance]
  );

  useEffect(() => {
    unityRef?.(unityInstance);
  }, [unityRef, unityInstance]);

  useEffect(() => {
    if (scriptLoaded) return;

    ensureLoaderScript();
    const interval = setInterval(() => {
      if (isLoaderScriptLoaded()) setScriptLoaded(true);
    }, 100);

    return () => clearInterval(interval);
  }, [scriptLoaded]);

  useEffect(() => {
    if (!unityInstance) return;

    return () => {
      // TODO: quit crashes the Unity after a few launches
      // unityInstance.Quit();
    };
  }, [unityInstance]);

  return (
    <>
      <div className={cn(className, style.host, 'unity')} ref={innerRef}>
        <canvas
          id={id}
          className={style.canvas}
          // Wrapped rather than passed directly: booting Unity is async, and React 19
          // reads a ref callback's return value as a cleanup function.
          ref={(canvas) => {
            void setCanvasRef(canvas);
          }}
          tabIndex={-1}
        />

        {progress < 1 && (
          <div className={style.progress}>
            <div className={style.spinner}></div>
            <div
              className={style.progressBar}
              style={{ paddingRight: (1 - progress) * 80 + '%' }}></div>
          </div>
        )}
      </div>

      {portal}
    </>
  );
}
