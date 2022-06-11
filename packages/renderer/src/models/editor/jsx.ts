
import * as rc from 'react';
import { BaseElements, Textable } from '../base';
import { ReactUnity, UnityEngine } from '../generated';
import { SVGEelement } from '../svg';
import * as Components from '../uitoolkit/components';
import * as EComponents from './components';

import Cmp = ReactUnity.UIToolkit;
import ECmp = ReactUnity.Editor.UIToolkit;

type Children<T = any> = { children?: T };

type BaseElement<T = Cmp.UIToolkitComponent> = Components.View<T> & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;
type BaseFieldComponent<T> = Cmp.BaseFieldComponent<BaseElement, T>;
type BaseFieldElement<T, TSender = BaseFieldComponent<T>> = Components.BaseField<T, TSender> & rc.RefAttributes<TSender> & Children<never>;
type BaseFieldElementSimple<T> = BaseFieldElement<T, BaseFieldComponent<T>>;

export interface EditorElements extends BaseElements<BaseElement<any>> {
  view: BaseElement & { tag?: string };
  box: BaseElement;
  anchor: Components.Anchor & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;
  text: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  richtext: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  label: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  button: Components.Button & rc.RefAttributes<Cmp.ButtonComponent> & Children;
  scroll: BaseElement;
  svg: Components.Svg & rc.RefAttributes<Cmp.SvgComponent> & Children<never> & SVGEelement;
  img: Components.Image & rc.RefAttributes<Cmp.ImageComponent> & Children<never>;
  image: Components.Image & rc.RefAttributes<Cmp.ImageComponent> & Children<never>;
  toggle: Components.Toggle & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
  input: Components.TextField<Cmp.TextFieldComponent> & rc.RefAttributes<Cmp.TextFieldComponent> & Children<never>;
  helpbox: BaseElement;
  foldout: BaseElement;
  popup: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  slider: Components.Slider & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
  sliderint: Components.Slider & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
  range: Components.Range & rc.RefAttributes<Cmp.RangeComponent> & Children<never>;
  repeat: BaseElement;
  scroller: BaseElement;
  list: Components.Bindable;
  imgui: Components.IMGUI & rc.RefAttributes<Cmp.IMGUIComponent> & Children<never>;
  template: Components.Bindable;
  dialog: EComponents.DialogProps & rc.RefAttributes<ECmp.DialogComponent> & Children;

  color: BaseFieldElementSimple<UnityEngine.Color | string>;
  bounds: BaseFieldElementSimple<UnityEngine.Bounds>;
  boundsint: BaseFieldElementSimple<UnityEngine.BoundsInt>;
  curve: BaseFieldElementSimple<UnityEngine.AnimationCurve>;
  double: BaseFieldElementSimple<number>;
  enum: EComponents.EnumProps & rc.RefAttributes<ECmp.EnumComponent> & Children<never>;
  flags: EComponents.EnumProps & rc.RefAttributes<ECmp.EnumComponent> & Children<never>;
  float: BaseFieldElementSimple<number>;
  gradient: BaseFieldElementSimple<UnityEngine.Gradient>;
  inspector: Components.Bindable;
  integer: BaseFieldElementSimple<number>;
  layer: BaseFieldElementSimple<number>;
  layermask: BaseFieldElementSimple<number>;
  long: BaseFieldElementSimple<number>;
  mask: BaseFieldElementSimple<number>;
  object: EComponents.ObjectProps & rc.RefAttributes<ECmp.ObjectComponent> & Children<never>;
  progress: Components.ValueComponent<number>;
  property: Components.Bindable;
  rect: BaseFieldElementSimple<UnityEngine.Rect>;
  rectint: BaseFieldElementSimple<UnityEngine.RectInt>;
  tag: BaseFieldElementSimple<string>;
  vector2: BaseFieldElementSimple<UnityEngine.Vector2>;
  vector2int: BaseFieldElementSimple<UnityEngine.Vector2Int>;
  vector3: BaseFieldElementSimple<UnityEngine.Vector4>;
  vector3int: BaseFieldElementSimple<UnityEngine.Vector3Int>;
  vector4: BaseFieldElementSimple<UnityEngine.Vector4>;
  length: BaseFieldElementSimple<UnityEngine.UIElements.StyleLength>;
  toolbar: BaseElement;
  'tb-breadcrumbs': BaseElement;
  'tb-button': BaseElement;
  'tb-menu': BaseElement;
  'tb-popupsearch': BaseElement;
  'tb-search': BaseElement;
  'tb-spacer': BaseElement;
  'tb-toggle': BaseElement;
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
    interface IntrinsicElements extends EditorElements { }
  }
}
