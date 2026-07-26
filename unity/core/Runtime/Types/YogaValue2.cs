using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    [Serializable]
    [StructLayout(LayoutKind.Sequential)]
    public struct YogaValue2 : Interpolatable
    {
        public static YogaValue2 Zero = new YogaValue2(YogaValue.Point(0), YogaValue.Point(0));
        public static YogaValue2 Undefined = new YogaValue2(YogaValue.Undefined(), YogaValue.Undefined());
        public static YogaValue2 Auto = new YogaValue2(YogaValue.Auto(), YogaValue.Auto());
        public static YogaValue2 Center = new YogaValue2(YogaValue.Percent(50), YogaValue.Percent(50));
        public static YogaValue2 Full = new YogaValue2(YogaValue.Percent(100), YogaValue.Percent(100));

        [SerializeField]
        private YogaValue x;
        public YogaValue X => x;

        [SerializeField]
        private YogaValue y;
        public YogaValue Y => y;

        [SerializeField]
        private bool locked;

        public YogaValue2(YogaValue x, YogaValue y)
        {
            this.x = x;
            this.y = y;
            this.locked = true;
        }

        public static YogaValue2 Point(float x, float y)
        {
            return new YogaValue2(YogaValue.Point(x), YogaValue.Point(y));
        }

        public static YogaValue2 Percent(float x, float y)
        {
            return new YogaValue2(YogaValue.Percent(x), YogaValue.Percent(y));
        }

        public Vector2 AsVector()
        {
            return new Vector2(X.Value, Y.Value);
        }

        public bool IsZero()
        {
            return X.Value == 0 && Y.Value == 0;
        }

        public override bool Equals(object obj)
        {
            return obj is YogaValue2 value &&
                   X == value.X &&
                   Y == value.Y;
        }

        public override int GetHashCode()
        {
            int hashCode = 1861411795;
            hashCode = hashCode * -1521134295 + X.GetHashCode();
            hashCode = hashCode * -1521134295 + Y.GetHashCode();
            return hashCode;
        }

        public string ToCSS()
        {
            return ToCSS(X) + " " + ToCSS(Y);
        }

        private string ToCSS(YogaValue val)
        {
            if (val.Unit == YogaUnit.Auto) return "auto";
            if (val.Unit == YogaUnit.Undefined) return "none";
            if (val.Unit == YogaUnit.Percent) return val.Value + "%";
            if (val.Unit == YogaUnit.Point) return val.Value + "px";
            return "unset";
        }

        public YogaValue2 Negate()
        {
            return new YogaValue2(Negate(X), Negate(Y));
        }

        private YogaValue Negate(YogaValue val)
        {
            if (val.Unit == YogaUnit.Percent) return YogaValue.Percent(-val.Value);
            if (val.Unit == YogaUnit.Point) return YogaValue.Point(-val.Value);
            return val;
        }

        public static bool operator ==(YogaValue2 left, YogaValue2 right) => left.Equals(right);
        public static bool operator !=(YogaValue2 left, YogaValue2 right) => !(left == right);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is YogaValue2 tto)
                return new YogaValue2(Interpolater.Interpolate(X, tto.X, t), Interpolater.Interpolate(Y, tto.Y, t));
            return t > 0.5f ? to : this;
        }

        public class Converter : TypedStyleConverterBase<YogaValue2>
        {
            StyleConverterBase YogaValueParser = AllConverters.YogaValueConverter;

            private bool AllowLiterals = true;
            private bool SingleValueAssignsBoth = false;
            private char Separator = ' ';

            public Converter(bool allowLiterals = true, char separator = ' ', bool singleValueAssignsBoth = false)
            {
                AllowLiterals = allowLiterals;
                Separator = separator;
                SingleValueAssignsBoth = singleValueAssignsBoth;
            }


            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (AllowLiterals && ParseFromPositioningLiteral(value, out result)) return true;

                var values = ParserHelpers.Split(value, Separator);

                if (values.Count == 1) return SinglePositional(values[0], out result);
                if (values.Count == 2) return TwoPositional(values[0], values[1], out result);

                return base.ParseInternal(value, out result);
            }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is double d) return Constant(new YogaValue2((float) d, (float) d), out result);
                if (value is float f) return Constant(new YogaValue2(f, f), out result);
                if (value is int i) return Constant(new YogaValue2(i, i), out result);
                if (value is YogaValue v) return Constant(new YogaValue2(v, v), out result);
                if (value is Vector2 v2) return Constant(new YogaValue2(v2.x, v2.y), out result);
                if (value is IEnumerable e) return FromArray(e, out result);

                return base.ConvertInternal(value, out result);
            }

            private bool FromArray(IEnumerable obj, out IComputedValue result)
            {
                var arr = obj.OfType<object>().ToArray();
                var len = arr.Length;

                if (len == 0) return Constant(YogaValue2.Zero, out result);
                if (len == 1) return SinglePositional(arr.ElementAtOrDefault(0), out result);
                return TwoPositional(arr.ElementAtOrDefault(0), arr.ElementAtOrDefault(1), out result);
            }

            private bool ParseFromPositioningLiteral(string str, out IComputedValue result)
            {
                float x, y;
                var values = ParserHelpers.SplitWhitespace(str);

                if (values.Count > 2) return Fail(out result);

                var hasDouble = values.Count == 2;

                if (values.Contains("top"))
                {
                    x = 0.5f;
                    y = 0;
                    if (hasDouble)
                    {
                        if (values.Contains("left")) x = 0;
                        else if (values.Contains("right")) x = 1;
                        else if (values.Contains("center")) x = 0.5f;
                        else return Fail(out result);
                    }
                }
                else if (values.Contains("bottom"))
                {
                    x = 0.5f;
                    y = 1;
                    if (hasDouble)
                    {
                        if (values.Contains("left")) x = 0;
                        else if (values.Contains("right")) x = 1;
                        else if (values.Contains("center")) x = 0.5f;
                        else return Fail(out result);
                    }
                }
                else if (values.Contains("left"))
                {
                    if (hasDouble && !values.Contains("center")) return Fail(out result);
                    x = 0;
                    y = 0.5f;
                }
                else if (values.Contains("right"))
                {
                    if (hasDouble && !values.Contains("center")) return Fail(out result);
                    x = 1;
                    y = 0.5f;
                }
                else if (values.Contains("center"))
                {
                    if (hasDouble && values[0] != values[1]) return Fail(out result);
                    x = 0.5f;
                    y = 0.5f;
                }
                else
                {
                    return Fail(out result);
                }

                return Constant(new YogaValue2(YogaValue.Percent(x * 100), YogaValue.Percent(y * 100)), out result);
            }



            private bool SinglePositional(object pos1, out IComputedValue result)
            {
                return ComputedMapper.Create(out result,
                    pos1,
                    YogaValueParser,
                    (resolvedValue) => {
                        if (resolvedValue is YogaValue fl1)
                            return new YogaValue2(fl1, SingleValueAssignsBoth ? fl1 : YogaValue.Undefined());
                        return null;
                    });
            }

            private bool TwoPositional(object pos1, object pos2, out IComputedValue result)
            {
                return ComputedList.Create(out result,
                    new List<object> { pos1, pos2 },
                    YogaValueParser,
                    (resolvedValues) => {
                        if (resolvedValues[0] is YogaValue fl1 && resolvedValues[1] is YogaValue fl2)
                            return new YogaValue2(fl1, fl2);
                        return null;
                    });
            }
        }
    }
}
