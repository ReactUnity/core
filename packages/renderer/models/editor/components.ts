import { ReactUnity, System, UnityEngine } from '../generated';
import { Style } from '../properties';
import { AssetReference } from '../properties/values';
import { ActionCallback, Events } from './events';

import Cmp = ReactUnity.Editor.Components;
type BaseCmp = Cmp.EditorComponent;
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

export interface BaseSlider<T, TSender = Cmp.BaseSliderComponent<Slider, any>> extends BaseField<T, TSender> {
  min?: T;
  max?: T;
  step?: T;
  showInput?: boolean;
  vertical?: boolean;
  inverted?: boolean;
}

export interface Button<TSender = Cmp.ButtonComponent> extends View<TSender> {
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

export interface Toggle extends BaseField<boolean, Cmp.ToggleComponent> {
  text?: string;
}

export interface Slider extends BaseSlider<number> { }
export interface Range extends BaseField<number, Cmp.RangeComponent> {
  min?: number;
  max?: number;
  low?: number;
  high?: number;
}

export interface EnumProps extends BaseField<number> {
  type: System.Type | string;
}

export interface ObjectProps extends BaseField<UnityEngine.Object> {
  type?: System.Type | string;
  allowSceneObjects?: boolean;
}

export interface IMGUI extends View<Cmp.IMGUIComponent> {
  onGUI?: ActionCallback<Cmp.IMGUIComponent>;
  cullingEnabled?: boolean;
}
