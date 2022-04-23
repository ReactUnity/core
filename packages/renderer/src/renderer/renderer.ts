import * as React from 'react';
import { createElement } from 'react';
import * as Reconciler from 'react-reconciler';
import {
  ChildSet, HostContext, HydratableInstance, InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance,
  NoTimeout, Props, PublicInstance, SuspenseInstance, TimeoutHandle, UpdatePayload
} from '../models/renderer';
import { DefaultView } from '../views/default-view';
import { ConcurrentRoot, eventPriorities, getAllowedProps, hideClass, LegacyRoot, textTypes } from './constants';
import { diffProperties } from './diffing';

declare const queueMicrotask: (callback: ((...args: any[]) => any)) => void;

type Config = Reconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

const hostContext = {};
const childContext = {};

const hostConfig: Config & { [key: string]: any } = {
  getRootHostContext: () => hostContext,
  getChildHostContext: () => childContext,
  getPublicInstance: (instance: NativeInstance | NativeTextInstance) => instance,

  now: Date.now,

  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: true,
  supportsTestSelectors: false,

  isPrimaryRenderer: true,
  warnsIfNotActing: true,

  prepareForCommit: () => null,
  resetAfterCommit: () => { },
  clearContainer: (container) => UnityBridge.clearContainer(container),
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


  commitTextUpdate(textInstance, oldText, newText) { UnityBridge.setText(textInstance, newText); },

  appendChild(parent, child) { return UnityBridge.appendChild(parent, child); },
  appendChildToContainer(parent, child) { return UnityBridge.appendChildToContainer(parent, child); },
  insertBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  insertInContainerBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  removeChild(parent, child) { return UnityBridge.removeChild(parent, child); },
  removeChildFromContainer(parent, child) { return UnityBridge.removeChild(parent, child); },

  resetTextContent: () => { },
  preparePortalMount: () => { },
  detachDeletedInstance: () => { },

  // Required for Suspense

  hideInstance: (instance) => { instance.ClassList.Add(hideClass); },
  hideTextInstance: (instance) => { instance.ClassList.Add(hideClass); },
  unhideInstance: (instance) => { instance.ClassList.Remove(hideClass); },
  unhideTextInstance: (instance) => { instance.ClassList.Remove(hideClass); },

  // -------------------
  //     Scheduling
  // -------------------

  getCurrentEventPriority: () => eventPriorities.discrete,

  noTimeout: -1,
  scheduleTimeout: (callback, delay) => setTimeout(callback as any, delay),
  scheduleMicrotask: typeof queueMicrotask === 'function' ? queueMicrotask :
    callback => Promise.resolve(null).then(callback)
      .catch((error) => setTimeout(() => { throw error; }, 0)),
  cancelTimeout: (handle) => clearTimeout(handle),
};

const reconciler = Reconciler(hostConfig);

const containerMap = new Map<NativeContainerInstance, any>();

interface RenderOptions {
  /* Unity element to render React on. It is the element `ReactUnityUGUI` is attached to by default. */
  hostContainer?: NativeContainerInstance;

  /* Skips rendering some useful wrappers like `ErrorBoundary` and `GlobalsProvider`. */
  disableHelpers?: boolean;

  /* Allows rendering in `legacy` mode if needed. The default rendering mode is `concurrent`. */
  mode?: 'legacy' | 'concurrent';
}

export const Renderer = {
  render(
    element: React.ReactNode,
    options: RenderOptions = {},
  ) {
    const rc = reconciler;
    const hostContainer = options?.hostContainer || HostContainer;

    let hostRoot = containerMap.get(hostContainer);
    if (!hostRoot) {
      hostRoot = rc.createContainer(hostContainer, options?.mode === 'legacy' ? LegacyRoot : ConcurrentRoot, false, null)
      containerMap.set(hostContainer, hostRoot);
    }

    if (!options?.disableHelpers) element = createElement(DefaultView, null, element);

    rc.updateContainer(element, hostRoot, null);
  },
};

export const batchedUpdates = reconciler.batchedUpdates;
export const flushSync = reconciler.flushSync;
