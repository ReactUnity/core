
export type Vector2 = number | [] | [number] | [number, number] | { x: number; y: number };

export type Array4 = [] | [number] | [number, number] | [number, number, number] | [number, number, number, number];

export type RectOffset = number | Array4
  | { top?: number; right?: number; bottom?: number; left?: number; vertical?: number; horizontal?: number };


export enum TextAnchor {
  UpperLeft = 0,
  UpperCenter = 1,
  UpperRight = 2,
  MiddleLeft = 3,
  MiddleCenter = 4,
  MiddleRight = 5,
  LowerLeft = 6,
  LowerCenter = 7,
  LowerRight = 8,
}
