
export type Vector2Aux = string | number | [] | [number] | [number, number] | number[] | { x: number; y: number };

export type Array4Aux = [] | [number] | [number, number] | [number, number, number] | [number, number, number, number] | number[];

export type RectOffsetAux = number | Array4Aux
  | { top?: number; right?: number; bottom?: number; left?: number; vertical?: number; horizontal?: number };
