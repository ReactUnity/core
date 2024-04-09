import { UnityEngine as UE, Yoga } from '@reactunity/renderer';

const StyleLength = Interop.UnityEngine.UIElements.StyleLength;
const StyleKeyword = Interop.UnityEngine.UIElements.StyleKeyword;
const Length = Interop.UnityEngine.UIElements.Length;
const LengthUnit = Interop.UnityEngine.UIElements.LengthUnit;

const YogaUnit = Interop.Yoga.YogaUnit;

/* eslint-disable eqeqeq */
export function convertLengthToYoga(value: UE.UIElements.StyleLength): Yoga.YogaValue {
  if (!value || value.keyword == StyleKeyword.Auto) return Interop.Yoga.YogaValue.Auto();
  if (value.keyword == StyleKeyword.Null || value.keyword == StyleKeyword.None || value.keyword == StyleKeyword.Initial)
    return Interop.Yoga.YogaValue.Undefined();
  if (value.value.unit == LengthUnit.Percent) return Interop.Yoga.YogaValue.Percent(value.value.value);
  if (value.value.unit == LengthUnit.Pixel) return Interop.Yoga.YogaValue.Point(value.value.value);
  return Interop.Yoga.YogaValue.Undefined();
}

export function convertYogaToLength(value: Yoga.YogaValue): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (!value || value.Unit == YogaUnit.Auto) len.keyword = StyleKeyword.Auto;
  else if (value.Unit == YogaUnit.Undefined) len.keyword = StyleKeyword.None;
  else if (isNaN(value.Value)) len.keyword = StyleKeyword.Null;
  else if (value.Unit == YogaUnit.Percent) len.value = new Length(value.Value, LengthUnit.Percent);
  else if (value.Unit == YogaUnit.Point) len.value = new Length(value.Value, LengthUnit.Pixel);
  return len;
}

export function convertLengthToFloat(value: UE.UIElements.StyleLength): number {
  if (!value || value.keyword == StyleKeyword.Auto) return 0;
  if (value.keyword == StyleKeyword.Null || value.keyword == StyleKeyword.None || value.keyword == StyleKeyword.Initial) return 0;
  if (value.value.unit == LengthUnit.Percent) return value.value.value / 100;
  if (value.value.unit == LengthUnit.Pixel) return value.value.value;
  return 0;
}

export function convertFloatToLength(value: number): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (!value) {
    return len;
  }
  else if (value < 1) {
    len.value = new Length(Math.fround(+value * 100), LengthUnit.Percent);
  } else {
    len.value = new Length(Math.fround(+value), LengthUnit.Pixel);
  }
  return len;
}
/* eslint-enable eqeqeq */

export function floatDefaultGetter(value: number) {
  return value || 0;
}
