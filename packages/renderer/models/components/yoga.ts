
import {
  Overflow, Direction, Display, Wrap, YogaJustify, PositionType, YogaAlign, FlexDirection,
} from './yoga-enums';
import { EnumOrLiteral } from '../values/enum';


// boolean, null and undefined are all mapped to undefined
// pt, px and no unit is mapped to Point unit, e.g. 50px -> 50 Points
// % is mapped to percentage, e.g. 50% -> 50 Percent
export type YogaValue = 'auto' | string | number | null | undefined | boolean | YogaValueNative;


export interface Layout {
  Data?: object;
  Overflow?: EnumOrLiteral<typeof Overflow>;
  StyleDirection?: EnumOrLiteral<typeof Direction>;
  Display?: EnumOrLiteral<typeof Display>;
  Wrap?: EnumOrLiteral<typeof Wrap>;
  PositionType?: EnumOrLiteral<typeof PositionType>;
  JustifyContent?: EnumOrLiteral<typeof YogaJustify>;
  AlignContent?: EnumOrLiteral<typeof YogaAlign>;
  AlignSelf?: EnumOrLiteral<typeof YogaAlign>;
  AlignItems?: EnumOrLiteral<typeof YogaAlign>;
  BorderWidth?: number;
  BorderStartWidth?: number;
  BorderEndWidth?: number;
  BorderTopWidth?: number;
  BorderRightWidth?: number;
  BorderBottomWidth?: number;
  BorderLeftWidth?: number;
  AspectRatio?: number;
  FlexDirection?: EnumOrLiteral<typeof FlexDirection>;
  FlexShrink?: number;
  FlexGrow?: number;
  FlexBasis?: YogaValue;
  MinHeight?: YogaValue;
  MinWidth?: YogaValue;
  MaxHeight?: YogaValue;
  MaxWidth?: YogaValue;
  Height?: YogaValue;
  Width?: YogaValue;
  Left?: YogaValue;
  Top?: YogaValue;
  Right?: YogaValue;
  Start?: YogaValue;
  End?: YogaValue;
  MarginLeft?: YogaValue;
  MarginTop?: YogaValue;
  MarginRight?: YogaValue;
  MarginBottom?: YogaValue;
  MarginStart?: YogaValue;
  MarginEnd?: YogaValue;
  MarginHorizontal?: YogaValue;
  Bottom?: YogaValue;
  Margin?: YogaValue;
  MarginVertical?: YogaValue;
  Padding?: YogaValue;
  PaddingVertical?: YogaValue;
  PaddingHorizontal?: YogaValue;
  PaddingStart?: YogaValue;
  PaddingBottom?: YogaValue;
  PaddingRight?: YogaValue;
  PaddingTop?: YogaValue;
  PaddingEnd?: YogaValue;
  PaddingLeft?: YogaValue;
}
