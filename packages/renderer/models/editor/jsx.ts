
import * as rc from 'react';
import { ReactUnity, UnityEngine } from '../generated';
import * as Components from './components';

type Children<T = any> = { children?: T };

type Textable = string | number | boolean | null | undefined;

import Cmp = ReactUnity.Editor.Components;

type BaseElement<T = Cmp.EditorComponent> = Components.View<T> & rc.RefAttributes<Cmp.EditorComponent> & Children;
type BaseFieldComponent<T> = Cmp.BaseFieldComponent<BaseElement, T>;
type BaseFieldElement<T, TSender = BaseFieldComponent<T>> = Components.BaseField<T, TSender> & rc.RefAttributes<TSender> & Children<never>;
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
      box: BaseElement;
      anchor: Components.Anchor & rc.RefAttributes<Cmp.EditorComponent> & Children;
      text: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
      label: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
      button: Components.Button & rc.RefAttributes<Cmp.ButtonComponent> & Children;
      scroll: BaseElement;
      image: Components.Image & rc.RefAttributes<Cmp.ImageComponent> & Children<never>;
      toggle: Components.Toggle & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
      input: BaseFieldElementSimple<string>;
      helpbox: BaseElement;
      foldout: BaseElement;
      popup: Components.View & rc.RefAttributes<Cmp.TextComponent> & Children<Textable | Textable[]>;
      slider: Components.Slider & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
      sliderint: Components.Slider & rc.RefAttributes<Cmp.ToggleComponent> & Children<never>;
      range: Components.Range & rc.RefAttributes<Cmp.RangeComponent> & Children<never>;
      repeat: BaseElement;
      scroller: BaseElement;
      list: Components.Bindable;
      imgui: Components.IMGUI & rc.RefAttributes<Cmp.IMGUIComponent> & Children<never>;
      template: Components.Bindable;

      color: BaseFieldElementSimple<UnityEngine.Color>;
      bounds: BaseFieldElementSimple<UnityEngine.Bounds>;
      boundsint: BaseFieldElementSimple<UnityEngine.BoundsInt>;
      curve: BaseFieldElementSimple<UnityEngine.AnimationCurve>;
      double: BaseFieldElementSimple<number>;
      enum: Components.EnumProps & rc.RefAttributes<Cmp.EnumComponent> & Children<never>;
      flags: Components.EnumProps & rc.RefAttributes<Cmp.EnumComponent> & Children<never>;
      float: BaseFieldElementSimple<number>;
      gradient: BaseFieldElementSimple<UnityEngine.Gradient>;
      inspector: Components.Bindable;
      integer: BaseFieldElementSimple<number>;
      layer: BaseFieldElementSimple<number>;
      layermask: BaseFieldElementSimple<number>;
      long: BaseFieldElementSimple<number>;
      mask: BaseFieldElementSimple<number>;
      object: Components.ObjectProps & rc.RefAttributes<Cmp.ObjectComponent> & Children<never>;
      progress: Components.ValueComponent<number>;
      property: Components.Bindable;
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
