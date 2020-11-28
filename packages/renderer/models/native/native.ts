import { ColorAux } from '../values/color';
import { Vector2Aux } from '../values/values';

declare global {
  class YogaValue {
    static Auto: () => YogaValue;

    static Percent(value: number): YogaValue;

    static Point(value: number): YogaValue;

    static Undefined(): YogaValue;
  }

  class Color {
    constructor(r: number, g: number, b: number, a?: number);

    static get cyan(): ColorAux;

    static get clear(): ColorAux;

    static get grey(): ColorAux;

    static get gray(): ColorAux;

    static get magenta(): ColorAux;

    static get red(): ColorAux;

    static get yellow(): ColorAux;

    static get black(): ColorAux;

    static get white(): ColorAux;

    static get green(): ColorAux;

    static get blue(): ColorAux;
  }

  class ShadowDefinition {
    offset: Vector2Native;

    spread: Vector2Native;

    color: Color;

    blur: number;

    constructor(offset: Vector2Aux, spread: Vector2Aux, color: ColorAux, blur: number);
  }
}
