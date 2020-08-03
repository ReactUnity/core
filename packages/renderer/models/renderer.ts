import { Layout, Style, StateStyles } from './components';

export type Unique<T, K> = T & { $type: K };


export type NativeCommonProps = {
  Layout: Layout;
  Style: Style;
  StateStyles: StateStyles;

  ResolveStyle: () => void;
  ScheduleLayout: () => void;
  ApplyLayoutStyles: () => void;

  QuerySelector: (query: string) => NativeInstance;
  QuerySelectorAll: (query: string) => NativeInstance[];
  TextContent: string;
};

export type NativeTextInstance = Unique<NativeCommonProps, 'text'>;
export type NativeInstance = Unique<NativeCommonProps, 'instance'>;
export type NativeContainerInstance = Unique<NativeCommonProps, 'container'>;

export type NativeInputInstance = NativeInstance & {
  Value: string;
  Focus: () => void;
};

export type NativeToggleInstance = NativeInstance & {
  Value: boolean;
  Focus: () => void;
};

export type InstanceTag = string;
export type Props = React.RefAttributes<NativeInstance> & {
  [key: string]: any;
  children?: React.ReactNode;
};

export type HydratableInstance = Unique<{}, 'hydratable'>;
export type PublicInstance = any;

export type HostContext = {};
export type UpdatePayload = {};
export type ChildSet = {};
export type TimeoutHandle = number;
export type NoTimeout = -1;
