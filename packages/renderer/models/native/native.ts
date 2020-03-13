import { Color } from '../values/color';
import { Vector2Native } from './vectors';
import { Vector2 } from '../values/values';

declare global {
  class YogaValueNative {
    static Auto: () => YogaValueNative;

    static Percent(value: number): YogaValueNative;

    static Point(value: number): YogaValueNative;

    static Undefined(): YogaValueNative;

    static readonly '': unique symbol;
  }

  class ColorNative {
    constructor(r: number, g: number, b: number, a?: number);

    static get cyan(): Color;

    static get clear(): Color;

    static get grey(): Color;

    static get gray(): Color;

    static get magenta(): Color;

    static get red(): Color;

    static get yellow(): Color;

    static get black(): Color;

    static get white(): Color;

    static get green(): Color;

    static get blue(): Color;
  }

  class ShadowDefinitionNative {
    offset: Vector2Native;

    spread: Vector2Native;

    color: ColorNative;

    blur: number;

    constructor(offset: Vector2, spread: Vector2, color: Color, blur: number);
  }
}
