import type * as React from 'react';
import { createElement } from 'react';
import * as Reconciler from 'react-reconciler';
import {
  ChildSet, HostContext, HydratableInstance, InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance,
  NoTimeout, Props, PublicInstance, SuspenseInstance, TimeoutHandle, UpdatePayload
} from '../models/renderer';
import { DefaultView } from '../views/default-view';
import { diffProperties, styleStringSymbol } from './diffing';

const hostContext = {};
const childContext = {};

const textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true,
};

type Config = Reconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

function getAllowedProps(props, type) {
  const { children, tag, ref, key, ...rest } = props;

  if (textTypes[type]) {
    rest.children = Array.isArray(children) ? children.join('') : children?.toString() || '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;

  return rest;
}

const hostConfig: Config & { clearContainer: () => void } & { [key: string]: any } = {
  getRootHostContext(rootContainerInstance) { return hostContext; },
  getChildHostContext(parentHostContext, type, rootContainerInstance) { return childContext; },
  getPublicInstance(instance: NativeInstance | NativeTextInstance) { return instance; },
  prepareForCommit(containerInfo) { return null; },
  resetAfterCommit(containerInfo) { return null; },
  clearContainer() { return null; },
  now: Date.now,
  supportsHydration: false,
  supportsPersistence: false,
  isPrimaryRenderer: true,

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    if (textTypes[type]) {
      const rprops = getAllowedProps(props, type);
      return UnityBridge.createElement(type, rprops.children, rootContainerInstance, rprops);
    }

    return UnityBridge.createElement(props.tag || type, null, rootContainerInstance, getAllowedProps(props, type));
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return UnityBridge.createText(text, rootContainerInstance);
  },

  appendInitialChild(parent, child) { UnityBridge.appendChild(parent, child); },

  finalizeInitialChildren(
    instance,
    type,
    props,
    rootContainerInstance,
    hostContext,
  ) {
    return false;
  },

  commitMount(instance, type, newProps, internalInstanceHandle) { },

  shouldSetTextContent(type, props) { return textTypes[type]; },

  shouldDeprioritizeSubtree(type, props) { return false; },

  // -------------------
  //     Mutation
  // -------------------

  supportsMutation: true,

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext,
  ) {
    return diffProperties(oldProps, newProps) as any;
  },

  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle,
  ) {
    UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
  },

  resetTextContent(instance) { console.log('resetTextContent'); },

  commitTextUpdate(textInstance, oldText, newText) { UnityBridge.setText(textInstance, newText); },

  appendChild(parent, child) { return UnityBridge.appendChild(parent, child); },
  appendChildToContainer(parent, child) { return UnityBridge.appendChildToContainer(parent, child); },
  insertBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  insertInContainerBefore(parent, child, beforeChild) { return UnityBridge.insertBefore(parent, child, beforeChild); },
  removeChild(parent, child) { return UnityBridge.removeChild(parent, child); },
  removeChildFromContainer(parent, child) { return UnityBridge.removeChild(parent, child); },

  // Required for Suspense
  // TODO: implement

  preparePortalMount() { },

  hideInstance(instance) {
  },

  hideTextInstance(textInstance) {
  },

  unhideInstance(instance, props) {
  },

  unhideTextInstance(textInstance, text) {
  },

  // -------------------
  //     Scheduling
  // -------------------

  scheduleDeferredCallback(callback, options) { return setTimeout(callback, options?.timeout || 0); },
  cancelDeferredCallback(callBackID) { clearTimeout(callBackID); },

  noTimeout: -1,
  scheduleTimeout(callback, timeout) { return setTimeout(callback as any, timeout); },
  cancelTimeout(handle) { clearTimeout(handle); },
  queueMicrotask(callback) { return setTimeout(callback as any, 0); },
};

const ReactUnityReconciler = Reconciler(hostConfig);

export const Renderer = {
  render(
    element: React.ReactNode,
    hostContainer?: NativeContainerInstance,
    renderWithoutHelpers?: boolean,
  ): number {
    if (!hostContainer) hostContainer = HostContainer;
    const hostRoot = ReactUnityReconciler.createContainer(hostContainer, 0, false, {});

    if (!renderWithoutHelpers) element = createElement(DefaultView, null, element);
    return ReactUnityReconciler.updateContainer(element, hostRoot, null);
  },
};
