import { Facebook, ReactUnity as RU, UnityEngine as UE } from '@reactunity/renderer';
import React from 'react';

export interface StylePropComponentProps<T = any> {
  className?: string;
  label?: string;
  value?: T;
  onChange?: (ev: { newValue: T }) => void;
}

export interface StyleProp<T = any> {
  name: string;
  label?: string;
  type: string;
  source?: 'style' | 'layout';
  arrangement?: 'row' | 'rect' | 'corner';
  partTemplate?: string | ((part: StylePropPart) => string);
  component: React.FunctionComponent<StylePropComponentProps<T>> | React.ComponentClass<StylePropComponentProps<T>> | string;
  getter?: (val: any, el: RU.Layout.ReactElement) => T;
  setter?: (val: T, el: RU.Layout.ReactElement) => any;
}

function sliderComponent(min = 0, max = 1) {
  return (props: StylePropComponentProps<number>) => <slider {...props} />;
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


export const styleProps: StyleProp[] = [
  { name: 'opacity', type: 'float', component: sliderComponent(), label: 'opacity' },
  { name: 'zIndex', type: 'int', component: 'integer', label: 'zIndex' },
  { name: 'visibility', type: 'bool', component: 'toggle', label: 'visibility' },
  { name: 'cursor', type: 'string', component: 'input', label: 'cursor' },
  { name: 'pointerEvents', type: 'PointerEvents', component: null, label: 'pointerEvents' },
  { name: 'backgroundColor', type: 'Color', component: 'color', label: 'backgroundColor' },
  { name: 'backgroundImage', type: 'ImageReference', component: null, label: 'backgroundImage' },
  { name: 'boxShadow', type: 'ShadowDefinition', component: null, label: 'boxShadow' },
  { name: 'transformOrigin', type: 'YogaValue2', component: null, label: 'transformOrigin' },
  { name: 'translate', type: 'YogaValue2', component: null, label: 'translate' },
  { name: 'scale', type: 'Vector2', component: 'vector2', label: 'scale' },
  { name: 'rotate', type: 'float', component: 'float', label: 'rotate' },
  { name: 'fontFamily', type: 'FontReference', component: null, label: 'fontFamily' },
  { name: 'color', type: 'Color', component: 'color', label: 'color' },
  { name: 'fontWeight', type: 'FontWeight', component: null, label: 'fontWeight' },
  { name: 'fontStyle', type: 'FontStyles', component: null, label: 'fontStyle' },
  { name: 'fontSize', type: 'YogaValue', component: null, label: 'fontSize' },
  { name: 'textAlign', type: 'TextAlignmentOptions', component: null, label: 'textAlign' },
  { name: 'textOverflow', type: 'TextOverflowModes', component: null, label: 'textOverflow' },
  { name: 'textWrap', type: 'bool', component: 'toggle', label: 'textWrap' },
  { name: 'content', type: 'string', component: 'input', label: 'content' },
  { name: 'appearance', type: 'Appearance', component: null, label: 'appearance' },
  { name: 'navigation', type: 'Navigation', component: null, label: 'navigation' },


  { name: 'borderRadius', type: 'int', component: 'integer', label: 'Border Radius', arrangement: 'corner', partTemplate: (part) => `border${CornerHack[part]}Radius` },
  { name: 'borderColor', type: 'Color', component: 'color', arrangement: 'rect', partTemplate: (part) => `border${PartCapitalize[part]}Color`, label: 'Border Color' },
  { name: 'BorderWidth', type: 'float', component: 'float', arrangement: 'rect', partTemplate: (part) => `Border${PartCapitalize[part]}Width`, label: 'Border Width', source: 'layout' },
  { name: 'Margin', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => `Margin${PartCapitalize[part]}`, label: 'Margin', source: 'layout' },
  { name: 'Padding', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => `Padding${PartCapitalize[part]}`, label: 'Padding', source: 'layout' },
  { name: 'Position', type: 'YogaValue', component: 'length', getter: convertYogaToLength, setter: convertLengthToYoga, arrangement: 'rect', partTemplate: (part) => PartCapitalize[part], label: 'Position', source: 'layout' },
];

// TODO: cleanup
// const ns = importNamespace('Facebook' as any) as typeof Facebook;
// const YogaValue = (ns.YogaValue as any)();
// const YogaUnit = ns.Yoga.YogaUnit;
const StyleLength = UnityEngine.UIElements.StyleLength;
const StyleKeyword = UnityEngine.UIElements.StyleKeyword;
const Length = UnityEngine.UIElements.Length;
const LengthUnit = UnityEngine.UIElements.LengthUnit;

/* eslint-disable eqeqeq */
function convertLengthToYoga(value: UE.UIElements.StyleLength): Facebook.Yoga.YogaValue | string {
  if (value.keyword == 2) return 'auto' as any;
  if (value.keyword == 1 || value.keyword == 4)
    return null;
  if (value.value.unit == 1) return value.value.value + '%';
  if (value.value.unit == 0) return value.value.value + 'px';
  return null;
}

function convertYogaToLength(value: Facebook.Yoga.YogaValue): UE.UIElements.StyleLength {
  if (value.Unit == 3) return new StyleLength(StyleKeyword.Auto);
  if (value.Unit == 0) return new StyleLength(StyleKeyword.Null);
  if (isNaN(value.Value)) return new StyleLength(StyleKeyword.Null);
  if (value.Unit == 2) return new StyleLength(new Length(value.Value, LengthUnit.Percent));
  if (value.Unit == 1) return new StyleLength(new Length(value.Value, LengthUnit.Pixel));
  return new StyleLength(StyleKeyword.Initial);
}
/* eslint-enable eqeqeq */
