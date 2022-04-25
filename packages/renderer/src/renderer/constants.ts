import * as Reconciler from 'react-reconciler';
import { NoTimeout, TimeoutHandle } from '../models/renderer';
import { styleStringSymbol } from './diffing';

export const hideClass = 'react-unity__renderer__hidden';

const DiscreteEventPriority = 0b00001;
const ContinuousEventPriority = 0b00100;
const DefaultEventPriority = 0b10000;
const IdleEventPriority = 0b0100000000000000000000000000000;
export const LegacyRoot = 0;
export const ConcurrentRoot = 1;

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

export function getAllowedProps(props, type) {
  const { children, tag, ...rest } = props;

  if (textTypes[type] && 'children' in props) {
    rest.children = (!children || typeof children === 'boolean') ? null : Array.isArray(children) ? children.join('') : children + '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;

  return rest;
}

declare const queueMicrotask: (callback: ((...args: any[]) => any)) => void;


type CommonConfig = Reconciler.HostConfig<unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, TimeoutHandle, NoTimeout>;

export const commonReconciler = {
  // -------------------
  //     Scheduling
  // -------------------

  now: Date.now,
  getCurrentEventPriority: () => eventPriorities.discrete,

  noTimeout: -1 as const,
  scheduleTimeout: (callback, delay) => setTimeout(callback as any, delay),
  scheduleMicrotask: typeof queueMicrotask === 'function' ? queueMicrotask :
    callback => Promise.resolve(null).then(callback)
      .catch((error) => setTimeout(() => { throw error; }, 0)),
  cancelTimeout: (handle) => clearTimeout(handle),
};
