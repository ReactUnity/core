import * as objectAssign from 'object-assign';
import * as ReactReconciler from 'react-reconciler';
import * as React from 'react';
import { diffProperties, DiffResult } from './diffing';
import {
  NativeInstance, InstanceTag, NativeContainerInstance, NativeTextInstance, HydratableInstance,
  PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout, Props,
} from '../../models/renderer';

const hostContext = {};
const childContext = {};

function applyDiffedUpdate(writeTo: Record<string, any>, updatePayload: DiffResult | Record<string, any>) {
  if(!updatePayload) return false;

  if (Array.isArray(updatePayload)) {
    for (let index = 0; index < updatePayload.length; index += 2) {
      const attr = updatePayload[index];
      const value = updatePayload[index + 1];
      writeTo[attr] = value;
    }

    return updatePayload.length > 0;
  }
  else {
    objectAssign(writeTo, updatePayload);
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
      if (applyDiffedUpdate(instance.Layout, value)) {
        instance.ScheduleLayout();
        instance.ApplyLayoutStyles();
      }
      continue;
    }
    if (!isAfterMount && (attr === 'style')) {
      updateAfterMount = true;
      continue;
    }

    if (attr === 'style') {
      if (applyDiffedUpdate(instance.Style, value)) {
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

const hostConfig: ReactReconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout> = {
  getRootHostContext(rootContainerInstance) { return hostContext; },
  getChildHostContext(parentHostContext, type, rootContainerInstance) { return childContext; },
  getPublicInstance(instance: NativeInstance | NativeTextInstance) { return instance; },
  prepareForCommit(containerInfo) { },
  resetAfterCommit(containerInfo) { },
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

  appendInitialChild: Unity.appendChild,

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

  shouldSetTextContent(type, props) {
    return type === 'text';
  },

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return Unity.createText(text, rootContainerInstance);
  },

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
  ): DiffResult {
    return diffProperties(oldProps, newProps);
  },

  commitUpdate(
    instance,
    updatePayload: DiffResult,
    type,
    oldProps,
    newProps,
    internalInstanceHandle,
  ) {
    applyUpdate(instance, updatePayload, true);
  },

  resetTextContent(instance) {
    console.log('resetTextContent');
  },

  commitTextUpdate(textInstance, oldText, newText) {
    Unity.setText(textInstance, newText);
  },

  appendChild: Unity.appendChild,
  appendChildToContainer: Unity.appendChildToContainer,
  insertBefore: Unity.insertBefore,
  insertInContainerBefore: Unity.insertBefore,
  removeChild: Unity.removeChild,
  removeChildFromContainer: Unity.removeChild,

  // -------------------
  //     Scheduling
  // -------------------

  scheduleDeferredCallback(callback, options) {
    return UnityScheduler.setTimeout(callback, options && options.timeout || 0);
  },
  cancelDeferredCallback(callBackID) {
    UnityScheduler.clearTimeout(callBackID);
  },

  noTimeout: -1,
  setTimeout(callback, timeout) {
    return UnityScheduler.setTimeout(callback, timeout);
  },
  clearTimeout(handle) {
    UnityScheduler.clearTimeout(handle);
  },
};

const ReactUnityReconciler = ReactReconciler(hostConfig);

let hostRoot;
export const ReactUnity = {
  render(element: React.ReactNode, hostContainer: NativeContainerInstance, callback: () => void) {
    if (!hostRoot) {
      hostRoot = ReactUnityReconciler.createContainer(hostContainer, false, false);
    }
    return ReactUnityReconciler.updateContainer(element, hostRoot, null, callback);
  },
};
