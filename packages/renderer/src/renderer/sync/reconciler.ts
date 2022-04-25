import * as Reconciler from 'react-reconciler';
import {
  ChildSet, HostContext, HydratableInstance, InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance,
  NoTimeout, Props, PublicInstance, SuspenseInstance, TimeoutHandle, UpdatePayload
} from '../../models/renderer';
import { commonReconciler, getAllowedProps, hideClass, textTypes } from '../constants';
import { diffProperties } from '../diffing';

type Config = Reconciler.HostConfig<InstanceTag, Props, NativeContainerInstance, NativeInstance, NativeTextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

const hostContext = {};
const childContext = {};

const hostConfig: Config & { [key: string]: any } = {
  ...commonReconciler,

  getRootHostContext: () => hostContext,
  getChildHostContext: () => childContext,
  getPublicInstance: (instance: NativeInstance | NativeTextInstance) => instance,

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
};

export const syncReconciler = Reconciler(hostConfig);
