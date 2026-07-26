import type Reconciler from 'react-reconciler';
import type { ReactUnity } from './generated';

export type Unique<T, K> = T & { $type: K };

export type NativeInstance = ReactUnity.IReactComponent;
export type NativeTextInstance = ReactUnity.ITextComponent;
export type NativeContainerInstance = ReactUnity.IReactComponent;

export type InstanceTag = string;
export type Props = React.RefAttributes<NativeInstance> & {
  [key: string]: any;
  children?: React.ReactNode;
};

export type SuspenseInstance = NativeInstance;
export type HydratableInstance = NativeInstance;
export type FormInstance = NativeInstance;
export type PublicInstance = any;

export type HostContext = Record<string, unknown>;
export type ChildSet = Record<string, unknown>;
export type TimeoutHandle = number;
export type TransitionStatus = null | 'NotPendingTransition';
export type NoTimeout = -1;

export type CommonConfig = Reconciler.HostConfig<
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
