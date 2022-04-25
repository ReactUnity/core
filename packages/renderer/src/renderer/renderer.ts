import * as React from 'react';
import { createElement } from 'react';
import { NativeContainerInstance } from '../models/renderer';
import { DefaultView } from '../views/default-view';
import { asyncReconciler } from './async/reconciler';
import { ConcurrentRoot, LegacyRoot } from './constants';
import { syncReconciler } from './sync/reconciler';

const containerMap = new Map<NativeContainerInstance, any>();

interface RenderOptions {
  /* Unity element to render React on. It is the element `ReactUnityUGUI` is attached to by default. */
  hostContainer?: NativeContainerInstance;

  /* Skips rendering some useful wrappers like `ErrorBoundary` and `GlobalsProvider`. */
  disableHelpers?: boolean;

  /* Allows rendering in `legacy` mode if needed. The default rendering mode is `concurrent`. */
  mode?: 'legacy' | 'concurrent';

  /* Render using the sync reconciler instead of the async (batch) rendering */
  sync?: boolean;
}

export const Renderer = {
  render(
    element: React.ReactNode,
    options: RenderOptions = {},
  ) {
    const hostContainer = options?.hostContainer || HostContainer;

    // For Jint engine, sync is default
    // For other engines (ClearScript), async is default
    const isAsync = hostContainer.Context.Script.Engine.Key === 'jint' ? options?.sync === false : !options?.sync;

    const rc = isAsync ? asyncReconciler : syncReconciler;

    let hostRoot = containerMap.get(hostContainer);
    if (!hostRoot) {
      const mode = options?.mode === 'legacy' ? LegacyRoot : ConcurrentRoot;

      if (isAsync) {
        const hostContainerInstance = {
          component: hostContainer,
          context: hostContainer.Context,
          refId: hostContainer.RefId,
        };
        hostRoot = asyncReconciler.createContainer(hostContainerInstance, mode, false, null)
      }
      else {
        hostRoot = syncReconciler.createContainer(hostContainer, mode, false, null)
      }
      containerMap.set(hostContainer, hostRoot);
    }

    if (!options?.disableHelpers) element = createElement(DefaultView, null, element);

    rc.updateContainer(element, hostRoot, null);
  },
};

export const batchedUpdates = syncReconciler.batchedUpdates;
export const flushSync = syncReconciler.flushSync;
