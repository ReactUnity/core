import { Events, ActionCallback } from './events';
import { AssetReference } from '../properties/values';
import { Style } from '../properties';
import { ReactUnity, UnityEngine } from '../generated';

import Cmp = ReactUnity.Editor.Renderer.Components;
type BaseCmp = Cmp.EditorReactComponent;
export interface View<TSender = BaseCmp> extends Events<TSender> {
  name?: string;
  className?: string;
  style?: Style;
  focusable?: boolean;
}

export interface BaseField<T, TSender = BaseCmp> extends View<TSender> {
  value?: T;
  onChange?: (ev: UnityEngine.UIElements.ChangeEvent<T>, sender: TSender) => void;
  label?: string;
  bindingPath?: string;
}

export interface Button<TSender = Cmp.EditorButtonComponent> extends View<TSender> {
  onButtonClick?: ActionCallback<TSender>;
}

export interface Anchor extends View {
  url?: string;
}

export enum ImageFitMode {
  Center = 0,
  CenterCrop = 1,
  CenterInside = 2,
  FitCenter = 3,
  FitStart = 4,
  FitEnd = 5,
  Fill = 6,
}

export interface Image extends View {
  source?: AssetReference;
  fit?: ImageFitMode;
}

export interface Video extends Image {
}


export type ToggleEvent = (val: boolean) => void;

export interface Toggle extends BaseField<boolean, Cmp.EditorToggleComponent> {
  text?: string;
}

export interface IMGUI extends View<Cmp.EditorIMGUIComponent> {
  onGUI?: ActionCallback<Cmp.EditorIMGUIComponent>;
  cullingEnabled?: boolean;
}
