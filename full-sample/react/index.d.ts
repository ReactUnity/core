// This file can be necessary in local development. Keep it for now.

import * as rc from 'react';
import { NativeInstance, NativeTextInstance, NativeInputInstance, NativeToggleInstance, View, Button, Input, Image, Toggle } from 'react-unity-renderer';

type Children<T = any> = { children?: T };

declare module "React" {
  export namespace JSX {
    export interface ElementChildrenAttribute {
      children: {};
    }

    export interface IntrinsicElements {
      view: View & rc.RefAttributes<NativeInstance> & Children;
      text: View & rc.RefAttributes<NativeTextInstance> & Children<string | number | boolean | null | undefined>;
      button: Button & rc.RefAttributes<NativeInstance> & Children;
      input: Input & rc.RefAttributes<NativeInputInstance> & Children<never>;
      scroll: View & rc.RefAttributes<NativeInstance> & Children;
      image: Image & rc.RefAttributes<NativeInstance> & Children<never>;
      toggle: Toggle & rc.RefAttributes<NativeToggleInstance> & Children<never>;
    }
  }
}

