import { Facebook as FB, ReactUnity as RU, UnityEngine as UE } from '@reactunity/renderer';
import React from 'react';

export interface StylePropComponentProps<T = any> {
  className?: string;
  label?: string;
  value?: T;
  onChange?: (ev: { newValue: T }) => void;
}

export interface StylePropGroup {
  label?: string;
  props: StyleProp[];
}

export interface StyleProp<T = any> {
  name: string;
  label?: string;
  type: string;
  partlessName?: string;
  source?: 'style' | 'layout';
  arrangement?: 'row' | 'rect' | 'corner';
  partTemplate?: string | ((part: StylePropPart) => string);
  component: React.FunctionComponent<StylePropComponentProps<T>> | React.ComponentClass<StylePropComponentProps<T>> | string;
  getter?: (val: any, el: RU.Layout.ReactElement) => T;
  setter?: (val: T, el: RU.Layout.ReactElement) => any;
}

function sliderComponent(min = 0, max = 1) {
  return (props: StylePropComponentProps<number>) => <slider {...props} min={min} max={max} />;
}

function enumComponent(typeName: string) {
  return (props: StylePropComponentProps<number>) => <enum {...props} type={typeName} />;
}

export type StylePropPart = 'left' | 'right' | 'top' | 'bottom' | 'start' | 'end' | '';

export const CornerHack = {
  'left': 'TopLeft',
  'top': 'TopRight',
  'right': 'BottomRight',
  'bottom': 'BottomLeft',
  '': '',
};

export const CornerLabels = {
  'left': 'TL',
  'top': 'TR',
  'right': 'BR',
  'bottom': 'BL',
  '': '',
};

export const PartCapitalize = {
  'left': 'Left',
  'right': 'Right',
  'top': 'Top',
  'bottom': 'Bottom',
  'start': 'Start',
  'end': 'End',
  '': '',
};


export const styleProps: StylePropGroup[] = [
  {
    props: [
      { name: 'Display', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaDisplay'), label: 'Display', source: 'layout' },
      { name: 'PositionType', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaPositionType'), label: 'Position Type', source: 'layout' },
      { name: 'backgroundColor', type: 'Color', component: 'color', label: 'Background Color' },
      { name: 'backgroundImage', type: 'ImageReference', component: null, label: 'Background Image' },
      { name: 'boxShadow', type: 'ShadowDefinition', component: null, label: 'Box Shadow' },
      { name: 'opacity', type: 'float', component: sliderComponent(), label: 'Opacity' },
      { name: 'zIndex', type: 'int', component: 'integer', label: 'Z-Index' },
      { name: 'visibility', type: 'bool', component: 'toggle', label: 'Visibility' },
    ]
  },
  {
    label: 'Text',
    props: [
      { name: 'StyleDirection', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaDirection'), label: 'Direction', source: 'layout' },
      { name: 'fontFamily', type: 'FontReference', component: null, label: 'Font Family' },
      { name: 'color', type: 'Color', component: 'color', label: 'Color' },
      { name: 'fontWeight', type: 'FontWeight', component: null, label: 'Font Weight' },
      { name: 'fontStyle', type: 'FontStyles', component: null, label: 'Font Style' },
      { name: 'fontSize', type: 'YogaValue', component: null, label: 'Font Size' },
      { name: 'textAlign', type: 'TextAlignmentOptions', component: null, label: 'Text Align' },
      { name: 'textOverflow', type: 'TextOverflowModes', component: null, label: 'Text Overflow' },
      { name: 'textWrap', type: 'bool', component: 'toggle', label: 'Text Wrap' },
      { name: 'content', type: 'string', component: 'input', label: 'Content' },
    ],
  },

  {
    props: [
      { name: 'transformOrigin', type: 'YogaValue2', component: null, label: 'TransformOrigin' },
      { name: 'translate', type: 'YogaValue2', component: null, label: 'Translate' },
      { name: 'scale', type: 'Vector2', component: 'vector2', label: 'Scale' },
      { name: 'rotate', type: 'float', component: 'float', label: 'Rotate' },
    ]
  },

  {
    props: [
      { name: 'cursor', type: 'string', component: 'input', label: 'Cursor' },
      { name: 'pointerEvents', type: 'PointerEvents', component: null, label: 'Pointer Events' },
      { name: 'appearance', type: 'Appearance', component: null, label: 'Appearance' },
      { name: 'navigation', type: 'Navigation', component: null, label: 'Navigation' },
    ],
  },

  {
    props: [
      { name: 'Width', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Width', source: 'layout' },
      { name: 'Height', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Height', source: 'layout' },
      { name: 'MinWidth', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Min Width', source: 'layout' },
      { name: 'MinHeight', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Min Height', source: 'layout' },
      { name: 'MaxWidth', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Min Width', source: 'layout' },
      { name: 'MaxHeight', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Min Height', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'FlexDirection', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaFlexDirection'), label: 'Flex Direction', source: 'layout' },
      { name: 'Overflow', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaOverflow'), label: 'Overflow', source: 'layout' },
      { name: 'Wrap', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaWrap'), label: 'Wrap', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'JustifyContent', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaJustify'), label: 'Justify Content', source: 'layout' },
      { name: 'AlignItems', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Items', source: 'layout' },
      { name: 'AlignContent', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Content', source: 'layout' },
      { name: 'AlignSelf', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Self', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'AspectRatio', type: 'float', component: 'float', label: 'Aspect Ratio', source: 'layout' },
      { name: 'FlexGrow', type: 'float', component: 'float', label: 'Flex Grow', source: 'layout' },
      { name: 'FlexShrink', type: 'float', component: 'float', label: 'Flex Shrink', source: 'layout' },
      { name: 'FlexBasis', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, label: 'Flex Basis', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'borderRadius', type: 'int', component: 'integer', label: 'Border Radius', arrangement: 'corner', partTemplate: (part) => `border${CornerHack[part]}Radius` },
      { name: 'borderColor', type: 'Color', component: 'color', arrangement: 'rect', partTemplate: (part) => `border${PartCapitalize[part]}Color`, label: 'Border Color' },
      { name: 'BorderWidth', type: 'float', component: 'float', arrangement: 'rect', getter: floatDefaultGetter, partTemplate: (part) => `Border${PartCapitalize[part]}Width`, label: 'Border Width', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'Margin', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => `Margin${PartCapitalize[part]}`, label: 'Margin', source: 'layout' },
      { name: 'Padding', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => `Padding${PartCapitalize[part]}`, label: 'Padding', source: 'layout' },
      { name: 'Position', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => PartCapitalize[part], label: 'Position', source: 'layout' },
    ]
  },
];

const StyleLength = UnityEngine.UIElements.StyleLength;
const StyleKeyword = UnityEngine.UIElements.StyleKeyword;
const Length = UnityEngine.UIElements.Length;
const LengthUnit = UnityEngine.UIElements.LengthUnit;

/* eslint-disable eqeqeq */
function convertLengthToYoga(value: UE.UIElements.StyleLength): FB.Yoga.YogaValue | string {
  if (value.keyword == 2) return 'auto' as any;
  if (value.keyword == 1 || value.keyword == 4 || value.keyword == 3) return null;
  if (value.value.unit == 1) return value.value.value + '%';
  if (value.value.unit == 0) return value.value.value + 'px';
  return null;
}

function convertYogaToLength(value: FB.Yoga.YogaValue): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (value.Unit == 3) len.keyword = StyleKeyword.Auto;
  else if (value.Unit == 0) len.keyword = StyleKeyword.None;
  else if (isNaN(value.Value)) len.keyword = StyleKeyword.Null;
  else if (value.Unit == 2) len.value = new Length(value.Value, LengthUnit.Percent);
  else if (value.Unit == 1) len.value = new Length(value.Value, LengthUnit.Pixel);
  return len;
}
/* eslint-enable eqeqeq */

function floatDefaultGetter(value: number) {
  return value || 0;
}
