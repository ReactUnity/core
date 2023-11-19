import * as Reconciler from 'react-reconciler';
import { commonReconciler, getAllowedProps, stringizePoolKey, textTypes } from '../constants';
import { diffProperties } from '../diffing';
import { subContextRenderers } from '../subcontexts';
import { callbacksRepo, convertPropsToSerializable, objectsRepo } from './serializer';
import { AsyncHostContext, AsyncReconcilerConfig, AsyncSubContext } from './types';

let refId = 0;

const ctxMap = new Map<object, AsyncHostContext>();

const updateSubContext = (instance: AsyncSubContext) => {
  const rend = subContextRenderers[instance.type];

  let root = instance?.root;
  let cur = instance;

  while (cur && !root) {
    root = cur.root;
    cur = cur.parent;
  }

  if (!root) return;

  var content = rend(root.subContext.node);

  if (instance.type === 'richtext') {
    // instance.hostContext.commands.push(['x', { r: root.refId, c: content }]);
    instance.hostContext.commands.push([6, root.refId, content]);
  }
  else if (instance.type === 'svg') {
    // instance.hostContext.commands.push(['u', { r: root.refId, t: 'svg', ...convertPropsToSerializable({ innerContent: content }) }]);
    instance.hostContext.commands.push([5, root.refId, 'svg', convertPropsToSerializable({ innerContent: content })]);
  }
};

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
      refId: rootContainer.refId,
      type: 'native',
    };

    ctxMap.set(context, ctx);

    return ctx;
  },
  getChildHostContext: (parentCtx, type) => {
    if (type === 'richtext' && parentCtx.type === 'native')
      return {
        type: 'richtext',
        hostContext: parentCtx,
        node: null,
        parent: null,
        root: null,
      };

    if (type === 'svg' && parentCtx.type === 'native')
      return {
        type: 'svg',
        hostContext: parentCtx,
        node: null,
        parent: null,
        root: null,
      };

    return parentCtx;
  },
  getPublicInstance: (instance) => {
    if (instance.type === 'native')
      return instance.context.GetRef(instance.refId, instance.commands.length > 0);
    return null;
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
    const aProps = getAllowedProps(props, type);
    if (ctx.type === 'native') {
      refId++;
      // ctx.commands.push(['c', { t: type, r: refId, k: stringizePoolKey(props.pool), ...convertPropsToSerializable(aProps) }]);
      ctx.commands.push([0, refId, type, convertPropsToSerializable(aProps), stringizePoolKey(props.pool)]);

      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);

      const res = { ...ctx, refId };

      if (type === 'richtext') {
        res.subContext = {
          type: 'richtext',
          node: {
            tag: '',
            children: [],
            attributes: aProps,
          },
          root: res,
          hostContext: res,
          parent: null,
        };
      }

      if (type === 'svg') {
        res.subContext = {
          type: 'svg',
          node: {
            tag: '',
            children: [],
            attributes: aProps,
          },
          root: res,
          hostContext: res,
          parent: null,
        };
      }

      return res;
    }
    else if (ctx.type === 'richtext' || ctx.type === 'svg') {
      return {
        ...ctx,
        node: {
          tag: type,
          children: [],
          attributes: aProps,
        },
      };
    }
  },

  createTextInstance(text, rootContainer, ctx, internalHandle) {
    if (ctx.type === 'native') {
      refId++;
      // ctx.commands.push(['t', { r: refId, c: text }]);
      ctx.commands.push([1, refId, text]);

      if (rootContainer.fiberCache) rootContainer.fiberCache.setObject(refId, internalHandle);

      return { ...ctx, refId };
    }
    else if (ctx.type === 'richtext' || ctx.type === 'svg') {
      return {
        ...ctx,
        node: { text },
      };
    }
  },

  appendInitialChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;

    if (parent.type === 'native' && child.type === 'native') {
      // parent.commands.push(['a', { p: parent.refId, c: child.refId }]);
      parent.commands.push([2, parent.refId, child.refId]);
    }
    else if (
      (parent.type === 'richtext' && child.type === 'richtext') ||
      (parent.type === 'svg' && child.type === 'svg')
    ) {
      if ('children' in parent.node)
        parent.node.children.push(child.node);
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
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
    if (instance.type === 'native') {
      // instance.commands.push(['u', { r: instance.refId, t: type, ...convertPropsToSerializable(props) }]);
      instance.commands.push([5, instance.refId, type, convertPropsToSerializable(props)]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      if ('attributes' in instance.node)
        instance.node.attributes = { ...instance.node.attributes, ...props };
      updateSubContext(instance);
    }
  },


  commitTextUpdate(instance, oldText, newText) {
    if (instance.type === 'native') {
      // instance.commands.push(['x', { r: instance.refId, c: newText }]);
      instance.commands.push([6, instance.refId, newText]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      (instance.node as { text: string }).text = newText;
      updateSubContext(instance);
    }
  },

  appendChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;

    if (parent.type === 'native' && child.type === 'native') {
      // child.commands.push(['a', { p: parent.refId, c: child.refId }]);
      child.commands.push([2, parent.refId, child.refId]);
    }
    else if (
      (parent.type === 'richtext' && child.type === 'richtext') ||
      (parent.type === 'svg' && child.type === 'svg')
    ) {
      if ('children' in parent.node)
        parent.node.children.push(child.node);
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  appendChildToContainer(parent, child) {
    if (child.type === 'native')
      // child.commands.push(['a', { p: parent.refId, c: child.refId }]);
      child.commands.push([2, parent.refId, child.refId]);
  },
  insertBefore(parent, child, beforeChild) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;

    if (parent.type === 'native' && child.type === 'native' && beforeChild.type === 'native') {
      // child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
      child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
    }
    else if (
      (parent.type === 'richtext' && child.type === 'richtext' && beforeChild.type === 'richtext') ||
      (parent.type === 'svg' && child.type === 'svg' && beforeChild.type === 'svg')) {
      if ('children' in parent.node) {
        const index = parent.node.children.indexOf(beforeChild.node);
        if (index >= 0) parent.node.children.splice(index, 0, child.node);
        else parent.node.children.push(child.node);
      }
      child.root = parent.root;
      child.parent = parent;
      updateSubContext(child);
    }
  },
  insertInContainerBefore(parent, child, beforeChild) {
    if (child.type === 'native' && beforeChild.type === 'native')
      // child.commands.push(['i', { p: parent.refId, c: child.refId, i: beforeChild.refId }]);
      child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
  },
  removeChild(parent, child) {
    if (!child) return;
    if (parent.type === 'native' && parent.subContext) parent = parent.subContext;

    if (parent.type === 'native' && child.type === 'native') {
      // child.commands.push(['r', { p: parent.refId, c: child.refId }]);
      child.commands.push([3, parent.refId, child.refId]);
    }
    else if (
      (parent.type === 'richtext' && child.type === 'richtext') ||
      (parent.type === 'svg' && child.type === 'svg')
    ) {
      if ('children' in parent.node) {
        const index = parent.node.children.indexOf(child.node);
        if (index >= 0) parent.node.children.splice(index, 1);
      }
      updateSubContext(parent);
    }
  },
  removeChildFromContainer(parent, child) {
    if (child.type === 'native')
      // child.commands.push(['r', { p: parent.refId, c: child.refId }]);
      child.commands.push([3, parent.refId, child.refId]);
  },

  resetTextContent: () => { },
  preparePortalMount: () => { },
  detachDeletedInstance: () => { },

  // Required for Suspense

  hideInstance: (instance) => {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: true }]);
      instance.commands.push([7, instance.refId, true]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  hideTextInstance: (instance) => {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: true }]);
      instance.commands.push([7, instance.refId, true]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = true;
      updateSubContext(instance);
    }
  },
  unhideInstance: (instance) => {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: false }]);
      instance.commands.push([7, instance.refId, false]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  },
  unhideTextInstance: (instance) => {
    if (instance.type === 'native') {
      // instance.commands.push(['h', { r: instance.refId, h: false }]);
      instance.commands.push([7, instance.refId, false]);
    }
    else if (instance.type === 'richtext' || instance.type === 'svg') {
      instance.node.hidden = false;
      updateSubContext(instance);
    }
  },
};

export const asyncReconciler = Reconciler(hostConfig);
