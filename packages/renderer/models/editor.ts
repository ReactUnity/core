
import * as rc from 'react';
import * as Components from './components';
import { ReactUnity } from './generated';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;


import Cmp = ReactUnity.Editor.Renderer.Components;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty {
      props: any;
    }

    interface ElementChildrenAttribute {
      children: any;
    }

    interface IntrinsicElements {
      [key: string]: Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      view: Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & { tag?: string } & Children;
      anchor: Components.Anchor & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      text: Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      input: Components.Input & rc.RefAttributes<Cmp.EditorReactComponent> & Children<never>;
      scroll: Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      image: Components.Image & rc.RefAttributes<Cmp.EditorReactComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<Cmp.EditorReactComponent> & Children<never>;
    }
  }
}
