
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
      [key: string]: Components.View<any> & rc.RefAttributes<ReactUnity.Components.ReactComponent> & Children;
      view: Components.View & rc.RefAttributes<ReactUnity.Components.ContainerComponent> & { tag?: string } & Children;
      anchor: Components.Anchor & rc.RefAttributes<ReactUnity.Components.AnchorComponent> & Children;
      text: Components.Text & rc.RefAttributes<ReactUnity.Components.TextComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<ReactUnity.Components.ButtonComponent> & Children;
      input: Input & rc.RefAttributes<ReactUnity.Components.InputComponent> & Children<never>;
      scroll: Components.Scroll & rc.RefAttributes<ReactUnity.Components.ScrollComponent> & Children;
      image: Components.Image & rc.RefAttributes<ReactUnity.Components.ImageComponent> & Children<never>;
      rawimage: Components.RawImage & rc.RefAttributes<ReactUnity.Components.RawImageComponent> & Children<never>;
      svg: Components.SvgImage & rc.RefAttributes<ReactUnity.Components.SvgComponent> & Children<never>;
      video: Components.Video & rc.RefAttributes<ReactUnity.Components.VideoComponent> & Children<never>;
      render: Components.Render & rc.RefAttributes<ReactUnity.Components.RenderComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<ReactUnity.Components.ToggleComponent> & Children<never>;
    }
  }
}
