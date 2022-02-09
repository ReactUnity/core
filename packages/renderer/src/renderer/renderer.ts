import * as React from 'react';
import { createElement } from 'react';
import * as Reconciler from 'react-reconciler';
import {
  ChildSet, HostContext, HydratableInstance, InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance,
  NoTimeout, Props, PublicInstance, SuspenseInstance, TimeoutHandle, UpdatePayload
} from '../models/renderer';
import { DefaultView } from '../views/default-view';
import { diffProperties, styleStringSymbol } from './diffing';

const LegacyRoot = 1;
const ConcurrentRoot = 1;

const hostContext = {};
const childContext = {};
const DiscreteEventPriority = 0b00001;
const ContinuousEventPriority = 0b00100;
const DefaultEventPriority = 0b10000;

const eventPriorities = {
  discrete: DiscreteEventPriority,
  continuous: ContinuousEventPriority,
  default: DefaultEventPriority,
};

const textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true,
};

type Config = Reconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

function getAllowedProps(props, type) {
  const { children, tag, ...rest } = props;

  if (textTypes[type]) {
    rest.children = (!children || typeof children === 'boolean') ? null : Array.isArray(children) ? children.join('') : children + '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;

  return rest;
}

const hostConfig: Config & { [key: string]: any } = {
  getRootHostContext: () => hostContext,
  getChildHostContext: () => childContext,
  getPublicInstance: (instance: NativeInstance | NativeTextInstance) => instance,

  now: Date.now,

  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: false,
  supportsTestSelectors: false,

  isPrimaryRenderer: true,
  warnsIfNotActing: true,

  prepareForCommit: () => null,
  resetAfterCommit: () => { },
  clearContainer: () => { },
  shouldDeprioritizeSubtree: () => false,

  createInstance(type, props, rootContainerInstance) {
    const aProps = getAllowedProps(props, type);
    const children = aProps.children || null;
    delete aProps.children;
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps);
  },

  createTextInstance(text, rootContainerInstance) {
    return UnityBridge.createText(text, rootContainerInstance);
  },

  appendInitialChild(parent, child) { UnityBridge.appendChild(parent, child); },
  finalizeInitialChildren: () => false,
  commitMount: () => { },
  shouldSetTextContent(type) { return textTypes[type]; },

  // -------------------
  //     Mutation
  // -------------------

  prepareUpdate(instance, type, oldProps, newProps) {
    return diffProperties(oldProps, newProps) as any;
  },

  commitUpdate(instance, updatePayload, type) {
    UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
  },

  resetTextContent: () => console.log('resetTextContent'),

  commitTextUpdate(textInstance, oldText, newText) { UnityBridge.setText(textInstance, newText); },

  appendChild(parent, child) { return UnityBridge.appendChild(parent, child); },
  appendChildToContainer(parent, child) { return UnityBridge.appendChildToContainer(parent, child); },
  insertBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  insertInContainerBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  removeChild(parent, child) { return UnityBridge.removeChild(parent, child); },
  removeChildFromContainer(parent, child) { return UnityBridge.removeChild(parent, child); },

  // Required for Suspense
  // TODO: implement

  preparePortalMount: () => { },
  hideInstance: () => { },
  hideTextInstance: () => { },
  unhideInstance: () => { },
  unhideTextInstance: () => { },
  detachDeletedInstance: () => { },

  // -------------------
  //     Scheduling
  // -------------------

  getCurrentEventPriority: () => eventPriorities.default,

  noTimeout: -1,
  scheduleTimeout: (callback, timeout) => setTimeout(callback as any, timeout),
  cancelTimeout: (handle) => clearTimeout(handle),
};

const reconciler = Reconciler(hostConfig);

const containerMap = new Map<NativeContainerInstance, any>();

export const Renderer = {
  render(
    element: React.ReactNode,
    hostContainer?: NativeContainerInstance,
    renderWithoutHelpers?: boolean,
  ) {
    if (!hostContainer) hostContainer = HostContainer;

    let hostRoot = containerMap.get(hostContainer);
    if (!hostRoot) {
      hostRoot = reconciler.createContainer(hostContainer, LegacyRoot, false, null)
      containerMap.set(hostContainer, hostRoot);
    }

    if (!renderWithoutHelpers) element = createElement(DefaultView, null, element);

    reconciler.updateContainer(element, hostRoot, null);
  },
};

export const batchedUpdates = reconciler.batchedUpdates;
export const flushSync = reconciler.flushSync;
