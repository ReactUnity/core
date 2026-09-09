import { SafeString } from './common';
import {
  AnimationDirection,
  AnimationFillMode,
  AnimationPlayState,
  Appearance,
  BackgroundRepeat,
  BackgroundSize,
  BorderImageRepeat,
  BorderStyle,
  ColorScheme,
  ContainerType,
  CursorType,
  FontStyles,
  FontVariant,
  FontWeight,
  ImageRendering,
  Isolation,
  MaskMode,
  MixBlendMode,
  NavigationMode,
  ObjectFit,
  PointerEvents,
  ScrollBehavior,
  ScrollSnapAlign,
  ScrollSnapType,
  TextAlign,
  TextOverflowModes,
  TextTransform,
  TimelineAxis,
  TimingFunctionType,
  VerticalAlign,
  Visibility,
  WhiteSpace,
} from './styles-enums';
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
  containerType?: ContainerType;
  containerName?: string;
  colorScheme?: ColorScheme;
  content?: SafeString;
  appearance?: Appearance;
  navigation?: NavigationMode;

  // `scroll-snap-type` and `scroll-behavior` describe a scroll container, `scroll-snap-align` one
  // of the items in it.
  scrollBehavior?: ScrollBehavior;
  scrollSnapType?: ScrollSnapType;
  scrollSnapAlign?: ScrollSnapAlign;

  // One value per background image layer, repeating to cover them all -- so a comma-separated
  // list is as valid here as a single keyword.
  backgroundBlendMode?: MixBlendMode | SafeString;
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
  maskMode?: MaskMode;

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
  clipPath?: SafeString;
  filter?: SafeString;
  mixBlendMode?: MixBlendMode;
  isolation?: Isolation;
  backdropFilter?: SafeString;
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
  imageRendering?: ImageRendering;
  fontFamily?: AssetReference;
  fontWeight?: FontWeight;
  fontStyle?: FontStyles;
  textDecorationLine?: FontStyles;
  textDecorationColor?: ColorAux;
  textTransform?: TextTransform;
  fontVariant?: FontVariant;
  fontVariantCaps?: FontVariant;
  fontSize?: YogaValueAux;
  textOverflow?: TextOverflowModes;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  whiteSpace?: WhiteSpace;
  textStrokeWidth?: NumberAux;
  textStrokeColor?: ColorAux;
  textShadow?: SafeString;
  caretColor?: ColorAux;
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
  animationTimeline?: SafeString;
  animationRangeStart?: SafeString;
  animationRangeEnd?: SafeString;
  scrollTimelineName?: SafeString;
  scrollTimelineAxis?: TimelineAxis;
  viewTimelineName?: SafeString;
  viewTimelineAxis?: TimelineAxis;
  viewTimelineInset?: SafeString | number;
  timelineScope?: SafeString;
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
  maskType?: MaskMode;
  padding?: SafeString | number;
  inset?: SafeString | number;
  flex?: SafeString;
  flexFlow?: SafeString;
  font?: SafeString;
  textDecoration?: SafeString;
  textStroke?: SafeString;
  animation?: SafeString;
  transition?: SafeString;
  motion?: SafeString;
  audio?: SafeString;
  transform?: SafeString;
  gap?: SafeString | number;
  scrollbarColor?: SafeString;
  scrollbarWidth?: 'auto' | 'thin' | 'none' | YogaValueAux;
  scrollTimeline?: SafeString;
  viewTimeline?: SafeString;
  animationRange?: SafeString;
  scrollbarGutter?: 'auto' | 'stable' | 'stable both-edges';
  container?: SafeString;
  paddingInline?: SafeString | number;
  paddingBlock?: SafeString | number;
  marginInline?: SafeString | number;
  marginBlock?: SafeString | number;
  insetInline?: SafeString | number;
  insetBlock?: SafeString | number;
  borderInlineWidth?: SafeString | number;
  borderBlockWidth?: SafeString | number;
  placeContent?: SafeString;
  placeItems?: SafeString;
  placeSelf?: SafeString;

  // Custom CSS variables
  [variable: `--${string}`]: any;
}
