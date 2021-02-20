
import * as rc from 'react';
import * as Components from './components';
import { ReactUnity } from './generated';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty {
      props: any;
    }

    interface ElementChildrenAttribute {
      children: any;
    }

    interface IntrinsicElements {
      [key: string]: Components.View & rc.RefAttributes<ReactUnity.Components.ReactComponent> & Children;
      view: Components.View & rc.RefAttributes<ReactUnity.Components.ContainerComponent> & { tag?: string } & Children;
      anchor: Components.Anchor & rc.RefAttributes<ReactUnity.Components.AnchorComponent> & Children;
      text: Components.View & rc.RefAttributes<ReactUnity.Components.TextComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<ReactUnity.Components.ButtonComponent> & Children;
      input: Components.Input & rc.RefAttributes<ReactUnity.Components.InputComponent> & Children<never>;
      scroll: Components.View & rc.RefAttributes<ReactUnity.Components.ScrollComponent> & Children;
      image: Components.Image & rc.RefAttributes<ReactUnity.Components.ImageComponent> & Children<never>;
      rawimage: Components.Image & rc.RefAttributes<ReactUnity.Components.RawImageComponent> & Children<never>;
      video: Components.Video & rc.RefAttributes<ReactUnity.Components.VideoComponent> & Children<never>;
      render: Components.Video & rc.RefAttributes<ReactUnity.Components.RenderTextureComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<ReactUnity.Components.ToggleComponent> & Children<never>;
    }
  }
}
