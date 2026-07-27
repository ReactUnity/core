import { UnityConfig, UnityInstance } from 'react-unity-webgl';
// react-unity-webgl 10 renamed UnityContextHook to UnityContext and stopped shipping
// declarations/unity-instance (UnityInstance is a root export now). The name is aliased
// because this package exports a class of its own called UnityContext.
import { UnityContext as UnityContextBase } from 'react-unity-webgl/distribution/types/unity-context';

export type ReactUnityEventParameter = string | number | boolean | null | undefined | void;

export type EventCallback = (...parameters: any[]) => ReactUnityEventParameter;

export type EventSystemHook = {
  readonly on: (eventName: string, callback: EventCallback) => void;
  readonly addEventListener: (eventName: string, callback: EventCallback) => void;
  readonly removeEventListener: (eventName: string, callback?: EventCallback) => void;
  readonly removeAllEventListeners: () => void;
  readonly dispatchEvent: (eventName: string, ...parameters: any) => void;
  readonly onMount: () => () => void;
};

export type UnityContextType = UnityContextBase &
  EventSystemHook & {
    unityConfig: UnityConfig;
    unityInstance: UnityInstance | null;
    htmlCanvasElement: any | undefined | null;
    send: (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void;
    setFullscreen: (enabled: boolean) => void;
    quitUnityInstance: () => Promise<void>;
    // react-unity-webgl 10 dropped this from UnityContext, but the shim has always provided
    // it -- like `send`, `setFullscreen` and `quitUnityInstance` above -- so it is declared
    // here to keep app code written against 9 compiling.
    UNSAFE__detachAndUnloadImmediate: () => Promise<void>;
  };
