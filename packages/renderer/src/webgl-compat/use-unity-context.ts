// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-unity-context.ts

import { useEffect, useRef } from 'react';
import type { UnityConfig } from 'react-unity-webgl';
import type { UnityInstance } from 'react-unity-webgl/declarations/unity-instance';
import { UnityProvider } from 'react-unity-webgl/distribution/types/unity-provider';
import { errorMessages } from './error-messages';
import { EventCallback, ReactUnityEventParameter, UnityContextType } from './types';
import { createEventSystem } from './use-event-system';

const createUnityContext = (unityConfig: UnityConfig): UnityContextType => {
  let unityInstance: UnityInstance | null = typeof ReactUnityWebGLCompat !== 'undefined' ? ReactUnityWebGLCompat : null;
  const setUnityInstance = (instance: UnityInstance | null) => (unityInstance = instance);

  let loadingProgression = 1;
  const setLoadingProgression = (progression: number) => (loadingProgression = progression);

  let isLoaded = loadingProgression === 1;
  const setIsLoaded = (loaded: boolean) => {
    isLoaded = loaded;
    if (loaded) setLoadingProgression(1);
  };

  let initialisationError: Error | null = null;
  const setInitialisationError = (error: Error | null) => (initialisationError = error);

  const eventSystem = createEventSystem();
  const unityProvider = {
    setLoadingProgression,
    setInitialisationError,
    setUnityInstance,
    setIsLoaded,
    unityConfig,
  };

  const requestFullscreen = (enabled: boolean) => {
    if (unityInstance === null) {
      console.warn(errorMessages.requestFullscreenNoUnityInstance);
      return;
    }
    unityInstance.SetFullscreen(enabled === true ? 1 : 0);
  };

  const requestPointerLock = () => {
    if (unityInstance === null || typeof unityInstance.Module.canvas === 'undefined') {
      console.warn(errorMessages.requestPointerLockNoUnityInstanceOrCanvas);
      return;
    }
    return unityInstance.Module.canvas.requestPointerLock();
  };

  const sendMessage = (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => {
    if (unityInstance === null) {
      console.warn(errorMessages.sendMessageNoUnityInstance);
      return;
    }
    unityInstance.SendMessage(gameObjectName, methodName, parameter);
  };

  const takeScreenshot = (dataType?: string, quality?: number): string | undefined => {
    if (unityInstance === null || typeof unityInstance.Module.canvas === 'undefined') {
      console.warn(errorMessages.screenshotNoUnityInstanceOrCanvas);
      return;
    }
    return unityInstance.Module.canvas.toDataURL(dataType, quality);
  };

  const unload = (): Promise<void> => {
    if (unityInstance === null) {
      console.warn(errorMessages.quitNoUnityInstance);
      return Promise.reject();
    }
    return unityInstance.Quit();
  };

  return {
    unityProvider,
    htmlCanvasElement: unityInstance?.Module?.canvas,
    loadingProgression,
    initialisationError,
    isLoaded,
    unityInstance,
    UNSAFE__unityInstance: unityInstance,
    setFullscreen: requestFullscreen,
    requestFullscreen,
    requestPointerLock,
    sendMessage,
    unload,
    takeScreenshot,
    quitUnityInstance: unload,
    UNSAFE__detachAndUnloadImmediate: unload,
    send: sendMessage,
    unityConfig,
    ...eventSystem,
  };
};

export const useUnityContext = (unityConfig: UnityConfig) => {
  const ref = useRef<UnityContextType>();
  if (!ref.current) {
    ref.current = createUnityContext(unityConfig);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(ref.current.onMount, []);

  return ref.current;
};

export class UnityContext implements UnityContextType {
  constructor(unityConfig: UnityConfig) {
    Object.assign(this, createUnityContext(unityConfig));
  }

  addEventListener: ((eventName: string, callback: (...parameters: ReactUnityEventParameter[]) => ReactUnityEventParameter) => void) &
    ((eventName: string, callback: EventCallback) => void);
  removeEventListener: ((eventName: string, callback: (...parameters: ReactUnityEventParameter[]) => ReactUnityEventParameter) => void) &
    ((eventName: string, callback?: EventCallback) => void);
  unityProvider: UnityProvider;
  loadingProgression: number;
  isLoaded: boolean;
  initialisationError: Error;
  UNSAFE__unityInstance: UnityInstance;
  requestFullscreen: (enabled: boolean) => void;
  sendMessage: (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void;
  takeScreenshot: (dataType?: string, quality?: number) => string;
  requestPointerLock: () => void;
  unload: () => Promise<void>;
  UNSAFE__detachAndUnloadImmediate: () => Promise<void>;
  on: (eventName: string, callback: EventCallback) => void;
  removeAllEventListeners: () => void;
  dispatchEvent: (eventName: string, ...parameters: any) => void;
  onMount: () => () => void;
  unityConfig: UnityConfig;
  unityInstance: UnityInstance;
  htmlCanvasElement: any;
  send: (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void;
  setFullscreen: (enabled: boolean) => void;
  quitUnityInstance: () => Promise<void>;
}
