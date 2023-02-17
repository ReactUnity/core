// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-unity-context.ts

import { useCallback, useEffect, useRef, useState } from "react";
import type { UnityConfig } from "react-unity-webgl";
import type { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";
import type { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import type { UnityInstance } from "react-unity-webgl/typings/unity-instance";
import { errorMessages } from './error-messages';
import { useEventSystem } from "./use-event-system";

type ReactUnityEventParameter = string | number | undefined;

const useUnityContext = (unityConfig: UnityConfig): UnityContextHook => {
  const [unityInstance, setUnityInstance] = useState<UnityInstance | null>(typeof ReactUnityWebGLCompat !== 'undefined' ? ReactUnityWebGLCompat : null);
  const [loadingProgression, setLoadingProgression] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  const [initialisationError, setInitialisationError] =
    useState<Error | null>(null);
  const eventSystem = useEventSystem();
  const unityProvider = useRef<UnityProvider>({
    setLoadingProgression,
    setInitialisationError,
    setUnityInstance,
    setIsLoaded,
    unityConfig,
  });

  const requestFullscreen = useCallback(
    (enabled: boolean) => {
      if (unityInstance === null) {
        console.warn(errorMessages.requestFullscreenNoUnityInstance);
        return;
      }
      unityInstance.SetFullscreen(enabled === true ? 1 : 0);
    },
    [unityInstance]
  );

  const requestPointerLock = useCallback(() => {
    if (
      unityInstance === null ||
      typeof unityInstance.Module.canvas === "undefined"
    ) {
      console.warn(errorMessages.requestPointerLockNoUnityInstanceOrCanvas);
      return;
    }
    return unityInstance.Module.canvas.requestPointerLock();
  }, [unityInstance]);

  const sendMessage = useCallback(
    (
      gameObjectName: string,
      methodName: string,
      parameter?: ReactUnityEventParameter
    ) => {
      if (unityInstance === null) {
        console.warn(errorMessages.sendMessageNoUnityInstance);
        return;
      }
      unityInstance.SendMessage(gameObjectName, methodName, parameter);
    },
    [unityInstance]
  );

  const takeScreenshot = useCallback(
    (dataType?: string, quality?: number): string | undefined => {
      if (
        unityInstance === null ||
        typeof unityInstance.Module.canvas === "undefined"
      ) {
        console.warn(errorMessages.screenshotNoUnityInstanceOrCanvas);
        return;
      }
      return unityInstance.Module.canvas.toDataURL(dataType, quality);
    },
    [unityInstance]
  );

  const unload = useCallback(
    (): Promise<void> => {
      if (unityInstance === null) {
        console.warn(errorMessages.quitNoUnityInstance);
        return Promise.reject();
      }
      return unityInstance.Quit();
    },
    [unityInstance]
  );

  useEffect(() => {
    setIsLoaded(loadingProgression === 1);
  }, [loadingProgression]);

  return {
    unityProvider: unityProvider.current,
    loadingProgression,
    initialisationError,
    isLoaded,
    UNSAFE__detachAndUnloadImmediate: () => Promise.resolve(),
    UNSAFE__unityInstance: unityInstance,
    requestFullscreen,
    requestPointerLock,
    sendMessage,
    unload,
    takeScreenshot,
    addEventListener: eventSystem.addEventListener,
    removeEventListener: eventSystem.removeEventListener,
  };
};

export { useUnityContext };
