
import {
  Overflow, Direction, Display, Wrap, YogaJustify, PositionType, YogaAlign, FlexDirection,
} from './yoga-enums';
import { EnumOrLiteral } from '../values/enum';


// boolean, null and undefined are all mapped to undefined
// pt, px and no unit is mapped to Point unit, e.g. 50px -> 50 Points
// % is mapped to percentage, e.g. 50% -> 50 Percent
export type YogaValueAux = 'auto' | string | number | null | undefined | boolean | YogaValue;


export interface Layout {
  Data?: Record<string, unknown>;
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
  FlexBasis?: YogaValueAux;
  MinHeight?: YogaValueAux;
  MinWidth?: YogaValueAux;
  MaxHeight?: YogaValueAux;
  MaxWidth?: YogaValueAux;
  Height?: YogaValueAux;
  Width?: YogaValueAux;
  Left?: YogaValueAux;
  Top?: YogaValueAux;
  Right?: YogaValueAux;
  Start?: YogaValueAux;
  End?: YogaValueAux;
  MarginLeft?: YogaValueAux;
  MarginTop?: YogaValueAux;
  MarginRight?: YogaValueAux;
  MarginBottom?: YogaValueAux;
  MarginStart?: YogaValueAux;
  MarginEnd?: YogaValueAux;
  MarginHorizontal?: YogaValueAux;
  Bottom?: YogaValueAux;
  Margin?: YogaValueAux;
  MarginVertical?: YogaValueAux;
  Padding?: YogaValueAux;
  PaddingVertical?: YogaValueAux;
  PaddingHorizontal?: YogaValueAux;
  PaddingStart?: YogaValueAux;
  PaddingBottom?: YogaValueAux;
  PaddingRight?: YogaValueAux;
  PaddingTop?: YogaValueAux;
  PaddingEnd?: YogaValueAux;
  PaddingLeft?: YogaValueAux;
}
