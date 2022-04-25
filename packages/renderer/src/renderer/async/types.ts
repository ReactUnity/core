import * as Reconciler from 'react-reconciler';
import { ReactUnity } from '../../models/generated';
import {
  ChildSet, HydratableInstance, InstanceTag, NoTimeout, Props, TimeoutHandle, UpdatePayload
} from '../../models/renderer';
import { BatchCommand } from './commands';

export type AsyncHostContext = {
  context: ReactUnity.ReactContext;
  commands: BatchCommand[];
};

type AsyncNativeInstance = AsyncHostContext & {
  refId: number;
};

type AsyncContainerInstance = Omit<AsyncNativeInstance, 'commands'> & {
  component: ReactUnity.IReactComponent;
};

type AsyncPublicInstance = ReactUnity.IReactComponent;

export type AsyncReconcilerConfig = Reconciler.HostConfig<InstanceTag, Props, AsyncContainerInstance, AsyncNativeInstance, AsyncNativeInstance, AsyncNativeInstance, HydratableInstance, AsyncPublicInstance, AsyncHostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;
