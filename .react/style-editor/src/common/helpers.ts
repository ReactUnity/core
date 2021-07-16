import { Facebook as FB, UnityEngine as UE } from '@reactunity/renderer';

const StyleLength = UnityEngine.UIElements.StyleLength;
const StyleKeyword = UnityEngine.UIElements.StyleKeyword;
const Length = UnityEngine.UIElements.Length;
const LengthUnit = UnityEngine.UIElements.LengthUnit;

const YogaUnit = Facebook.Yoga.YogaUnit;

/* eslint-disable eqeqeq */
export function convertLengthToYoga(value: UE.UIElements.StyleLength): FB.Yoga.YogaValue {
  if (value.keyword == StyleKeyword.Auto) return Facebook.Yoga.YogaValue.Auto();
  if (value.keyword == StyleKeyword.Null || value.keyword == StyleKeyword.None || value.keyword == StyleKeyword.Initial)
    return Facebook.Yoga.YogaValue.Undefined();
  if (value.value.unit == LengthUnit.Percent) return Facebook.Yoga.YogaValue.Percent(value.value.value);
  if (value.value.unit == LengthUnit.Pixel) return Facebook.Yoga.YogaValue.Point(value.value.value);
  return Facebook.Yoga.YogaValue.Undefined();
}

export function convertYogaToLength(value: FB.Yoga.YogaValue): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (value.Unit == YogaUnit.Auto) len.keyword = StyleKeyword.Auto;
  else if (value.Unit == YogaUnit.Undefined) len.keyword = StyleKeyword.None;
  else if (isNaN(value.Value)) len.keyword = StyleKeyword.Null;
  else if (value.Unit == YogaUnit.Percent) len.value = new Length(value.Value, LengthUnit.Percent);
  else if (value.Unit == YogaUnit.Point) len.value = new Length(value.Value, LengthUnit.Pixel);
  return len;
}

export function convertLengthToFloat(value: UE.UIElements.StyleLength): number {
  if (value.keyword == StyleKeyword.Auto) return 0;
  if (value.keyword == StyleKeyword.Null || value.keyword == StyleKeyword.None || value.keyword == StyleKeyword.Initial) return 0;
  if (value.value.unit == LengthUnit.Percent) return value.value.value / 100;
  if (value.value.unit == LengthUnit.Pixel) return value.value.value;
  return 0;
}

export function convertFloatToLength(value: number): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (value < 1) {
    len.value = new Length(value * 100, LengthUnit.Percent);
  } else {
    len.value = new Length(value, LengthUnit.Pixel);
  }
  return len;
}
/* eslint-enable eqeqeq */

export function floatDefaultGetter(value: number) {
  return value || 0;
}
