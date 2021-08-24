import { ReactUnity, UnityEditor, UnityEngine } from '../generated';
import { Style } from '../properties';
import { AssetReference } from '../properties/values';
import { ActionCallback, Events } from './events';

import Cmp = ReactUnity.UIToolkit;
type BaseCmp = Cmp.UIToolkitComponent;
export interface View<TSender = BaseCmp> extends Events<TSender> {
  name?: string;
  className?: string;
  id?: string;
  tooltip?: string;
  viewDataKey?: string;
  tabIndex?: number;
  style?: Style;
  focusable?: boolean;
  bind?: UnityEditor.SerializedObject | UnityEditor.SerializedProperty;
}

export interface Text<TSender = Cmp.TextComponent> extends View<TSender> {
  richText?: boolean;
  displayTooltipWhenElided?: boolean;
}

export interface Bindable<TSender = BaseCmp> extends View<TSender> {
  bindingPath?: string;
  binding?: UnityEngine.UIElements.IBinding;
}

export interface ValueComponent<T, TSender = BaseCmp> extends Bindable<TSender> {
  value?: T;
  onChange?: (ev: UnityEngine.UIElements.ChangeEvent<T>, sender: TSender) => void;
}

export interface BaseField<T, TSender = BaseCmp> extends ValueComponent<T, TSender> {
  label?: string;
  indeterminate?: boolean;
}

export interface StringField<TSender = BaseCmp> extends BaseField<string, TSender> {
  readOnly?: boolean;
  maskChar?: string;
  maxLength?: number;
  password?: boolean;
  delayed?: boolean;
}

export interface TextField<TSender = Cmp.TextFieldComponent> extends StringField<TSender> {
  multiline?: boolean;
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

export interface Image extends View<Cmp.ImageComponent> {
  source?: AssetReference;
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

export interface IMGUI extends View<Cmp.IMGUIComponent> {
  onGUI?: ActionCallback<Cmp.IMGUIComponent>;
  cullingEnabled?: boolean;
}
