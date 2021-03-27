import { ReactUnity } from './generated';

export type Unique<T, K> = T & { $type: K };

export type NativeInstance = ReactUnity.IReactComponent;
export type NativeTextInstance = ReactUnity.ITextComponent;
export type NativeContainerInstance = ReactUnity.IHostComponent;

export type InstanceTag = string;
export type Props = React.RefAttributes<NativeInstance> & {
  [key: string]: any;
  children?: React.ReactNode;
};

export type SuspenseInstance = NativeInstance;
export type HydratableInstance = NativeInstance;
export type PublicInstance = any;

export type HostContext = Record<string, unknown>;
export type UpdatePayload = Record<string, unknown>;
export type ChildSet = Record<string, unknown>;
export type TimeoutHandle = number;
export type NoTimeout = -1;
