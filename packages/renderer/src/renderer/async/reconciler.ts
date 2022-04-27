import * as Reconciler from 'react-reconciler';
import { commonReconciler, getAllowedProps, textTypes } from '../constants';
import { diffProperties } from '../diffing';
import { CallbacksRepo } from './callbacks';
import { ObjectsRepo } from './objects';
import { AsyncHostContext, AsyncReconcilerConfig } from './types';

let refId = 0;
const callbacks = new CallbacksRepo();
const objects = new ObjectsRepo();

// Separates properties in 3 categories: regular props, callbacks and non-serializable objects
function partitionProps(props: any) {
  const res: { p: any, o: any, e: any } = {} as any;

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];

      if (key === 'style' || value == null) {
        (res.p || (res.p = {}))[key] = value;
      }
      else if (typeof value === 'function') {
        const ind = callbacks.addObject(value);
        (res.e || (res.e = {}))[key] = ind;
      }
      else if (typeof value === 'object') {
        const ind = objects.addObject(value);
        (res.o || (res.o = {}))[key] = ind;
      }
      else {
        (res.p || (res.p = {}))[key] = value;
      }
    }
  }

  return res;
}

const ctxMap = new Map<object, AsyncHostContext>();

const hostConfig: AsyncReconcilerConfig & { [key: string]: any } = {
  ...commonReconciler,

  getRootHostContext: (rootContainer) => {
    const context = rootContainer.context;

    if (rootContainer.refId < 0) {
      refId++;
      rootContainer.context.SetRef(refId, rootContainer.component);
      rootContainer.refId = refId;
    }

    const existing = ctxMap.get(context);
    if (existing) return existing;

    const commands = rootContainer.commands;

    const flushCommands = () => {
      const serialized = JSON.stringify(commands);
      commands.length = 0;
      return serialized;
    };

    const fireEventByRef = (ind: number, args: any[]) => {
      return callbacks.call(ind, args);
    };

    const getObjectRef = (ind: number) => {
      return objects.getObject(ind);
    };

    context.BindCommands(flushCommands, fireEventByRef, getObjectRef);

    const ctx: AsyncHostContext = {
      context,
      commands,
    };

    ctxMap.set(context, ctx);

    return ctx;
  },
  getChildHostContext: (parentCtx) => {
    return parentCtx;
  },
  getPublicInstance: (instance) => {
    return instance.context.GetRef(instance.refId);
  },

  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  supportsMicrotasks: true,
  supportsTestSelectors: false,

  isPrimaryRenderer: true,
  warnsIfNotActing: true,

  prepareForCommit: () => null,
  resetAfterCommit: () => { },
  shouldDeprioritizeSubtree: () => false,

  clearContainer(container) {
    UnityBridge.clearContainer(container);
  },

  createInstance(type, props, rootContainer, ctx, internalHandle) {
    refId++;
    const aProps = getAllowedProps(props, type);
    ctx.commands.push(['c', { t: type, r: refId, ...partitionProps(aProps) }]);

    if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);

    return { ...ctx, refId };
  },

  createTextInstance(text, rootContainer, ctx, internalHandle) {
    refId++;
    ctx.commands.push(['t', { r: refId, c: text }]);

    if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);

    return { ...ctx, refId };
  },

  appendInitialChild(parent, child) {
    parent.commands.push(['a', { p: parent.refId, c: child.refId }]);
  },
  finalizeInitialChildren: () => false,
  commitMount: (instance) => { },
  shouldSetTextContent(type) { return textTypes[type]; },

  // -------------------
  //     Mutation
  // -------------------

  prepareUpdate(instance, type, oldProps, newProps) {
    return diffProperties(oldProps, newProps) as any;
  },

  commitUpdate(instance, updatePayload, type) {
    const props = getAllowedProps(updatePayload, type);
    instance.commands.push(['u', { r: instance.refId, t: type, ...partitionProps(props) }]);
  },


  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.commands.push(['x', { r: textInstance.refId, c: newText }]);
  },

  appendChild(parent, child) {
    child.commands.push(['a', { p: parent.refId, c: child.refId }]);
  },
  appendChildToContainer(parent, child) {
    child.commands.push(['a', { p: parent.refId, c: child.refId }]);
  },
  insertBefore(parent, child, beforeChild) {
    child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
  },
  insertInContainerBefore(parent, child, beforeChild) {
    child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
  },
  removeChild(parent, child) {
    child.commands.push(['r', { p: parent.refId, c: child.refId }]);
  },
  removeChildFromContainer(parent, child) {
    child.commands.push(['r', { p: parent.refId, c: child.refId }]);
  },

  resetTextContent: () => { },
  preparePortalMount: () => { },
  detachDeletedInstance: () => { },

  // Required for Suspense

  hideInstance: (instance) => {
    instance.commands.push(['h', { r: instance.refId, h: true }]);
  },
  hideTextInstance: (instance) => {
    instance.commands.push(['h', { r: instance.refId, h: true }]);
  },
  unhideInstance: (instance) => {
    instance.commands.push(['h', { r: instance.refId, h: false }]);
  },
  unhideTextInstance: (instance) => {
    instance.commands.push(['h', { r: instance.refId, h: false }]);
  },
};

export const asyncReconciler = Reconciler(hostConfig);
