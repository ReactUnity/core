
type PositioningLiteralHorizontal = 'left' | 'right' | 'center';
type PositioningLiteralVertical = 'top' | 'bottom' | 'center';
export type PositioningLiteral = PositioningLiteralVertical | PositioningLiteralHorizontal
  | `${PositioningLiteralVertical} ${PositioningLiteralHorizontal}`
  | `${PositioningLiteralHorizontal} ${PositioningLiteralVertical}`;

export type Array2Aux<T> = T | [] | [T] | [T, T] | T[];
export type Array4Aux<T> = Array2Aux<T> | [T, T, T] | [T, T, T, T];

export type Vector2Aux = string | Array2Aux<number> | PositioningLiteral;
export type RectOffsetAux = Array4Aux<number>;
