import { ReactUnity as RU } from '@reactunity/renderer/editor';
import React from 'react';
import { BoxShadowField } from './components/box-shadow';
import { enumComponent, flagsComponent, objectComponent, sliderComponent, sliderintComponent } from './components/other';
import { YogaValue2Field } from './components/yogavalue2';
import { convertFloatToLength, convertLengthToFloat, convertLengthToYoga, convertYogaToLength, floatDefaultGetter } from './helpers';

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

const lengthField = { component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga };
const borderRadiusField = { component: 'length', getter: convertFloatToLength, setter: convertLengthToFloat };

export const styleProps: StylePropGroup[] = [
  {
    props: [
      { name: 'Display', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaDisplay'), label: 'Display', source: 'layout' },
      { name: 'PositionType', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaPositionType'), label: 'Position Type', source: 'layout' },
      { name: 'backgroundColor', type: 'Color', component: 'color', label: 'Background Color' },
      { name: 'backgroundImage', type: 'ImageReference', component: objectComponent('UnityEngine.Texture2D'), label: 'Background Image' },
      { name: 'opacity', type: 'float', component: sliderComponent(), label: 'Opacity' },
      { name: 'zIndex', type: 'int', component: sliderintComponent(), label: 'Z-Index' },
      { name: 'visibility', type: 'bool', component: 'toggle', label: 'Visibility' },
    ]
  },
  {
    props: [
      { name: 'boxShadow', type: 'BoxShadowList', component: BoxShadowField, label: 'Box Shadow' },
    ],
  },
  {
    label: 'Text',
    props: [
      { name: 'StyleDirection', type: 'Enum', component: enumComponent('Facebook.Yoga.YogaDirection'), label: 'Direction', source: 'layout' },
      { name: 'fontFamily', type: 'FontReference', component: objectComponent('TMPro.TMP_FontAsset'), label: 'Font Family' },
      { name: 'color', type: 'Color', component: 'color', label: 'Color' },
      { name: 'fontWeight', type: 'FontWeight', component: enumComponent('TMPro.FontWeight'), label: 'Font Weight' },
      { name: 'fontStyle', type: 'FontStyles', component: flagsComponent('TMPro.FontStyles'), label: 'Font Style' },
      { name: 'fontSize', type: 'YogaValue', label: 'Font Size', ...lengthField },
      { name: 'textAlign', type: 'TextAlignmentOptions', component: enumComponent('TMPro.TextAlignmentOptions'), label: 'Text Align' },
      { name: 'textOverflow', type: 'TextOverflowModes', component: enumComponent('TMPro.TextOverflowModes'), label: 'Text Overflow' },
      { name: 'textWrap', type: 'bool', component: 'toggle', label: 'Text Wrap' },
      { name: 'content', type: 'string', component: 'input', label: 'Content' },
    ],
  },

  {
    props: [
      { name: 'transformOrigin', type: 'YogaValue2', component: YogaValue2Field, label: 'Transform Origin' },
      { name: 'translate', type: 'YogaValue2', component: YogaValue2Field, label: 'Translate' },
      { name: 'scale', type: 'Vector2', component: 'vector2', label: 'Scale' },
      { name: 'rotate', type: 'Vector3', component: 'vector3', label: 'Rotate' },
    ]
  },

  {
    props: [
      { name: 'cursor', type: 'string', component: 'input', label: 'Cursor' },
      { name: 'pointerEvents', type: 'PointerEvents', component: enumComponent('ReactUnity.Styling.Types.PointerEvents'), label: 'Pointer Events' },
      { name: 'appearance', type: 'Appearance', component: enumComponent('ReactUnity.Styling.Types.Appearance'), label: 'Appearance' },
      { name: 'navigation', type: 'Navigation', component: flagsComponent('UnityEngine.UI.Navigation+Mode'), label: 'Navigation' },
    ],
  },

  {
    props: [
      { name: 'Width', type: 'YogaValue', ...lengthField, label: 'Width', source: 'layout' },
      { name: 'Height', type: 'YogaValue', ...lengthField, label: 'Height', source: 'layout' },
      { name: 'MinWidth', type: 'YogaValue', ...lengthField, label: 'Min Width', source: 'layout' },
      { name: 'MinHeight', type: 'YogaValue', ...lengthField, label: 'Min Height', source: 'layout' },
      { name: 'MaxWidth', type: 'YogaValue', ...lengthField, label: 'Max Width', source: 'layout' },
      { name: 'MaxHeight', type: 'YogaValue', ...lengthField, label: 'Max Height', source: 'layout' },
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
      { name: 'FlexBasis', type: 'YogaValue', ...lengthField, label: 'Flex Basis', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'borderRadius', type: 'float', ...borderRadiusField, label: 'Border Radius', arrangement: 'corner', partTemplate: (part) => `border${CornerHack[part]}Radius` },
      { name: 'borderColor', type: 'Color', component: 'color', arrangement: 'rect', partTemplate: (part) => `border${PartCapitalize[part]}Color`, label: 'Border Color' },
      { name: 'BorderWidth', type: 'float', component: 'float', arrangement: 'rect', getter: floatDefaultGetter, partTemplate: (part) => `Border${PartCapitalize[part]}Width`, label: 'Border Width', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'Margin', type: 'YogaValue', ...lengthField, arrangement: 'rect', partTemplate: (part) => `Margin${PartCapitalize[part]}`, label: 'Margin', source: 'layout' },
      { name: 'Padding', type: 'YogaValue', ...lengthField, arrangement: 'rect', partTemplate: (part) => `Padding${PartCapitalize[part]}`, label: 'Padding', source: 'layout' },
      { name: 'Position', type: 'YogaValue', ...lengthField, arrangement: 'rect', partTemplate: (part) => PartCapitalize[part], label: 'Position', source: 'layout' },
    ]
  },
];
