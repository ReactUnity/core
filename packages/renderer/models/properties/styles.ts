import { AnimationDirection, AnimationFillMode, AnimationPlayState, Appearance, BackgroundBlendMode, CursorType, FontStyles, FontWeight, NavigationMode, ObjectFit, PointerEvents, TextAlign, TextOverflowModes, TimingFunctionType, Visibility, WhiteSpace } from './styles-enums';
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
  maxLines?: number;

  transitionProperty: keyof RenderStyle | string;
  transitionDuration: number | string;
  transitionTimingFunction: TimingFunctionType | string;
  transitionDelay: number | string;
  transitionPlayState: AnimationPlayState | string;
  animationDelay: number | string;
  animationDirection: AnimationDirection | string;
  animationDuration: number | string;
  animationFillMode: AnimationFillMode | string;
  animationIterationCount: number | string;
  animationName: string | string;
  animationPlayState: AnimationPlayState | string;
  animationTimingFunction: TimingFunctionType | string;
  audioClip: AssetReference;
  audioIterationCount: number | string;
  audioDelay: number | string;

  // Shorthands
  all?: string;
  background?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  margin?: string;
  mask?: string;
  padding?: string;
  inset?: string;
  flex?: string;
  flexFlow?: string;
  font?: string;
  textStroke?: string;
  animation?: string;
  transition?: string;
  audio?: string;

  // Custom CSS variables
  [variable: `--${string}`]: any;
}
