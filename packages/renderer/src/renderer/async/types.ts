import type Reconciler from 'react-reconciler';
import { ReactUnity } from '../../models/generated';
import {
  ChildSet, HydratableInstance, InstanceTag, NoTimeout, Props, TimeoutHandle, UpdatePayload
} from '../../models/renderer';
import { BatchCommand } from './commands';
import { ObjectsRepo } from './objects';

export type AsyncHostContext = AsyncNativeInstance | AsyncSubContext;
export type AsyncInstance = AsyncNativeInstance | AsyncSubContext;

export type AsyncNativeInstance = {
  context: ReactUnity.ReactContext;
  commands: BatchCommand[];
  refId: number;
  type: 'native';
  subContext?: AsyncSubContext;
};

export type AsyncSubContext = RichTextContext | SvgContext;

export type RichTextContext = {
  hostContext: AsyncNativeInstance;
  type: 'richtext';
  node: RichTextNode;
  root: AsyncNativeInstance;
  parent: RichTextContext;
};

export type SvgContext = {
  hostContext: AsyncNativeInstance;
  type: 'svg';
  node: RichTextNode;
  root: AsyncNativeInstance;
  parent: SvgContext;
};

export type RichTextNode = ({
  tag: string;
  attributes: Record<string, any>;
  children: RichTextNode[];
  hidden?: boolean;
} | {
  text: string;
  hidden?: boolean;
});

export type AsyncContainerInstance = AsyncNativeInstance & {
  component: ReactUnity.IReactComponent;
  fiberCache: ObjectsRepo | null;
};

type AsyncPublicInstance = ReactUnity.IReactComponent;

export type AsyncReconcilerConfig = Reconciler.HostConfig<InstanceTag, Props, AsyncContainerInstance, AsyncInstance, AsyncInstance, AsyncNativeInstance, HydratableInstance, AsyncPublicInstance, AsyncHostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;
