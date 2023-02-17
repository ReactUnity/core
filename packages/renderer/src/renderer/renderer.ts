import * as React from 'react';
import { createElement } from 'react';
import { ConcurrentRoot, LegacyRoot } from 'react-reconciler/constants';
import { NativeContainerInstance } from '../models/renderer';
import { version } from '../version';
import { DefaultView } from '../views/default-view';
import { ObjectsRepo } from './async/objects';
import { asyncReconciler } from './async/reconciler';
import { AsyncContainerInstance, AsyncNativeInstance } from './async/types';
import { isDevelopment } from './constants';
import { syncReconciler } from './sync/reconciler';


const containerMap = new Map<NativeContainerInstance | number, { hostRoot: any, asyncJobCallback: () => void }>();

interface RenderOptions {
  /* Unity element to render React on. It is the element `ReactUnity` component is attached to by default. */
  hostContainer?: NativeContainerInstance;

  /* Skips rendering some useful wrappers like `ErrorBoundary` and `GlobalsProvider`. */
  disableHelpers?: boolean;

  /* Allows rendering in `legacy` mode if needed. The default rendering mode is `concurrent`. */
  mode?: 'legacy' | 'concurrent';

  /**
     Render using the sync reconciler instead of the batch rendering. It is not recommended to change this value.
     Changing this will disable some features like inline rich-text and svg rendering, although it may improve performance for Jint.
  */
  disableBatchRendering?: boolean;
}

let renderCount = 0;

export function render(
  element: React.ReactNode,
  options: RenderOptions = {},
) {
  renderCount++;
  const hostContainer = options?.hostContainer || HostContainer;
  const cacheKey = hostContainer.InstanceId >= 0 ? hostContainer.InstanceId : hostContainer;

  const isAsync = !options?.disableBatchRendering;
  let { hostRoot, asyncJobCallback } = containerMap.get(cacheKey) || {};

  let findFiberByHostInstance: any = () => null;

  if (!hostRoot) {
    const mode = options?.mode === 'legacy' ? LegacyRoot : ConcurrentRoot;

    if (isAsync) {
      const fiberCache = isDevelopment ? new ObjectsRepo() : null;

      if (isDevelopment) {
        findFiberByHostInstance = (instance: AsyncNativeInstance) => !instance ? null : fiberCache.getObject(instance.refId);
      }

      let scheduled = false;
      const commands = [];
      commands.push = (...args) => {
        if (!scheduled) {
          scheduled = true;
          Promise.resolve().then(() => {
            asyncJobCallback();
            scheduled = false;
          });
        }
        return Array.prototype.push.apply(commands, args);
      };

      const hostContainerInstance: AsyncContainerInstance = {
        type: 'native',
        commands,
        component: hostContainer,
        context: hostContainer.Context,
        refId: hostContainer.RefId,
        fiberCache,
      };
      asyncJobCallback = () => {
        if (!commands.length) return;

        const serialized = JSON.stringify(commands);
        commands.length = 0;
        hostContainerInstance.context.FlushCommands(serialized);
      };

      hostRoot = asyncReconciler.createContainer(hostContainerInstance, mode, null, false, undefined, '', (error) => console.error(error), null)
    }
    else {
      hostRoot = syncReconciler.createContainer(hostContainer, mode, null, false, undefined, '', (error) => console.error(error), null)
    }
    containerMap.set(cacheKey, { hostRoot, asyncJobCallback });
  }

  const shouldWrapWithHelpers = !options?.disableHelpers;

  if (shouldWrapWithHelpers) {
    const viewWrapperProps: React.ComponentProps<typeof DefaultView> = {
      withHelpers: !options?.disableHelpers,
      renderCount,
    };
    element = createElement(DefaultView, viewWrapperProps, element);
  }

  const rc = isAsync ? asyncReconciler : syncReconciler;
  rc.updateContainer(element, hostRoot, null);

  rc.injectIntoDevTools({
    bundleType: isDevelopment ? 1 : 0,
    version,
    rendererPackageName: '@reactunity/renderer',
    rendererConfig: { isAsync },
    findFiberByHostInstance,
  });

  return rc;
}

/**
 * @deprecated Instead, import `render` directly from `@reactunity/renderer`
 */
export const Renderer = {
  render(
    element: React.ReactNode,
    options: RenderOptions = {},
  ) {
    return render(element, options);
  },
};

export const batchedUpdates = asyncReconciler.batchedUpdates;
export const flushSync = asyncReconciler.flushSync;
