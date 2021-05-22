import { Appearance, CursorType, FontStyles, FontWeight, NavigationMode, PointerEvents, TextOverflowModes, Visibility, WhiteSpace } from './styles-enums';
import { AssetReference, ColorAux, Vector2Aux, Vector3Aux } from './values';
import { YogaValue2Aux, YogaValueAux } from './yoga';

export interface RenderStyle {
  opacity?: number;
  zIndex?: number;
  visibility?: Visibility | boolean;
  cursor?: CursorType | string;
  pointerEvents?: PointerEvents;
  content?: string;
  appearance?: Appearance;
  navigation?: NavigationMode;

  backgroundColor?: ColorAux;
  backgroundImage?: AssetReference;
  borderRadius?: number;
  borderColor?: ColorAux;
  boxShadow?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: YogaValue2Aux;

  transformOrigin?: Vector2Aux;
  translate?: YogaValue2Aux;
  scale?: Vector2Aux;
  rotate?: Vector3Aux;

  animation?: string;
  transition?: string;
  audio?: string;

  // Inherited styles
  color?: ColorAux;
  fontFamily?: AssetReference;
  fontWeight?: FontWeight;
  fontStyle?: FontStyles;
  fontSize?: YogaValueAux;
  textOverflow?: TextOverflowModes;
  whiteSpace?: WhiteSpace;
}
