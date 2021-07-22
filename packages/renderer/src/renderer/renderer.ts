import type * as React from 'react';
import * as Reconciler from 'react-reconciler';
import { ReactUnity } from '../../models/generated';
import {
  ChildSet, HostContext, HydratableInstance, InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance,
  NoTimeout, Props, PublicInstance, SuspenseInstance, TimeoutHandle, UpdatePayload
} from '../../models/renderer';
import { diffProperties, DiffResult } from './diffing';

const hostContext = {};
const childContext = {};

function applyDiffedUpdate(writeTo: ReactUnity.Helpers.WatchableDictionary<any>, updatePayload: DiffResult | Record<string, any>, depth = 0) {
  if (!updatePayload) return false;

  if (Array.isArray(updatePayload)) {

    for (let index = 0; index < updatePayload.length; index += 2) {
      const attr = updatePayload[index];
      const value = updatePayload[index + 1];
      if (depth > 0) applyDiffedUpdate(writeTo[attr], value, depth - 1);
      else writeTo.SetWithoutNotify(attr, value);
    }

    return updatePayload.length > 0;
  }
  else {
    for (const attr in updatePayload) {
      if (updatePayload.hasOwnProperty(attr)) {
        const value = updatePayload[attr];
        writeTo.SetWithoutNotify(attr, value);
      }
    }
    return true;
  }
}

function applyUpdate(instance: NativeInstance, updatePayload: DiffResult, isAfterMount: boolean, type?: string, pre = true) {
  let updateAfterMount = false;
  for (let index = 0; index < updatePayload.length; index += 2) {
    const attr = updatePayload[index];
    const value = updatePayload[index + 1];
    const isEvent = attr.substring(0, 2) === 'on';

    // Register events before other properties
    if (pre !== isEvent) continue;

    if (isEvent) {
      UnityBridge.setEventListener(instance, attr, value);
      continue;
    }

    if (attr === 'children') {
      if (type === 'text' || type === 'icon') {
        UnityBridge.setText(instance, value ? ((Array.isArray(value) && value.join) ? value.join('') : value + '') : '');
      }
      continue;
    }
    if (attr === 'key') continue;
    if (attr === 'ref') continue;
    if (attr === 'tag') continue;
    if (!isAfterMount && attr === 'style') {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Style, value)) {
        instance.ResolveStyle();
      }
      continue;
    }

    if (attr.substring(0, 5) === 'data-') {
      UnityBridge.setData(instance, attr.substring(5), value);
    } else {
      UnityBridge.setProperty(instance, attr, value);
    }
  }

  if (pre) return applyUpdate(instance, updatePayload, isAfterMount, type, false) || updateAfterMount;

  return updateAfterMount;
}

type Config = Reconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

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
    if (type === 'text' || type === 'icon') {
      const text = props.children === true ? '' :
        Array.isArray(props.children) ? props.children.join('') :
          props.children?.toString() || '';

      return UnityBridge.createElement(type, text, rootContainerInstance);
    }

    return UnityBridge.createElement(props.tag || type, null, rootContainerInstance);
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
    const propsToUpdate = [];
    const keys = Object.keys(props);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = props[key];

      propsToUpdate.push(key, value);
    }

    return applyUpdate(instance, propsToUpdate, false);
  },

  // Some attributes like style need to be changed only after mount
  commitMount(instance, type, newProps, internalInstanceHandle) {
    const props = [];
    if ('style' in newProps) props.push('style', newProps.style);

    applyUpdate(instance, props, true);
  },

  shouldSetTextContent(type, props) { return type === 'text' || type === 'icon'; },

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
    applyUpdate(instance, updatePayload as any, true, type);
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

  scheduleDeferredCallback(callback, options) { return UnityScheduler.setTimeout(callback, options?.timeout || 0); },
  cancelDeferredCallback(callBackID) { UnityScheduler.clearTimeout(callBackID); },

  noTimeout: -1,
  scheduleTimeout(callback, timeout) { return UnityScheduler.setTimeout(callback as any, timeout); },
  cancelTimeout(handle) { UnityScheduler.clearTimeout(handle); },
  queueMicrotask(callback) { return UnityScheduler.setTimeout(callback as any, 0); },
};

const ReactUnityReconciler = Reconciler(hostConfig);

export const Renderer = {
  render(
    element: React.ReactNode,
    hostContainer?: NativeContainerInstance,
    callback?: () => void,
  ): number {
    if (!hostContainer) hostContainer = HostContainer;
    const hostRoot = ReactUnityReconciler.createContainer(hostContainer, 0, false, {});
    return ReactUnityReconciler.updateContainer(element, hostRoot, null, callback);
  },
};
