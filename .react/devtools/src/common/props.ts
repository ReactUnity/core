import { ReactUnity as RU } from '@reactunity/renderer';
import React from 'react';
import { enumComponent, flagsComponent, objectComponent, sliderComponent, sliderintComponent } from '../components/other';
import { YogaValue2Field } from '../components/yogavalue2';
import { convertLengthToYoga, convertYogaToLength, floatDefaultGetter } from './helpers';

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
  partlessName?: string;
  source?: 'style' | 'layout';
  arrangement?: 'row' | 'rect' | 'corner';
  partTemplate?: string | ((part: StylePropPart) => string);
  component: React.FunctionComponent<StylePropComponentProps<T>> | React.ComponentClass<StylePropComponentProps<T>> | string;
  getter?: (val: any, el: RU.UGUI.Behaviours.ReactElement) => T;
  setter?: (val: T, el: RU.UGUI.Behaviours.ReactElement) => any;
}

export type StylePropPart = 'left' | 'right' | 'top' | 'bottom' | 'start' | 'end' | '';

export const fourDirectionParts: StylePropPart[] = ['', 'top', 'right', 'bottom', 'left'];

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
const borderRadiusField = { component: YogaValue2Field };

export const styleProps: StylePropGroup[] = [
  {
    props: [
      { name: 'Display', component: enumComponent('Facebook.Yoga.YogaDisplay'), label: 'Display', source: 'layout' },
      { name: 'position', component: enumComponent('ReactUnity.Types.PositionType'), label: 'Position Type' },
      { name: 'backgroundColor', component: 'color', label: 'Background Color' },
      { name: 'backgroundImage', component: objectComponent('UnityEngine.Texture2D'), label: 'Background Image' },
      { name: 'opacity', component: sliderComponent(), label: 'Opacity' },
      { name: 'zIndex', component: sliderintComponent(), label: 'Z-Index' },
      { name: 'visibility', component: 'toggle', label: 'Visibility' },
    ]
  },
  {
    label: 'Text',
    props: [
      { name: 'StyleDirection', component: enumComponent('Facebook.Yoga.YogaDirection'), label: 'Direction', source: 'layout' },
      { name: 'fontFamily', component: objectComponent('TMPro.TMP_FontAsset'), label: 'Font Family' },
      { name: 'color', component: 'color', label: 'Color' },
      { name: 'fontWeight', component: enumComponent('TMPro.FontWeight'), label: 'Font Weight' },
      { name: 'fontStyle', component: flagsComponent('TMPro.FontStyles'), label: 'Font Style' },
      { name: 'fontSize', label: 'Font Size', ...lengthField },
      { name: 'textAlign', component: enumComponent('TMPro.TextAlignmentOptions'), label: 'Text Align' },
      { name: 'textOverflow', component: enumComponent('TMPro.TextOverflowModes'), label: 'Text Overflow' },
      { name: 'textWrap', component: 'toggle', label: 'Text Wrap' },
      { name: 'content', component: 'input', label: 'Content' },
    ],
  },

  {
    props: [
      { name: 'transformOrigin', component: YogaValue2Field, label: 'Transform Origin' },
      { name: 'translate', component: YogaValue2Field, label: 'Translate' },
      { name: 'scale', component: 'vector3', label: 'Scale' },
      { name: 'rotate', component: 'vector3', label: 'Rotate' },
    ]
  },

  {
    props: [
      { name: 'pointerEvents', component: enumComponent('ReactUnity.Types.PointerEvents'), label: 'Pointer Events' },
      { name: 'appearance', component: enumComponent('ReactUnity.Types.Appearance'), label: 'Appearance' },
      { name: 'navigation', component: flagsComponent('UnityEngine.UI.Navigation+Mode'), label: 'Navigation' },
    ],
  },

  {
    props: [
      { name: 'Width', ...lengthField, label: 'Width', source: 'layout' },
      { name: 'Height', ...lengthField, label: 'Height', source: 'layout' },
      { name: 'MinWidth', ...lengthField, label: 'Min Width', source: 'layout' },
      { name: 'MinHeight', ...lengthField, label: 'Min Height', source: 'layout' },
      { name: 'MaxWidth', ...lengthField, label: 'Max Width', source: 'layout' },
      { name: 'MaxHeight', ...lengthField, label: 'Max Height', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'FlexDirection', component: enumComponent('Facebook.Yoga.YogaFlexDirection'), label: 'Flex Direction', source: 'layout' },
      { name: 'Overflow', component: enumComponent('Facebook.Yoga.YogaOverflow'), label: 'Overflow', source: 'layout' },
      { name: 'Wrap', component: enumComponent('Facebook.Yoga.YogaWrap'), label: 'Wrap', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'JustifyContent', component: enumComponent('Facebook.Yoga.YogaJustify'), label: 'Justify Content', source: 'layout' },
      { name: 'AlignItems', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Items', source: 'layout' },
      { name: 'AlignContent', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Content', source: 'layout' },
      { name: 'AlignSelf', component: enumComponent('Facebook.Yoga.YogaAlign'), label: 'Align Self', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'AspectRatio', component: 'float', label: 'Aspect Ratio', source: 'layout' },
      { name: 'FlexGrow', component: 'float', label: 'Flex Grow', source: 'layout' },
      { name: 'FlexShrink', component: 'float', label: 'Flex Shrink', source: 'layout' },
      { name: 'FlexBasis', ...lengthField, label: 'Flex Basis', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'borderRadius', ...borderRadiusField, label: 'Border Radius', arrangement: 'corner', partTemplate: (part) => `border${CornerHack[part]}Radius` },
      { name: 'borderColor', component: 'color', arrangement: 'rect', partTemplate: (part) => `border${PartCapitalize[part]}Color`, label: 'Border Color' },
      { name: 'BorderWidth', component: 'float', arrangement: 'rect', getter: floatDefaultGetter, partTemplate: (part) => `Border${PartCapitalize[part]}Width`, label: 'Border Width', source: 'layout' },
    ],
  },

  {
    props: [
      { name: 'Margin', ...lengthField, arrangement: 'rect', partTemplate: (part) => `Margin${PartCapitalize[part]}`, label: 'Margin', source: 'layout' },
      { name: 'Padding', ...lengthField, arrangement: 'rect', partTemplate: (part) => `Padding${PartCapitalize[part]}`, label: 'Padding', source: 'layout' },
      { name: 'Position', ...lengthField, arrangement: 'rect', partTemplate: (part) => PartCapitalize[part], label: 'Position', source: 'layout' },
    ]
  },
];


export const allProps = [];

for (let pIndex = 0; pIndex < styleProps.length; pIndex++) {
  const group = styleProps[pIndex];

  for (let index = 0; index < group.props.length; index++) {
    const prop = group.props[index];

    if (prop.arrangement) {
      for (let partIndex = 0; partIndex < fourDirectionParts.length; partIndex++) {
        const part = fourDirectionParts[partIndex];
        const partName = typeof prop.partTemplate === 'string' ? prop.partTemplate.replace('{part}', part) : prop.partTemplate(part);

        const { arrangement, partTemplate, ...rest } = prop;
        allProps.push({ ...rest, name: partName, partlessName: prop.name, label: partName } as StyleProp);
      }
    }
    else {
      allProps.push(prop);
    }
  }
}
