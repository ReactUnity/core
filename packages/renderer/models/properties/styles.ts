import { ObjectFit } from '.';
import { Appearance, BackgroundBlendMode, CursorType, FontStyles, FontWeight, NavigationMode, PointerEvents, TextAlign, TextOverflowModes, Visibility, WhiteSpace } from './styles-enums';
import { AssetReference, ColorAux, NumberAux, Vector2Aux, Vector3Aux } from './values';
import { YogaValue2Aux, YogaValueAux } from './yoga';

export interface RenderStyle {
  opacity?: NumberAux;
  zIndex?: number;
  visibility?: Visibility | boolean;
  cursor?: CursorType | string;
  pointerEvents?: PointerEvents;
  content?: string;
  appearance?: Appearance;
  navigation?: NavigationMode;

  backgroundBlendMode?: BackgroundBlendMode;
  backgroundColor?: ColorAux;
  backgroundImage?: AssetReference;
  mask?: AssetReference;
  maskImage?: AssetReference;

  borderRadius?: NumberAux;
  borderTopLeftRadius?: NumberAux;
  borderTopRightRadius?: NumberAux;
  borderBottomRightRadius?: NumberAux;
  borderBottomLeftRadius?: NumberAux;

  borderColor?: ColorAux;
  borderTopColor?: ColorAux;
  borderRightColor?: ColorAux;
  borderBottomColor?: ColorAux;
  borderLeftColor?: ColorAux;

  boxShadow?: string;
  objectFit?: ObjectFit;
  objectPosition?: YogaValue2Aux;

  transformOrigin?: Vector2Aux;
  translate?: YogaValue2Aux;
  scale?: Vector2Aux;
  rotate?: Vector3Aux;

  animation?: string;
  transition?: string;
  audio?: string;
  stateDuration?: number;

  // Inherited styles
  color?: ColorAux;
  fontFamily?: AssetReference;
  fontWeight?: FontWeight;
  fontStyle?: FontStyles;
  fontSize?: YogaValueAux;
  textOverflow?: TextOverflowModes;
  textAlign?: TextAlign;
  whiteSpace?: WhiteSpace;
  textStrokeWidth?: NumberAux;
  textStrokeColor?: ColorAux;
  lineHeight?: number;
  letterSpacing?: number;
  wordSpacing?: number;

  // Shorthands
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  margin?: string;
  padding?: string;
  inset?: string;
  flex?: string;
  flexFlow?: string;
  font?: string;
  textStroke?: string;

  // Custom CSS variables
  [variable: `--${string}`]: any;
}
