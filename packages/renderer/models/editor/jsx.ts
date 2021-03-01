
import * as rc from 'react';
import * as Components from './components';
import { ReactUnity } from '../generated';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;


type BaseElement = Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & Children;

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
      [key: string]: BaseElement;
      view: BaseElement & { tag?: string };
      anchor: Components.Anchor & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      text: Components.View & rc.RefAttributes<Cmp.EditorReactComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      scroll: BaseElement;
      image: Components.Image & rc.RefAttributes<Cmp.EditorReactComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      helpbox: BaseElement;
      foldout: BaseElement;
      popup: BaseElement;
      slider: BaseElement;
      sliderint: BaseElement;
      range: BaseElement;
      repeat: BaseElement;
      scroller: BaseElement;
      list: BaseElement;
      imgui: BaseElement;
      template: BaseElement;

      color: BaseElement;
      bounds: BaseElement;
      boundsint: BaseElement;
      curve: BaseElement;
      double: BaseElement;
      enum: BaseElement;
      flags: BaseElement;
      float: BaseElement;
      gradient: BaseElement;
      inspector: BaseElement;
      integer: BaseElement;
      layer: BaseElement;
      layermask: BaseElement;
      long: BaseElement;
      mask: BaseElement;
      object: BaseElement;
      progress: BaseElement;
      property: BaseElement;
      rect: BaseElement;
      rectint: BaseElement;
      tag: BaseElement;
      vector2: BaseElement;
      vector2int: BaseElement;
      vector3: BaseElement;
      vector3int: BaseElement;
      vector4: BaseElement;
      toolbar: BaseElement;
      'tb-breadcrumbs': BaseElement;
      'tb-button': BaseElement;
      'tb-menu': BaseElement;
      'tb-popupsearch': BaseElement;
      'tb-search': BaseElement;
      'tb-spacer': BaseElement;
      'tb-toggle': BaseElement;
    }
  }
}
