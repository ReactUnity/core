using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using UnityEngine;

namespace ReactUnity.Types
{
    [StructLayout(LayoutKind.Sequential)]
    public struct YogaValue2 : Interpolatable
    {
        public static YogaValue2 Zero = new YogaValue2(YogaValue.Point(0), YogaValue.Point(0));
        public static YogaValue2 Undefined = new YogaValue2(YogaValue.Undefined(), YogaValue.Undefined());
        public static YogaValue2 Auto = new YogaValue2(YogaValue.Auto(), YogaValue.Auto());
        public static YogaValue2 Center = new YogaValue2(YogaValue.Percent(50), YogaValue.Percent(50));
        public static YogaValue2 Full = new YogaValue2(YogaValue.Percent(100), YogaValue.Percent(100));

        public YogaValue X { get; private set; }
        public YogaValue Y { get; private set; }

        public YogaValue2(YogaValue x, YogaValue y)
        {
            X = x;
            Y = y;
        }

        public UnityEngine.Vector2 AsVector()
        {
            return new UnityEngine.Vector2(X.Value, Y.Value);
        }

        public override bool Equals(object obj)
        {
            return obj is YogaValue2 value &&
                   EqualityComparer<YogaValue>.Default.Equals(X, value.X) &&
                   EqualityComparer<YogaValue>.Default.Equals(Y, value.Y);
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
            return "initial";
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
        public static bool operator ==(YogaValue2 left, YogaValue2 right)
        {
            return left.X.Unit == right.X.Unit && left.X.Value == right.X.Value
                && left.Y.Unit == right.Y.Unit && left.Y.Value == right.Y.Value;
        }
        public static bool operator !=(YogaValue2 left, YogaValue2 right)
        {
            return !(left == right);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is YogaValue2 tto)
                return new YogaValue2(Interpolater.Interpolate(X, tto.X, t), Interpolater.Interpolate(Y, tto.Y, t));
            return t > 0.5f ? to : this;
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            IStyleConverter YogaValueParser = AllConverters.YogaValueConverter;

            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Parse(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return CssKeyword.Invalid;

                var sp = ParseFromPositioningLiteral(value);
                if (sp is YogaValue2 s) return s;

                var values = ParserHelpers.SplitWhitespace(value);

                if (values.Count == 1)
                {
                    var pr = YogaValueParser.Parse(values[0]);
                    if (pr is YogaValue fl) return new YogaValue2(fl, YogaValue.Undefined());
                }

                if (values.Count == 2)
                {
                    var pr1 = YogaValueParser.Parse(values[0]);
                    var pr2 = YogaValueParser.Parse(values[1]);
                    if (pr1 is YogaValue fl1)
                        if (pr2 is YogaValue fl2)
                            return new YogaValue2(fl1, fl2);
                }

                return CssKeyword.Invalid;
            }

            public object Convert(object value)
            {
                if (value is YogaValue2 o) return o;
                if (value is double d) return new YogaValue2((float) d, (float) d);
                if (value is float f) return new YogaValue2(f, f);
                if (value is int i) return new YogaValue2(i, i);
                if (value is YogaValue v) return new YogaValue2(v, v);
                if (value is Vector2 v2) return new YogaValue2(v2.x, v2.y);
                if (!(value is string) && (value is IEnumerable e)) return FromArray(e);
                return Parse(value?.ToString());
            }

            private object FromArray(IEnumerable obj)
            {
                var arr = obj.OfType<object>().ToArray();
                var len = arr.Length;

                if (len == 0) return YogaValue2.Zero;

                var v0 = arr.ElementAtOrDefault(0);
                var v1 = arr.ElementAtOrDefault(1);


                var v0f = YogaValueParser.Convert(v0);
                var v1f = YogaValueParser.Convert(v1);

                var r = v0f as YogaValue? ?? 0;
                var g = v1f as YogaValue? ?? 0;

                return new YogaValue2(r, g);
            }

            private object ParseFromPositioningLiteral(string str)
            {
                float x, y;
                var values = ParserHelpers.SplitWhitespace(str);

                if (values.Count > 2) return CssKeyword.Invalid;

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
                        else return CssKeyword.Invalid;
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
                        else return CssKeyword.Invalid;
                    }
                }
                else if (values.Contains("left"))
                {
                    if (hasDouble && !values.Contains("center")) return CssKeyword.Invalid;
                    x = 0;
                    y = 0.5f;
                }
                else if (values.Contains("right"))
                {
                    if (hasDouble && !values.Contains("center")) return CssKeyword.Invalid;
                    x = 1;
                    y = 0.5f;
                }
                else if (values.Contains("center"))
                {
                    if (hasDouble && values[0] != values[1]) return CssKeyword.Invalid;
                    x = 0.5f;
                    y = 0.5f;
                }
                else
                {
                    return CssKeyword.Invalid;
                }

                return new YogaValue2(YogaValue.Percent(x * 100), YogaValue.Percent(y * 100));
            }
        }
    }
}
