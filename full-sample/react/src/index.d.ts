// This file is only required for internal development. You should NOT have this file in your projects.
// If you remove this file, don't forget to remove 'index.d.ts' line from tsconfig.json

import * as rc from 'react';
import { NativeInstance, NativeTextInstance, NativeInputInstance, NativeToggleInstance, View, Button, Input, Image, Toggle, Anchor } from 'react-unity-renderer';

type Children<T = any> = { children?: T };

declare module 'React' {
  namespace JSX {
    interface ElementAttributesProperty {
      props;
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicElements {
      view: View & rc.RefAttributes<NativeInstance> & Children;
      anchor: Anchor & rc.RefAttributes<NativeInstance> & Children;
      text: View & rc.RefAttributes<NativeTextInstance> & Children<string | number | boolean | null | undefined>;
      button: Button & rc.RefAttributes<NativeInstance> & Children;
      input: Input & rc.RefAttributes<NativeInputInstance> & Children<never>;
      scroll: View & rc.RefAttributes<NativeInstance> & Children;
      image: Image & rc.RefAttributes<NativeInstance> & Children<never>;
      toggle: Toggle & rc.RefAttributes<NativeToggleInstance> & Children<never>;
    }
  }
}

