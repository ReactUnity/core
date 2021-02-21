import { UnityEngine } from '../generated';

// Positioning

type PositioningLiteralHorizontal = 'left' | 'right' | 'center';
type PositioningLiteralVertical = 'top' | 'bottom' | 'center';
export type PositioningLiteral = PositioningLiteralVertical | PositioningLiteralHorizontal
  | `${PositioningLiteralVertical} ${PositioningLiteralHorizontal}`
  | `${PositioningLiteralHorizontal} ${PositioningLiteralVertical}`;

export type Array2Aux<T> = T | [] | [T] | [T, T] | T[];
export type Array4Aux<T> = Array2Aux<T> | [T, T, T] | [T, T, T, T];

export type Vector2Aux = string | Array2Aux<number> | PositioningLiteral;
export type RectOffsetAux = Array4Aux<number>;


// Color

export type KnownColor = 'red' | 'cyan' | 'blue' | 'darkblue' | 'lightblue' | 'purple' | 'yellow'
  | 'lime' | 'fuchsia' | 'white' | 'silver' | 'grey' | 'gray' | 'black' | 'orange' | 'brown' | 'maroon'
  | 'green' | 'olive' | 'navy' | 'teal' | 'aqua' | 'magenta' | 'clear' | 'transparent';

export type HexColor = string; // TODO: fix it when typescript correctly handles `#${string}`;
export type ColorAux = KnownColor | HexColor | number | Array4Aux<number> | [ColorAux, number?, ColorAux?] | UnityEngine.Color;


// Other

export type EnumOrLiteral<T extends { [key: number]: string | number }> = T[keyof T] | keyof T | Lowercase<keyof T extends string ? keyof T : never>;
export type AssetReference = string | UnityEngine.Object;
