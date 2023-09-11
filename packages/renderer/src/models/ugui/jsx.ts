
import { RefAttributes } from 'react';
import { BaseElements, Textable } from '../base';
import { ReactUnity } from '../generated';
import { SVGEelement } from '../svg';
import * as Components from './components';
import { Input } from './input';
import NS = ReactUnity.UGUI;

type Children<T = any> = { children?: T };
type BaseCmp = Components.View<any> & RefAttributes<NS.UGUIComponent> & Children;

export interface UGUIElements extends BaseElements<BaseCmp> {
  view: Components.View & RefAttributes<NS.ContainerComponent> & { tag?: string } & Children;
  a: Components.Anchor & RefAttributes<NS.AnchorComponent> & Children;
  anchor: Components.Anchor & RefAttributes<NS.AnchorComponent> & Children;
  text: Components.Text & RefAttributes<NS.TextComponent> & Children<Textable | Textable[]>;
  richtext: Components.Text & RefAttributes<NS.TextComponent> & Children<any>;
  label: Components.Label & RefAttributes<NS.LabelComponent> & Children;
  icon: Components.Icon & RefAttributes<NS.IconComponent> & Children<Textable | Textable[]>;
  button: Components.Button & RefAttributes<NS.ButtonComponent> & Children;
  input: Input & RefAttributes<NS.InputComponent> & Children<never>;
  scroll: Components.Scroll & RefAttributes<NS.ScrollComponent> & Children;
  img: Components.Image & RefAttributes<NS.ImageComponent> & Children<never>;
  image: Components.Image & RefAttributes<NS.ImageComponent> & Children<never>;
  rawimage: Components.RawImage & RefAttributes<NS.RawImageComponent> & Children<never>;
  svgimage: Components.SvgImage & RefAttributes<NS.SvgImageComponent> & Children<never>;
  svg: Components.Svg & RefAttributes<NS.SvgComponent> & Children<any> & SVGEelement;
  video: Components.Video & RefAttributes<NS.VideoComponent> & Children<never>;
  render: Components.Render & RefAttributes<NS.RenderComponent> & Children<never>;
  object: Components.Object & RefAttributes<NS.ObjectComponent> & Children<never>;
  toggle: Components.Toggle & RefAttributes<NS.ToggleComponent> & Children<never>;
  prefab: Components.Prefab & RefAttributes<NS.PrefabComponent> & Children<never>;
  portal: Components.Portal & RefAttributes<NS.PortalComponent> & Children;
}

declare global {
  interface ReactUnityCustomElements { }
  interface ReactUnityCustomAttributes { }

  namespace JSX {
    interface IntrinsicAttributes extends ReactUnityCustomAttributes {}
    interface IntrinsicElements extends UGUIElements, ReactUnityCustomElements {}
  }
}

export namespace JSX {
  export type ElementType = React.JSX.ElementType;
  export interface Element extends React.JSX.Element {}
  export interface ElementClass extends React.JSX.ElementClass {}
  export interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes, ReactUnityCustomAttributes {}
  export interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
  export interface IntrinsicElements extends UGUIElements, ReactUnityCustomElements {}
}
