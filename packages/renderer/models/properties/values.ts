import { UnityEngine } from '../generated';
import { KnownColors } from './colors';

// Positioning

type PositioningLiteralHorizontal = 'left' | 'right' | 'center';
type PositioningLiteralVertical = 'top' | 'bottom' | 'center';
export type PositioningLiteral = PositioningLiteralVertical | PositioningLiteralHorizontal
  | `${PositioningLiteralVertical} ${PositioningLiteralHorizontal}`
  | `${PositioningLiteralHorizontal} ${PositioningLiteralVertical}`;

export type Array2Aux<T> = T | [] | [T] | [T, T] | T[];
export type Array3Aux<T> = Array2Aux<T> | [T, T, T];
export type Array4Aux<T> = Array3Aux<T> | [T, T, T, T];

export type Vector2Aux = string | Array2Aux<number> | PositioningLiteral;
export type Vector3Aux = string | Array3Aux<number>;
export type RectOffsetAux = Array4Aux<number>;


// Color

export type KnownColor = keyof KnownColors;

export type HexColor = string; // TODO: fix it when typescript correctly handles `#${string}`;
export type ColorAux = KnownColor | HexColor | number | Array4Aux<number> | [ColorAux, number?, ColorAux?] | UnityEngine.Color;


// Other

export type AssetReference = string | UnityEngine.Object;
