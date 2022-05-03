using System.Runtime.CompilerServices;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    public struct BackgroundSize : Interpolatable
    {
        public static readonly BackgroundSize Auto = new BackgroundSize(YogaValue2.Auto);
        public static readonly BackgroundSize Contain = new BackgroundSize(BackgroundSizeKeyword.Contain);
        public static readonly BackgroundSize Cover = new BackgroundSize(BackgroundSizeKeyword.Cover);

        public BackgroundSizeKeyword Keyword;
        public YogaValue2 Value;

        public bool IsCustom => Keyword == BackgroundSizeKeyword.Custom;

        public BackgroundSize(BackgroundSizeKeyword keyword)
        {
            Keyword = keyword;
            Value = YogaValue2.Undefined;
        }

        public BackgroundSize(YogaValue2 value)
        {
            Keyword = BackgroundSizeKeyword.Custom;
            Value = value;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is BackgroundSize tto)
            {
                if (Keyword != tto.Keyword) return t > 0.5f ? to : this;
                return new BackgroundSize((YogaValue2) Value.Interpolate(tto.Value, t));
            }
            return t > 0.5f ? to : this;
        }

        public class Converter : StyleConverterBase
        {
            StyleConverterBase ValueConverter = AllConverters.YogaValue2Converter;

            protected override System.Type TargetType => typeof(BackgroundSize);

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                return SingleValue(value, out result);

            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (value == "cover") return Constant(Cover, out result);
                if (value == "contain") return Constant(Contain, out result);

                return SingleValue(value, out result);
            }

            private bool SingleValue(object value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, ValueConverter,
                    (resolvedValue) => {
                        if (resolvedValue is YogaValue2 fl1) return new BackgroundSize(fl1);
                        return null;
                    });
            }
        }
    }

    public enum BackgroundSizeKeyword
    {
        Custom = 0,
        Cover = 1,
        Contain = 2,
    }

    public enum BackgroundRepeat
    {
        Repeat = 0,
        Space = 1,
        Round = 2,
        NoRepeat = 3,
    }

    public enum BackgroundBox
    {
        BorderBox = 0,
        ContentBox = 1,
        PaddingBox = 2,
    }

    public enum BackgroundAttachment
    {
        Scroll = 0,
        Fixed = 1,
        Local = 2,
    }

    public enum BackgroundBlendMode
    {
        Normal = 0,
        Color,
        Multiply,
        Screen,
        Overlay,
        Darken,
        Lighten,
        ColorDodge,
        ColorBurn,
        HardLight,
        SoftLight,
        Difference,
        Exclusion,
        Hue,
        Saturation,
        Luminosity,
    }
}
