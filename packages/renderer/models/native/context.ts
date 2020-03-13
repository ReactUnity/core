import {
  NativeContainerInstance, NativeTextInstance, InstanceTag, NativeInstance, TimeoutHandle, NoTimeout, Props,
} from '../renderer';

export type UnityObject = { readonly $type: 'UnityObject' };

export type ObjectDictionary = {
  [key: string]: UnityObject;
};


export interface UnityContext {
  Host: NativeContainerInstance;

  // Creating
  createText(text: string, root: NativeContainerInstance): NativeTextInstance;
  createElement(type: InstanceTag, text: string, root: NativeContainerInstance, props?: Props): NativeInstance;

  // Mutation
  appendChild(parent: NativeInstance, child: NativeInstance | NativeTextInstance): void;
  appendChildToContainer(container: NativeContainerInstance, child: NativeInstance | NativeTextInstance);
  insertBefore(parent: NativeInstance | NativeContainerInstance, child: NativeInstance | NativeTextInstance, beforeChild: NativeInstance | NativeTextInstance): void;
  removeChild(parentInstance: NativeInstance | NativeContainerInstance, child: NativeInstance | NativeTextInstance);

  // Attributes
  setText(instance: NativeTextInstance, text: string): void;
  setProperty(instance: NativeInstance, property: string, value: any);
  setEventListener(instance: NativeInstance, eventType: string, listener: any);
}

export interface UnitySchedulerContext {
  setTimeout(callback: () => any, timeout: number): TimeoutHandle | NoTimeout;
  clearTimeout(handle: TimeoutHandle): void;

  setInterval(callback: () => any, timeout: number): TimeoutHandle | NoTimeout;
  clearInterval(handle: TimeoutHandle): void;

  requestAnimationFrame(callback: () => any): TimeoutHandle | NoTimeout;
  cancelAnimationFrame(handle: TimeoutHandle): void;
}
