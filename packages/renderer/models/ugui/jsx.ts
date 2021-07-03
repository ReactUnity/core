
import * as rc from 'react';
import { ReactUnity } from '../generated';
import * as Components from './components';
import { Input } from './input';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

    interface IntrinsicElements {
      [key: string]: Components.View<any> & rc.RefAttributes<ReactUnity.UGUI.UGUIComponent> & Children;
      view: Components.View & rc.RefAttributes<ReactUnity.UGUI.ContainerComponent> & { tag?: string } & Children;
      anchor: Components.Anchor & rc.RefAttributes<ReactUnity.UGUI.AnchorComponent> & Children;
      text: Components.Text & rc.RefAttributes<ReactUnity.UGUI.TextComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<ReactUnity.UGUI.ButtonComponent> & Children;
      input: Input & rc.RefAttributes<ReactUnity.UGUI.InputComponent> & Children<never>;
      scroll: Components.Scroll & rc.RefAttributes<ReactUnity.UGUI.ScrollComponent> & Children;
      image: Components.Image & rc.RefAttributes<ReactUnity.UGUI.ImageComponent> & Children<never>;
      rawimage: Components.RawImage & rc.RefAttributes<ReactUnity.UGUI.RawImageComponent> & Children<never>;
      svg: Components.SvgImage & rc.RefAttributes<ReactUnity.UGUI.SvgComponent> & Children<never>;
      video: Components.Video & rc.RefAttributes<ReactUnity.UGUI.VideoComponent> & Children<never>;
      render: Components.Render & rc.RefAttributes<ReactUnity.UGUI.RenderComponent> & Children<never>;
      object: Components.Object & rc.RefAttributes<ReactUnity.UGUI.ObjectComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<ReactUnity.UGUI.ToggleComponent> & Children<never>;
    }
  }
}
