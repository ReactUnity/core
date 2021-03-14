import { Facebook as FB, UnityEngine as UE } from '@reactunity/renderer/editor';

const StyleLength = UnityEngine.UIElements.StyleLength;
const StyleKeyword = UnityEngine.UIElements.StyleKeyword;
const Length = UnityEngine.UIElements.Length;
const LengthUnit = UnityEngine.UIElements.LengthUnit;

/* eslint-disable eqeqeq */
export function convertLengthToYoga(value: UE.UIElements.StyleLength): FB.Yoga.YogaValue {
  if (value.keyword == 2) return Facebook.Yoga.YogaValue.Auto();
  if (value.keyword == 1 || value.keyword == 4 || value.keyword == 3) return Facebook.Yoga.YogaValue.Undefined();
  if (value.value.unit == 1) return Facebook.Yoga.YogaValue.Percent(value.value.value);
  if (value.value.unit == 0) return Facebook.Yoga.YogaValue.Point(value.value.value);
  return Facebook.Yoga.YogaValue.Undefined();
}

export function convertYogaToLength(value: FB.Yoga.YogaValue): UE.UIElements.StyleLength {
  var len = new StyleLength(0);
  len.keyword = StyleKeyword.Initial;

  if (value.Unit == 3) len.keyword = StyleKeyword.Auto;
  else if (value.Unit == 0) len.keyword = StyleKeyword.None;
  else if (isNaN(value.Value)) len.keyword = StyleKeyword.Null;
  else if (value.Unit == 2) len.value = new Length(value.Value, LengthUnit.Percent);
  else if (value.Unit == 1) len.value = new Length(value.Value, LengthUnit.Pixel);
  return len;
}
/* eslint-enable eqeqeq */

export function floatDefaultGetter(value: number) {
  return value || 0;
}
