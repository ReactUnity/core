using System;
using System.Runtime.CompilerServices;
using Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif
    [Serializable]
    public struct BorderImageSlice : Interpolatable, IEquatable<BorderImageSlice>
    {
        public static readonly BorderImageSlice Auto = new BorderImageSlice(YogaValue.Auto(), YogaValue.Auto(), YogaValue.Auto(), YogaValue.Auto(), false);

        public YogaValue Top;
        public YogaValue Right;
        public YogaValue Bottom;
        public YogaValue Left;
        public bool Fill;

        public BorderImageSlice(YogaValue top, YogaValue right, YogaValue bottom, YogaValue left, bool fill)
        {
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
            Fill = fill;
        }

        public BorderImageSlice(CssFourDirectional<YogaValue> values, bool fill)
        {
            Top = values.Top;
            Right = values.Right;
            Bottom = values.Bottom;
            Left = values.Left;
            Fill = fill;
        }

        public BorderImageSlice(bool fill)
        {
            Top = YogaValue.Auto();
            Right = YogaValue.Auto();
            Bottom = YogaValue.Auto();
            Left = YogaValue.Auto();
            Fill = fill;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is BorderImageSlice tto)
            {
                return new BorderImageSlice(
                    Interpolater.Interpolate(Top, tto.Top, t),
                    Interpolater.Interpolate(Right, tto.Right, t),
                    Interpolater.Interpolate(Bottom, tto.Bottom, t),
                    Interpolater.Interpolate(Left, tto.Left, t),
                    Interpolater.Interpolate(Fill, tto.Fill, t)
                );
            }
            return t > 0.5f ? to : this;
        }

        // Value equality, because the graphic guards a per-frame assignment with it -- and the
        // default for a struct is a reflective field walk.
        public override bool Equals(object obj) => obj is BorderImageSlice other && Equals(other);

        public bool Equals(BorderImageSlice other) =>
            Top == other.Top && Right == other.Right && Bottom == other.Bottom && Left == other.Left && Fill == other.Fill;

        public override int GetHashCode() => HashCode.Combine(Top, Right, Bottom, Left, Fill);

        public static bool operator ==(BorderImageSlice left, BorderImageSlice right) => left.Equals(right);

        public static bool operator !=(BorderImageSlice left, BorderImageSlice right) => !left.Equals(right);

        public class Converter : StyleConverterBase
        {
            StyleConverterBase ValueConverter = AllConverters.YogaValueConverter;
            StyleConverterBase FourDirectionalConverter = new CssFourDirectional<YogaValue>.Converter(AllConverters.YogaValueConverter);

            protected override System.Type TargetType => typeof(BorderImageSlice);

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                return SingleValue(value, out result);

            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                var fill = false;
                var splits = ParserHelpers.SplitWhitespace(value);

                for (int i = splits.Count - 1; i >= 0; i--)
                {
                    var el = splits[i];
                    if (el == "fill")
                    {
                        if (fill) return SingleValue(value, out result);

                        splits.RemoveAt(i);
                        fill = true;
                    }
                }

                if (splits.Count > 4) return SingleValue(value, out result);
                if (splits.Count == 0) return Constant(new BorderImageSlice(fill), out result);


                return ComputedMapper.Create(out result, string.Join(" ", splits), FourDirectionalConverter,
                    (resolvedValue) => {
                        if (resolvedValue is CssFourDirectional<YogaValue> fl1)
                            return new BorderImageSlice(fl1, fill);
                        return null;
                    });
            }

            private bool SingleValue(object value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, ValueConverter,
                    (resolvedValue) => {
                        if (resolvedValue is YogaValue fl1)
                            return new BorderImageSlice(fl1, fl1, fl1, fl1, false);
                        return null;
                    });
            }
        }
    }
}
