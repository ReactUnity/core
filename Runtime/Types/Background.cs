using ReactUnity.Converters;
using ReactUnity.Styling;

namespace ReactUnity.Types
{
    public struct BackgroundSize
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

        public class Converter : IStyleConverter
        {
            IStyleConverter ValueConverter = AllConverters.YogaValue2Converter;

            public bool CanHandleKeyword(CssKeyword keyword) => ValueConverter.CanHandleKeyword(keyword);

            public object Convert(object value)
            {
                if (value is string s) return Parse(s);
                if (value is BackgroundSize) return value;
                return CssKeyword.Invalid;
            }

            public object Parse(string value)
            {
                if (value == "cover") return Cover;
                if (value == "contain") return Contain;

                var val = ValueConverter.Parse(value);
                if (val is YogaValue2 v) return new BackgroundSize(v);

                return CssKeyword.Invalid;
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
