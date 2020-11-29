import * as ReactReconciler from 'react-reconciler';
import type * as React from 'react';
import { diffProperties, DiffResult } from './diffing';
import {
  NativeInstance, InstanceTag, NativeContainerInstance, NativeTextInstance, HydratableInstance,
  PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout, Props,
} from '../../models/renderer';

const hostContext = {};
const childContext = {};

function applyDiffedUpdate(writeTo: Record<string, any>, updatePayload: DiffResult | Record<string, any>, depth = 0) {
  if (!updatePayload) return false;

  if (Array.isArray(updatePayload)) {

    for (let index = 0; index < updatePayload.length; index += 2) {
      const attr = updatePayload[index];
      const value = updatePayload[index + 1];
      if (depth > 0) applyDiffedUpdate(writeTo[attr], value, depth - 1);
      else writeTo[attr] = value;
    }

    return updatePayload.length > 0;
  }
  else {
    for (const attr in updatePayload) {
      if (Object.prototype.hasOwnProperty.call(updatePayload, attr)) {
        const value = updatePayload[attr];
        writeTo[attr] = value;
      }
    }
    return true;
  }
}

function applyUpdate(instance: NativeInstance, updatePayload: DiffResult, isAfterMount: boolean) {
  let updateAfterMount = false;
  for (let index = 0; index < updatePayload.length; index += 2) {
    const attr = updatePayload[index];
    const value = updatePayload[index + 1];

    if (attr === 'children') continue;
    if (attr === 'key') continue;
    if (attr === 'ref') continue;
    if (attr === 'layout') {
      if (applyDiffedUpdate(instance.Inline, value)) {
        instance.ResolveStyle();
        instance.ScheduleLayout();
        instance.ApplyLayoutStyles();
      }
      continue;
    }
    if (!isAfterMount && (attr === 'style' || attr === 'stateStyles')) {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'stateStyles') {
      // TODO:
      // if (applyDiffedUpdate(instance.StateStyles, value, 1)) {
      //   instance.ResolveStyle();
      // }
      continue;
    }
    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Inline, value)) {
        instance.ResolveStyle();
      }
      continue;
    }

    if (typeof attr !== 'string') {
      throw new Error('Component attributes must be string.');
    }

    if (attr.substring(0, 2) === 'on') {
      Unity.setEventListener(instance, attr, value);
    } else {
      Unity.setProperty(instance, attr, value);
    }
  }

  return updateAfterMount;
}

type Config = ReactReconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

const hostConfig: Config & { clearContainer: () => void } = {
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
    if (type === 'text') {
      const text = props.children === true ? '' :
        Array.isArray(props.children) ? props.children.join('') :
          props.children?.toString() || '';

      return Unity.createElement(type, text, rootContainerInstance);
    }

    return Unity.createElement(type, null, rootContainerInstance);
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return Unity.createText(text, rootContainerInstance);
  },

  appendInitialChild(parent, child) { Unity.appendChild(parent, child); },

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
    if ('stateStyles' in newProps) props.push('stateStyles', diffProperties({}, newProps.stateStyles, 1));

    applyUpdate(instance, props, true);
  },

  shouldSetTextContent(type, props) { return type === 'text'; },

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
    applyUpdate(instance, updatePayload as any, true);
  },

  resetTextContent(instance) { console.log('resetTextContent'); },

  commitTextUpdate(textInstance, oldText, newText) { Unity.setText(textInstance, newText); },

  appendChild(parent, child) { return Unity.appendChild(parent, child); },
  appendChildToContainer(parent, child) { return Unity.appendChildToContainer(parent, child); },
  insertBefore(parent, child, beforeChild) { return Unity.insertBefore(parent, child, beforeChild); },
  insertInContainerBefore(parent, child, beforeChild) { return Unity.insertBefore(parent, child, beforeChild); },
  removeChild(parent, child) { return Unity.removeChild(parent, child); },
  removeChildFromContainer(parent, child) { return Unity.removeChild(parent, child); },

  // -------------------
  //     Scheduling
  // -------------------

  scheduleDeferredCallback(callback, options) { return UnityScheduler.setTimeout(callback, options?.timeout || 0); },
  cancelDeferredCallback(callBackID) { UnityScheduler.clearTimeout(callBackID); },

  noTimeout: -1,
  setTimeout(callback, timeout) { return UnityScheduler.setTimeout(callback, timeout); },
  clearTimeout(handle) { UnityScheduler.clearTimeout(handle); },
};

const ReactUnityReconciler = ReactReconciler(hostConfig);

let hostRoot: ReactReconciler.FiberRoot;
export const ReactUnity = {
  render(
    element: React.ReactNode,
    hostContainer?: NativeContainerInstance,
    callback?: () => void,
  ): number {
    if (!hostContainer) hostContainer = RootContainer;

    if (!hostRoot) {
      hostRoot = ReactUnityReconciler.createContainer(hostContainer, false, false);
    }
    return ReactUnityReconciler.updateContainer(element, hostRoot, null, callback);
  },
};
