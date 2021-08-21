
import { Attributes, ClassAttributes, RefAttributes } from 'react';
import { StyleCmpDef, Textable } from '../base';
import { ReactUnity } from '../generated';
import * as Components from './components';
import { Input } from './input';
import NS = ReactUnity.UGUI;

type Children<T = any> = { children?: T };
type BaseCmp = Components.View<any> & RefAttributes<NS.UGUIComponent> & Children;

export interface UGUIElements {
  [key: string]: BaseCmp | StyleCmpDef;
  style: StyleCmpDef;
  view: Components.View & RefAttributes<NS.ContainerComponent> & { tag?: string } & Children;
  anchor: Components.Anchor & RefAttributes<NS.AnchorComponent> & Children;
  text: Components.Text & RefAttributes<NS.TextComponent> & Children<Textable | Textable[]>;
  label: Components.Label & RefAttributes<NS.LabelComponent> & Children;
  icon: Components.Icon & RefAttributes<NS.IconComponent> & Children<Textable | Textable[]>;
  button: Components.Button & RefAttributes<NS.ButtonComponent> & Children;
  input: Input & RefAttributes<NS.InputComponent> & Children<never>;
  scroll: Components.Scroll & RefAttributes<NS.ScrollComponent> & Children;
  image: Components.Image & RefAttributes<NS.ImageComponent> & Children<never>;
  rawimage: Components.RawImage & RefAttributes<NS.RawImageComponent> & Children<never>;
  svg: Components.SvgImage & RefAttributes<NS.SvgComponent> & Children<never>;
  video: Components.Video & RefAttributes<NS.VideoComponent> & Children<never>;
  render: Components.Render & RefAttributes<NS.RenderComponent> & Children<never>;
  object: Components.Object & RefAttributes<NS.ObjectComponent> & Children<never>;
  toggle: Components.Toggle & RefAttributes<NS.ToggleComponent> & Children<never>;
  prefab: Components.Prefab & RefAttributes<NS.PrefabComponent> & Children<never>;
  portal: Components.Portal & RefAttributes<NS.PortalComponent> & Children;
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends Attributes { }
    interface IntrinsicClassAttributes<T> extends ClassAttributes<T> { }
    interface IntrinsicElements extends UGUIElements { }
  }
}
