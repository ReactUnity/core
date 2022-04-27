import * as Reconciler from 'react-reconciler';
import { commonReconciler, getAllowedProps, textTypes } from '../constants';
import { diffProperties } from '../diffing';
import { CallbacksRepo } from './callbacks';
import { ObjectsRepo } from './objects';
import { AsyncHostContext, AsyncReconcilerConfig } from './types';

let refId = 0;
const callbacks = new CallbacksRepo();
const objects = new ObjectsRepo();

function bisectCallbacks(props: any) {
  const regularProps = {};
  const callbackProps = {};
  const objectProps = {};

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];

      if (key === 'style') {
        regularProps[key] = value;
      }
      else if (typeof value === 'function') {
        const ind = callbacks.addObject(value);
        callbackProps[key] = ind;
      }
      else if (typeof value === 'object') {
        const ind = objects.addObject(value);
        objectProps[key] = ind;
      }
      else {
        regularProps[key] = value;
      }
    }
  }

  return [regularProps, callbackProps, objectProps];
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
    const [p, e, o] = bisectCallbacks(aProps);
    ctx.commands.push(['c', { t: type, r: refId, p, e, o }]);

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
    const [p, e, o] = bisectCallbacks(props);
    instance.commands.push(['u', { r: instance.refId, t: type, p, e, o }]);
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
