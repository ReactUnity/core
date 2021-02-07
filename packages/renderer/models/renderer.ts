import { ReactUnity } from './generated';

export type Unique<T, K> = T & { $type: K };

export type NativeInstance = ReactUnity.Components.UnityComponent;
export type NativeTextInstance = ReactUnity.Components.TextComponent;
export type NativeContainerInstance = ReactUnity.Components.HostComponent;
export type NativeVideoInstance = ReactUnity.Components.VideoComponent;
export type NativeInputInstance = ReactUnity.Components.InputComponent;
export type NativeToggleInstance = ReactUnity.Components.ToggleComponent;

export type InstanceTag = string;
export type Props = React.RefAttributes<NativeInstance> & {
  [key: string]: any;
  children?: React.ReactNode;
};

export type HydratableInstance = Unique<Record<string, unknown>, 'hydratable'>;
export type PublicInstance = any;

export type HostContext = Record<string, unknown>;
export type UpdatePayload = Record<string, unknown>;
export type ChildSet = Record<string, unknown>;
export type TimeoutHandle = number;
export type NoTimeout = -1;
