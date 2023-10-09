
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
  a: Components.Anchor & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;
  anchor: Components.Anchor & rc.RefAttributes<Cmp.UIToolkitComponent> & Children;
  text: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  richtext: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  label: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
  button: Components.Button & rc.RefAttributes<Cmp.ButtonComponent> & Children;
  scroll: Components.Scroll & rc.RefAttributes<Cmp.ScrollViewComponent> & Children;
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

declare global {
  interface ReactUnityCustomElements { }
  interface ReactUnityCustomAttributes { }

  namespace JSX {
    interface IntrinsicAttributes extends ReactUnityCustomAttributes { }
    interface IntrinsicElements extends UIToolkitElements, ReactUnityCustomElements { }
  }
}

export namespace JSX {
  export type ElementType = React.JSX.ElementType;
  export interface Element extends React.JSX.Element { }
  export interface ElementClass extends React.JSX.ElementClass { }
  export interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty { }
  export interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute { }
  export type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes, ReactUnityCustomAttributes { }
  export interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> { }
  export interface IntrinsicElements extends UIToolkitElements, ReactUnityCustomElements { }
}
