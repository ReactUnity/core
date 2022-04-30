import * as Reconciler from 'react-reconciler';
import { commonReconciler, getAllowedProps, textTypes } from '../constants';
import { diffProperties } from '../diffing';
import { callbacksRepo, convertPropsToSerializable, objectsRepo } from './serializer';
import { AsyncHostContext, AsyncReconcilerConfig } from './types';

let refId = 0;

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
      return callbacksRepo.call(ind, args);
    };

    const getObjectRef = (ind: number) => {
      return objectsRepo.getObject(ind);
    };

    const getEventAsObjectRef = (ind: number) => {
      return callbacksRepo.getObject(ind);
    };

    context.BindCommands(flushCommands, fireEventByRef, getObjectRef, getEventAsObjectRef);

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
    return instance.context.GetRef(instance.refId, instance.commands.length > 0);
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
    ctx.commands.push(['c', { t: type, r: refId, ...convertPropsToSerializable(aProps) }]);

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
    instance.commands.push(['u', { r: instance.refId, t: type, ...convertPropsToSerializable(props) }]);
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
