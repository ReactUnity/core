import { UnityConfig } from 'react-unity-webgl';
import { UnityInstance } from 'react-unity-webgl/declarations/unity-instance';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';

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

export type UnityContextType = UnityContextHook & EventSystemHook & {
  unityConfig: UnityConfig;
  unityInstance: UnityInstance | null;
  htmlCanvasElement: any | undefined | null;
  send: (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void;
  setFullscreen: (enabled: boolean) => void;
  quitUnityInstance: () => Promise<void>;
};

