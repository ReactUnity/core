import { SafeString } from './common';
import { AnimationDirection, AnimationFillMode, AnimationPlayState, Appearance, BackgroundBlendMode, BackgroundRepeat, BackgroundSize, BorderImageRepeat, BorderStyle, CursorType, FontStyles, FontWeight, NavigationMode, ObjectFit, PointerEvents, TextAlign, TextOverflowModes, TextTransform, TimingFunctionType, VerticalAlign, Visibility, WhiteSpace } from './styles-enums';
import { Array2Aux, AssetReference, AssetReferenceOrHttp, ColorAux, NumberAux, Vector2Aux, Vector3Aux } from './values';
import { YogaValue2Aux, YogaValueAux } from './yoga';

export interface RenderStyle {
  opacity?: NumberAux;
  zIndex?: number;
  sortingLayer?: number;
  order?: number;
  visibility?: Visibility | boolean;
  cursor?: CursorType;
  pointerEvents?: PointerEvents;
  content?: SafeString;
  appearance?: Appearance;
  navigation?: NavigationMode;

  backgroundBlendMode?: BackgroundBlendMode;
  backgroundColor?: ColorAux;
  backgroundImage?: AssetReferenceOrHttp;
  backgroundPositionX?: YogaValueAux;
  backgroundPositionY?: YogaValueAux;
  backgroundSize?: BackgroundSize | YogaValue2Aux;
  backgroundRepeatX?: BackgroundRepeat;
  backgroundRepeatY?: BackgroundRepeat;

  maskImage?: AssetReferenceOrHttp;
  maskPositionX?: YogaValueAux;
  maskPositionY?: YogaValueAux;
  maskSize?: BackgroundSize | YogaValue2Aux;
  maskRepeatX?: YogaValueAux;
  maskRepeatY?: YogaValueAux;

  outlineColor?: ColorAux;
  outlineStyle?: BorderStyle;
  outlineWidth?: number;
  outlineOffset?: number;

  borderTopLeftRadius?: Array2Aux<YogaValueAux>;
  borderTopRightRadius?: Array2Aux<YogaValueAux>;
  borderBottomRightRadius?: Array2Aux<YogaValueAux>;
  borderBottomLeftRadius?: Array2Aux<YogaValueAux>;

  borderTopColor?: ColorAux;
  borderRightColor?: ColorAux;
  borderBottomColor?: ColorAux;
  borderLeftColor?: ColorAux;

  borderTopStyle?: BorderStyle;
  borderRightStyle?: BorderStyle;
  borderBottomStyle?: BorderStyle;
  borderLeftStyle?: BorderStyle;

  borderImageSource?: AssetReferenceOrHttp;
  borderImageSlice?: YogaValueAux;
  borderImageRepeat?: BorderImageRepeat;
  borderImageOutset?: YogaValueAux;
  borderImageWidth?: YogaValueAux;

  boxShadow?: SafeString;
  objectFit?: ObjectFit;
  objectPosition?: YogaValue2Aux;

  transformOrigin?: Vector2Aux;
  translate?: YogaValue2Aux;
  translateZ?: YogaValueAux;
  scale?: Vector2Aux;
  rotate?: Vector3Aux;

  stateDuration?: number;

  // Inherited styles
  color?: ColorAux;
  fontFamily?: AssetReference;
  fontWeight?: FontWeight;
  fontStyle?: FontStyles;
  textTransform?: TextTransform;
  fontSize?: YogaValueAux;
  textOverflow?: TextOverflowModes;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  whiteSpace?: WhiteSpace;
  textStrokeWidth?: NumberAux;
  textStrokeColor?: ColorAux;
  lineHeight?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  maxLines?: number;

  transitionProperty?: keyof RenderStyle;
  transitionDuration?: number;
  transitionTimingFunction?: TimingFunctionType;
  transitionDelay?: number;
  transitionPlayState?: AnimationPlayState;
  motionDuration?: number;
  motionTimingFunction?: TimingFunctionType;
  motionDelay?: number;
  animationDelay?: number;
  animationDirection?: AnimationDirection;
  animationDuration?: number;
  animationFillMode?: AnimationFillMode;
  animationIterationCount?: number;
  animationName?: SafeString;
  animationPlayState?: AnimationPlayState;
  animationTimingFunction?: TimingFunctionType;
  audioClip?: AssetReferenceOrHttp;
  audioIterationCount?: number;
  audioDelay?: number;

  // Shorthands
  all?: SafeString;
  background?: SafeString;
  backgroundPosition?: SafeString;
  backgroundRepeat?: BackgroundRepeat;
  outline?: SafeString;
  border?: SafeString;
  borderTop?: SafeString;
  borderRight?: SafeString;
  borderBottom?: SafeString;
  borderLeft?: SafeString;
  borderWidth?: SafeString;
  borderStyle?: BorderStyle;
  borderColor?: ColorAux;
  borderRadius?: Array2Aux<YogaValueAux>;
  borderImage?: SafeString;
  margin?: SafeString | number;
  mask?: SafeString;
  maskPosition?: SafeString;
  maskRepeat?: SafeString;
  padding?: SafeString | number;
  inset?: SafeString | number;
  flex?: SafeString;
  flexFlow?: SafeString;
  font?: SafeString;
  textStroke?: SafeString;
  animation?: SafeString;
  transition?: SafeString;
  motion?: SafeString;
  audio?: SafeString;
  transform?: SafeString;
  gap?: SafeString | number;

  // Custom CSS variables
  [variable: `--${string}`]: any;
}
