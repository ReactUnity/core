
import {
  Overflow, Direction, Display, Wrap, YogaJustify, Position, YogaAlign, FlexDirection,
} from './yoga-enums';
import { Array2Aux, Array4Aux, EnumOrLiteral, PositioningLiteral } from '../values';


// boolean, null and undefined are all mapped to undefined
// pt, px and no unit is mapped to Point unit, e.g. 50px -> 50 Points
// % is mapped to percentage, e.g. 50% -> 50 Percent
export type YogaValueAux = 'auto' | string | number | null | undefined | boolean;
export type YogaValue2Aux = Array2Aux<YogaValueAux> | PositioningLiteral;
export type YogaValue4Aux = Array4Aux<YogaValueAux>;


export interface Layout {
  data?: Record<string, unknown>;
  overflow?: EnumOrLiteral<typeof Overflow>;
  styleDirection?: EnumOrLiteral<typeof Direction>;
  display?: EnumOrLiteral<typeof Display>;
  wrap?: EnumOrLiteral<typeof Wrap>;
  positionType?: EnumOrLiteral<typeof Position>;
  justifyContent?: EnumOrLiteral<typeof YogaJustify>;
  alignContent?: EnumOrLiteral<typeof YogaAlign>;
  alignSelf?: EnumOrLiteral<typeof YogaAlign>;
  alignItems?: EnumOrLiteral<typeof YogaAlign>;
  borderWidth?: number;
  borderStartWidth?: number;
  borderEndWidth?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  aspectRatio?: number;
  flexDirection?: EnumOrLiteral<typeof FlexDirection>;
  flexShrink?: number;
  flexGrow?: number;
  flexBasis?: YogaValueAux;
  minHeight?: YogaValueAux;
  minWidth?: YogaValueAux;
  maxHeight?: YogaValueAux;
  maxWidth?: YogaValueAux;
  height?: YogaValueAux;
  width?: YogaValueAux;
  left?: YogaValueAux;
  top?: YogaValueAux;
  right?: YogaValueAux;
  start?: YogaValueAux;
  end?: YogaValueAux;
  marginLeft?: YogaValueAux;
  marginTop?: YogaValueAux;
  marginRight?: YogaValueAux;
  marginBottom?: YogaValueAux;
  marginStart?: YogaValueAux;
  marginEnd?: YogaValueAux;
  marginHorizontal?: YogaValueAux;
  bottom?: YogaValueAux;
  margin?: YogaValueAux;
  marginVertical?: YogaValueAux;
  padding?: YogaValueAux;
  paddingVertical?: YogaValueAux;
  paddingHorizontal?: YogaValueAux;
  paddingStart?: YogaValueAux;
  paddingBottom?: YogaValueAux;
  paddingRight?: YogaValueAux;
  paddingTop?: YogaValueAux;
  paddingEnd?: YogaValueAux;
  paddingLeft?: YogaValueAux;
}

export interface LayoutExtended {
  position?: EnumOrLiteral<typeof Position>;
  direction?: EnumOrLiteral<typeof Direction>;
  flexWrap?: EnumOrLiteral<typeof Wrap>;
}

export type LayoutCssCompatible = Omit<Layout, 'styleDirection' | 'position' | 'wrap'> & LayoutExtended;
