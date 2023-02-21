// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-event-system.ts

import { useCallback, useEffect, useRef } from "react";
import { errorMessages } from './error-messages';

type ReactUnityEventParameter = string | number | undefined;
type Callback = (...parameters: ReactUnityEventParameter[]) => ReactUnityEventParameter;

type EventListener = {
  eventName: string;
  callback: Callback;
};

export type EventSystemHook = {
  readonly on: (eventName: string, callback: Callback) => void;
  readonly addEventListener: (eventName: string, callback: Callback) => void;
  readonly removeEventListener: (eventName: string, callback?: Callback) => void;
  readonly removeAllEventListeners: () => void;
  readonly dispatchEvent: (eventName: string, ...parameters: any) => void;
};

const mountedEventDispatchers: ((
  eventName: string,
  ...parameters: ReactUnityEventParameter[]
) => ReactUnityEventParameter)[] = [];

const dispatchReactUnityEvent = (
  eventName: string,
  ...parameters: ReactUnityEventParameter[]
): ReactUnityEventParameter => {
  let returnValue: ReactUnityEventParameter = undefined;
  mountedEventDispatchers.forEach((dispatchEvent) => {
    returnValue = dispatchEvent(eventName, ...parameters);
  });
  return returnValue;
};

declare var window;

if (typeof globalThis !== "undefined" || typeof window !== "undefined") {
  (globalThis || window).dispatchReactUnityEvent = dispatchReactUnityEvent;
}

const useEventSystem = (): EventSystemHook => {
  const eventListeners = useRef<EventListener[]>([]);

  const addEventListener = useCallback(
    (
      eventName: string,
      callback: Callback
    ) => {
      eventListeners.current = [
        ...eventListeners.current,
        { eventName, callback },
      ];
    },
    [eventListeners]
  );

  const removeEventListener = useCallback(
    (
      eventName: string,
      callback?: Callback
    ) => {
      eventListeners.current = eventListeners.current.filter(
        (eventListener) => !(
          eventListener.eventName === eventName &&
          (!callback || eventListener.callback === callback)
        ));
    },
    [eventListeners]
  );

  const removeAllEventListeners = useCallback(
    () => {
      eventListeners.current = [];
    },
    [eventListeners]
  );

  const dispatchEvent = useCallback(
    (
      eventName: string,
      ...parameters: ReactUnityEventParameter[]
    ): ReactUnityEventParameter => {
      const eventListener = eventListeners.current.find(
        (eventListener) => eventListener.eventName === eventName
      );
      if (typeof eventListener === "undefined") {
        console.warn(errorMessages.noEventListener, { eventName });
        return;
      }
      return eventListener.callback(...parameters);
    },
    [eventListeners]
  );

  useEffect(() => {
    mountedEventDispatchers.push(dispatchEvent);
    return () => {
      mountedEventDispatchers.splice(
        mountedEventDispatchers.indexOf(dispatchEvent),
        1
      );
    };
  }, [dispatchEvent]);

  return {
    on: addEventListener,
    addEventListener,
    removeEventListener,
    dispatchEvent,
    removeAllEventListeners,
  };
};

export { useEventSystem };
