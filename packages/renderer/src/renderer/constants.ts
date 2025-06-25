import { createContext } from 'react';
import { ContinuousEventPriority, DefaultEventPriority, DiscreteEventPriority, IdleEventPriority } from 'react-reconciler/constants';
import { PoolKey } from '../models/base';
import { CommonConfig, TransitionStatus } from '../models/renderer';
import { styleStringSymbol } from './diffing';

declare const process;

export const hideClass = 'react-unity__renderer__hidden';

export const eventPriorities = {
  discrete: DiscreteEventPriority,
  continuous: ContinuousEventPriority,
  default: DefaultEventPriority,
  idle: IdleEventPriority,
};

export const textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true,
};

export function stringizePoolKey(key: PoolKey) {
  switch (typeof key) {
    case 'string':
      return key;
    case 'boolean':
      return key ? 'default' : '';
    case 'number':
      return key.toString();
    case 'undefined':
      return null;
    default:
      return '';
  }
}

export function getAllowedProps(props, type) {
  const { children, tag, pool, ref, ...rest } = props;

  if (textTypes[type] && 'children' in props) {
    rest.children = !children || typeof children === 'boolean' ? null : Array.isArray(children) ? children.join('') : String(children);
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;

  return rest;
}

declare const queueMicrotask: (callback: (...args: any[]) => any) => void;

const HostTransitionContext = createContext<TransitionStatus>(null) as any;

const NoEventPriority = 0;
let currentUpdatePriority: number = NoEventPriority;

export const commonReconciler = {
  // -------------------
  //     Scheduling
  // -------------------

  noTimeout: -1 as const,
  scheduleTimeout: (callback, delay) => setTimeout(callback as any, delay),
  scheduleMicrotask:
    typeof queueMicrotask === 'function'
      ? queueMicrotask
      : (callback) =>
          Promise.resolve(null)
            .then(callback)
            .catch((error) =>
              setTimeout(() => {
                throw error;
              }, 0),
            ),
  cancelTimeout: (handle) => clearTimeout(handle),

  beforeActiveInstanceBlur() {},

  afterActiveInstanceBlur() {},

  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => undefined,
  getInstanceFromNode: () => undefined,

  // React 19

  setCurrentUpdatePriority: (newPriority: number) => (currentUpdatePriority = newPriority),
  getCurrentUpdatePriority: () => currentUpdatePriority,
  resolveUpdatePriority: () => currentUpdatePriority || UnityBridge.CurrentEventPriority || eventPriorities.default,
  maySuspendCommit: () => false,
  requestPostPaintCallback: () => {},
  preloadInstance: () => true,
  resetFormInstance: () => {},
  resolveEventTimeStamp: () => -1.1,
  resolveEventType: () => null,
  shouldAttemptEagerTransition: () => false,
  startSuspendingCommit: () => {},
  suspendInstance: () => {},
  trackSchedulerEvent: () => {},
  waitForCommitToBeReady: () => null,
  NotPendingTransition: null,
  HostTransitionContext,

  // Keep these for React 18 compatibility
  ...{
    now:
      typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? () => performance.now()
        : typeof Date !== 'undefined' && typeof Date.now === 'function'
          ? () => Date.now()
          : () => 0,
    getCurrentEventPriority: () => UnityBridge.CurrentEventPriority || eventPriorities.default,
  },
} satisfies Partial<CommonConfig>;

export const isDevelopment = process.env.NODE_ENV === 'development';
