
import * as rc from 'react';
import { ReactUnity, UnityEngine } from '../generated';
import * as Components from './components';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;

import Cmp = ReactUnity.Editor.Renderer.Components;

type BaseElement<T = Cmp.EditorReactComponent> = Components.View<T> & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
type BaseFieldComponent<T> = Cmp.EditorBaseFieldComponent<BaseElement, T>;
type BaseFieldElement<T, TSender = BaseFieldComponent<T>> = Components.BaseField<T, TSender> & rc.RefAttributes<TSender> & Children;
type BaseFieldElementSimple<T> = BaseFieldElement<T, BaseFieldComponent<T>>;


declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

    interface IntrinsicElements {
      [key: string]: BaseElement<any>;
      view: BaseElement & { tag?: string };
      anchor: Components.Anchor & rc.RefAttributes<Cmp.EditorReactComponent> & Children;
      text: Components.View & rc.RefAttributes<Cmp.EditorTextComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<Cmp.EditorButtonComponent> & Children;
      scroll: BaseElement;
      image: Components.Image & rc.RefAttributes<Cmp.EditorReactComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<Cmp.EditorToggleComponent> & Children;
      input: BaseFieldElementSimple<string>;
      helpbox: BaseElement;
      foldout: BaseElement;
      popup: BaseElement;
      slider: BaseFieldElementSimple<number>;
      sliderint: BaseFieldElementSimple<number>;
      range: BaseFieldElementSimple<UnityEngine.Vector2>;
      repeat: BaseElement;
      scroller: BaseElement;
      list: BaseElement;
      imgui: Components.IMGUI & rc.RefAttributes<Cmp.EditorIMGUIComponent> & Children<never>;
      template: BaseElement;

      color: BaseFieldElementSimple<UnityEngine.Color>;
      bounds: BaseFieldElementSimple<UnityEngine.Bounds>;
      boundsint: BaseFieldElementSimple<UnityEngine.BoundsInt>;
      curve: BaseFieldElementSimple<UnityEngine.AnimationCurve>;
      double: BaseFieldElementSimple<number>;
      enum: BaseFieldElementSimple<number>;
      flags: BaseFieldElementSimple<number>;
      float: BaseFieldElementSimple<number>;
      gradient: BaseFieldElementSimple<UnityEngine.Gradient>;
      inspector: BaseElement;
      integer: BaseFieldElementSimple<number>;
      layer: BaseFieldElementSimple<number>;
      layermask: BaseFieldElementSimple<number>;
      long: BaseFieldElementSimple<number>;
      mask: BaseFieldElementSimple<number>;
      object: BaseFieldElementSimple<UnityEngine.Object>;
      progress: BaseElement;
      property: BaseElement;
      rect: BaseFieldElementSimple<UnityEngine.Rect>;
      rectint: BaseFieldElementSimple<UnityEngine.RectInt>;
      tag: BaseFieldElementSimple<string>;
      vector2: BaseFieldElementSimple<UnityEngine.Vector2>;
      vector2int: BaseFieldElementSimple<UnityEngine.Vector2Int>;
      vector3: BaseFieldElementSimple<UnityEngine.Vector4>;
      vector3int: BaseFieldElementSimple<UnityEngine.Vector3Int>;
      vector4: BaseFieldElementSimple<UnityEngine.Vector4>;
      length: BaseFieldElementSimple<UnityEngine.UIElements.StyleLength>;
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
