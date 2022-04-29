import { AnimationDirection, AnimationFillMode, AnimationPlayState, Appearance, BackgroundBlendMode, BackgroundSize, CursorType, FontStyles, FontWeight, NavigationMode, ObjectFit, PointerEvents, TextAlign, TextOverflowModes, TextTransform, TimingFunctionType, Visibility, WhiteSpace } from './styles-enums';
import { Array2Aux, AssetReference, ColorAux, NumberAux, Vector2Aux, Vector3Aux } from './values';
import { YogaValue2Aux, YogaValueAux } from './yoga';

export interface RenderStyle {
  opacity?: NumberAux;
  zIndex?: number | string;
  order?: number | string;
  visibility?: Visibility | boolean;
  cursor?: CursorType | string;
  pointerEvents?: PointerEvents;
  content?: string;
  appearance?: Appearance;
  navigation?: NavigationMode;

  backgroundBlendMode?: BackgroundBlendMode;
  backgroundColor?: ColorAux;
  backgroundImage?: AssetReference;
  backgroundPositionX?: YogaValueAux;
  backgroundPositionY?: YogaValueAux;
  backgroundSize?: BackgroundSize | YogaValue2Aux;
  backgroundRepeatX?: YogaValueAux;
  backgroundRepeatY?: YogaValueAux;

  maskImage?: AssetReference;
  maskPositionX?: YogaValueAux;
  maskPositionY?: YogaValueAux;
  maskSize?: BackgroundSize | YogaValue2Aux;
  maskRepeatX?: YogaValueAux;
  maskRepeatY?: YogaValueAux;

  borderRadius?: Array2Aux<YogaValueAux> | string;
  borderTopLeftRadius?: Array2Aux<YogaValueAux>;
  borderTopRightRadius?: Array2Aux<YogaValueAux>;
  borderBottomRightRadius?: Array2Aux<YogaValueAux>;
  borderBottomLeftRadius?: Array2Aux<YogaValueAux>;

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
  translateZ?: YogaValueAux;
  scale?: Vector2Aux;
  rotate?: Vector3Aux;

  stateDuration?: number | string;

  // Inherited styles
  color?: ColorAux;
  fontFamily?: AssetReference;
  fontWeight?: FontWeight;
  fontStyle?: FontStyles;
  textTransform?: TextTransform;
  fontSize?: YogaValueAux;
  textOverflow?: TextOverflowModes;
  textAlign?: TextAlign;
  whiteSpace?: WhiteSpace;
  textStrokeWidth?: NumberAux;
  textStrokeColor?: ColorAux;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  wordSpacing?: number | string;
  maxLines?: number | string;

  transitionProperty?: keyof RenderStyle | string;
  transitionDuration?: number | string;
  transitionTimingFunction?: TimingFunctionType | string;
  transitionDelay?: number | string;
  transitionPlayState?: AnimationPlayState | string;
  motionDuration?: number | string;
  motionTimingFunction?: TimingFunctionType | string;
  motionDelay?: number | string;
  animationDelay?: number | string;
  animationDirection?: AnimationDirection | string;
  animationDuration?: number | string;
  animationFillMode?: AnimationFillMode | string;
  animationIterationCount?: number | string;
  animationName?: string | string;
  animationPlayState?: AnimationPlayState | string;
  animationTimingFunction?: TimingFunctionType | string;
  audioClip?: AssetReference;
  audioIterationCount?: number | string;
  audioDelay?: number | string;

  // Shorthands
  all?: string;
  background?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  margin?: string | number;
  mask?: string;
  maskPosition?: string;
  maskRepeat?: string;
  padding?: string | number;
  inset?: string | number;
  flex?: string;
  flexFlow?: string;
  font?: string;
  textStroke?: string;
  animation?: string;
  transition?: string;
  motion?: string;
  audio?: string;
  transform?: string;

  // Custom CSS variables
  [variable: `--${string}`]: any;
}
