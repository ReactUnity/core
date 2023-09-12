// Original file: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-event-system.ts

import { useEffect, useRef } from 'react';
import { errorMessages } from './error-messages';
import { EventCallback, EventSystemHook, ReactUnityEventParameter } from './types';

type EventListener = {
  eventName: string;
  callback: EventCallback;
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

if (typeof globalThis !== 'undefined' || typeof window !== 'undefined') {
  (globalThis || window).dispatchReactUnityEvent = dispatchReactUnityEvent;
}

export const createEventSystem = (): EventSystemHook => {
  let eventListeners: EventListener[] = [];

  const addEventListener =
    (
      eventName: string,
      callback: EventCallback
    ) => {
      eventListeners = [
        ...eventListeners,
        { eventName, callback },
      ];
    };

  const removeEventListener =
    (
      eventName: string,
      callback?: EventCallback
    ) => {
      eventListeners = eventListeners.filter(
        (eventListener) => !(
          eventListener.eventName === eventName &&
          (!callback || eventListener.callback === callback)
        ));
    };

  const removeAllEventListeners =
    () => {
      eventListeners = [];
    };

  const dispatchEvent =
    (
      eventName: string,
      ...parameters: ReactUnityEventParameter[]
    ): ReactUnityEventParameter => {
      const eventListener = eventListeners.find(
        (eventListener) => eventListener.eventName === eventName
      );
      if (typeof eventListener === 'undefined') {
        console.warn(errorMessages.noEventListener, { eventName });
        return;
      }
      return eventListener.callback(...parameters);
    };

  const onMount = () => {
    mountedEventDispatchers.push(dispatchEvent);
    return () => {
      mountedEventDispatchers.splice(
        mountedEventDispatchers.indexOf(dispatchEvent),
        1
      );
    };
  };

  return {
    on: addEventListener,
    addEventListener,
    removeEventListener,
    dispatchEvent,
    removeAllEventListeners,
    onMount,
  };
};

export const useEventSystem = () => {
  const ref = useRef<EventSystemHook>();
  if (!ref.current) {
    ref.current = createEventSystem();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(ref.current.onMount, []);

  return ref.current;
};
