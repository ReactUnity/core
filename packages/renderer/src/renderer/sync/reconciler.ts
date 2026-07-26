import Reconciler from 'react-reconciler';
import {
  ChildSet,
  FormInstance,
  HostContext,
  HydratableInstance,
  InstanceTag,
  NativeContainerInstance,
  NativeInstance,
  NativeTextInstance,
  NoTimeout,
  Props,
  PublicInstance,
  SuspenseInstance,
  TimeoutHandle,
  TransitionStatus,
} from '../../models/renderer';
import { commonReconciler, getAllowedProps, hideClass, stringizePoolKey, textTypes } from '../constants';
import { diffProperties } from '../diffing';

type Config = Reconciler.HostConfig<
  InstanceTag,
  Props,
  NativeContainerInstance,
  NativeInstance,
  NativeTextInstance,
  SuspenseInstance,
  HydratableInstance,
  FormInstance,
  PublicInstance,
  HostContext,
  ChildSet,
  TimeoutHandle,
  NoTimeout,
  TransitionStatus
>;

const hostContext = {};
const childContext = {};

const hostConfig: Config = {
  ...commonReconciler,

  getRootHostContext: () => hostContext,
  getChildHostContext: () => childContext,
  getPublicInstance: (instance: NativeInstance | NativeTextInstance) => instance,

  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: true,

  isPrimaryRenderer: true,
  warnsIfNotActing: true,

  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  clearContainer: (container) => UnityBridge.clearContainer(container),

  createInstance(type, props, rootContainerInstance) {
    const aProps = getAllowedProps(props, type);
    const children = aProps.children || null;
    // biome-ignore lint/performance/noDelete: Delete is required here
    delete aProps.children;
    return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps, stringizePoolKey(props.pool));
  },

  createTextInstance(text, rootContainerInstance) {
    return UnityBridge.createText(text, rootContainerInstance);
  },

  appendInitialChild(parent, child) {
    UnityBridge.appendChild(parent, child);
  },
  finalizeInitialChildren: () => false,
  commitMount: () => {},
  shouldSetTextContent(type) {
    return textTypes[type];
  },

  // -------------------
  //     Mutation
  // -------------------

  commitUpdate(instance, type, prevProps, nextProps) {
    let updatePayload: Record<string, any> | null = null;

    if (typeof prevProps === 'string') {
      // React 18 compatibility
      updatePayload = type as any;
      type = prevProps as any;
    } else {
      // React 19+
      updatePayload = diffProperties(prevProps, nextProps);
      if (!updatePayload) return;
    }

    UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    UnityBridge.setText(textInstance, newText);
  },

  appendChild(parent, child) {
    return UnityBridge.appendChild(parent, child);
  },
  appendChildToContainer(parent, child) {
    return UnityBridge.appendChildToContainer(parent, child);
  },
  insertBefore(parent, child, beforeChild) {
    return UnityBridge.insertBefore(parent, child, beforeChild);
  },
  insertInContainerBefore(parent, child, beforeChild) {
    return UnityBridge.insertBefore(parent, child, beforeChild);
  },
  removeChild(parent, child) {
    return UnityBridge.removeChild(parent, child);
  },
  removeChildFromContainer(parent, child) {
    return UnityBridge.removeChild(parent, child);
  },

  resetTextContent: () => {},
  preparePortalMount: () => {},
  detachDeletedInstance: () => {},

  // Required for Suspense

  hideInstance: (instance) => {
    instance.ClassList.Add(hideClass);
  },
  hideTextInstance: (instance) => {
    instance.ClassList.Add(hideClass);
  },
  unhideInstance: (instance) => {
    instance.ClassList.Remove(hideClass);
  },
  unhideTextInstance: (instance) => {
    instance.ClassList.Remove(hideClass);
  },

  // Keep for old versions of React
  ...{
    supportsTestSelectors: false,
    shouldDeprioritizeSubtree: () => false,
    prepareUpdate(instance, type, oldProps, newProps) {
      return diffProperties(oldProps, newProps) as any;
    },
  },
};

let syncReconciler: ReturnType<typeof Reconciler> | null = null;
export const getSyncReconciler = () => (syncReconciler ??= Reconciler(hostConfig));
