
import * as rc from 'react';
import * as Components from './components';
import { NativeInstance, NativeTextInstance, NativeInputInstance, NativeToggleInstance, NativeVideoInstance } from './renderer';

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
      [key: string]: Components.View & rc.RefAttributes<NativeInstance> & Children;
      view: Components.View & rc.RefAttributes<NativeInstance> & { tag?: string } & Children;
      anchor: Components.Anchor & rc.RefAttributes<NativeInstance> & Children;
      text: Components.View & rc.RefAttributes<NativeTextInstance> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<NativeInstance> & Children;
      input: Components.Input & rc.RefAttributes<NativeInputInstance> & Children<never>;
      scroll: Components.View & rc.RefAttributes<NativeInstance> & Children;
      image: Components.Image & rc.RefAttributes<NativeInstance> & Children<never>;
      video: Components.Video & rc.RefAttributes<NativeVideoInstance> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<NativeToggleInstance> & Children<never>;
    }
  }
}
