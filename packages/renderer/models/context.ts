import { UnityEngine } from './generated';
import { InstanceTag, NativeContainerInstance, NativeInstance, NativeTextInstance, Props } from './renderer';

export type UnityObject = UnityEngine.Object;

export type ObjectDictionary = {
  [key: string]: UnityObject;
};


export interface UnityContext {
  Host: NativeContainerInstance;
  IsDevServer: boolean;

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
  setData(instance: NativeInstance, property: string, value: any);
  setEventListener(instance: NativeInstance, eventType: string, listener: any);
}
