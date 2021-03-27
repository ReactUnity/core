import { Appearance, CursorType, FontStyles, FontWeight, NavigationMode, PointerEvents, TextOverflowModes, Visibility, WhiteSpace } from './styles-enums';
import { AssetReference, ColorAux, EnumOrLiteral, Vector2Aux } from './values';
import { YogaValue2Aux, YogaValueAux } from './yoga';

export interface RenderStyle {
  opacity?: number;
  zIndex?: number;
  visibility?: EnumOrLiteral<typeof Visibility> | boolean;
  cursor?: EnumOrLiteral<typeof CursorType> | string;
  pointerEvents?: EnumOrLiteral<typeof PointerEvents>;
  content?: string;
  appearance?: EnumOrLiteral<typeof Appearance>;
  navigation?: EnumOrLiteral<typeof NavigationMode>;

  backgroundColor?: ColorAux;
  backgroundImage?: AssetReference;
  borderRadius?: number;
  borderColor?: ColorAux;
  boxShadow?: string;

  transformOrigin?: Vector2Aux;
  translate?: YogaValue2Aux;
  scale?: Vector2Aux;
  rotate?: number;

  // Inherited styles
  color?: ColorAux;
  fontFamily?: AssetReference;
  fontWeight?: EnumOrLiteral<typeof FontWeight>;
  fontStyle?: EnumOrLiteral<typeof FontStyles>;
  fontSize?: YogaValueAux;
  textOverflow?: EnumOrLiteral<typeof TextOverflowModes>;
  whiteSpace?: EnumOrLiteral<typeof WhiteSpace>;
}
