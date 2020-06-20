import {
  FontWeight, InteractionType, FontStyles, TextOverflowModes, CursorType,
} from './styles-enums';
import { YogaValue } from './yoga';
import { Color } from '../values/color';
import { AssetReference } from '../values/asset-reference';
import { UnityObject } from '../native/context';
import { Vector2 } from '../values/values';
import { EnumOrLiteral } from '../values/enum';

export interface Style {
  opacity?: number;
  zOrder?: number;
  hidden?: boolean;
  cursor?: EnumOrLiteral<typeof CursorType> | string;
  interaction?: EnumOrLiteral<typeof InteractionType>;

  backgroundColor?: Color;
  backgroundImage?: AssetReference | UnityObject;
  borderRadius?: number;
  borderColor?: Color;
  boxShadow?: ShadowDefinitionNative;

  translate?: Vector2;
  translateRelative?: boolean;
  pivot?: Vector2;
  scale?: Vector2;
  rotate?: number;

  // Inherited styles
  font?: UnityObject;
  fontColor?: Color;
  fontWeight?: EnumOrLiteral<typeof FontWeight>;
  fontStyle?: EnumOrLiteral<typeof FontStyles>;
  fontSize?: YogaValue;
  textOverflow?: EnumOrLiteral<typeof TextOverflowModes>;
}
