
import * as rc from 'react';
import { BaseElements, Textable } from '../base';
import { ReactUnity } from '../generated';
import { SVGEelement } from '../svg';
import * as Components from './components';

import Cmp = ReactUnity.UIToolkit;

type Children<T = any> = { children?: T };

type BaseElement<T = Cmp.UIToolkitComponent> = Components.View<T> & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;

export interface UIToolkitElements extends BaseElements<BaseElement<any>> {
  view: BaseElement & { tag?: string };
  box: BaseElement;
  anchor: Components.Anchor & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;
  text: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  richtext: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  label: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  button: Components.Button & rc.RefAttributes<Cmp.ButtonComponent> & Children;
  scroll: BaseElement;
  svg: Components.Svg & rc.RefAttributes<Cmp.SvgComponent> & Children<any> & SVGEelement;
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
  progress: Components.ValueComponent<number>;
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
    interface IntrinsicElements extends UIToolkitElements { }
  }
}
