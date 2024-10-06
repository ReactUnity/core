using System;
using System.Collections.Generic;
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

    /// <summary>
    /// https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function
    /// </summary>
    [Serializable]
    public class FilterDefinition : Interpolatable
    {
        public static FilterDefinition Default = new FilterDefinition();

        public float Blur { get; } = 0;
        public float Brightness { get; } = 1;
        public float Contrast { get; } = 1;
        public float Grayscale { get; } = 0;
        public float HueRotate { get; } = 0;
        public float Invert { get; } = 0;
        public float Opacity { get; } = 1;
        public float Saturate { get; } = 1;
        public float Grain { get; } = 0;
        public float Pixelate { get; } = 0;
        public float Sepia { get; } = 0;
        // public BoxShadow DropShadow;

        public FilterDefinition(
            float blur = 0,
            float brightness = 1,
            float contrast = 1,
            float grayscale = 0,
            float hueRotate = 0,
            float invert = 0,
            float opacity = 1,
            float saturate = 1,
            float grain = 0,
            float pixelate = 0,
            float sepia = 0

        )
        {
            Blur = blur;
            Brightness = brightness;
            Contrast = contrast;
            Grayscale = grayscale;
            HueRotate = hueRotate;
            Invert = invert;
            Opacity = opacity;
            Saturate = saturate;
            Grain = grain;
            Pixelate = pixelate;
            Sepia = sepia;
        }

        public object Interpolate(object to, float t)
        {
            var tto = to as FilterDefinition;
            if (tto == null) return t > 0.5 ? tto : this;

            return new FilterDefinition(
                blur: Interpolater.Interpolate(Blur, tto.Blur, t),
                brightness: Interpolater.Interpolate(Brightness, tto.Brightness, t),
                contrast: Interpolater.Interpolate(Contrast, tto.Contrast, t),
                grayscale: Interpolater.Interpolate(Grayscale, tto.Grayscale, t),
                hueRotate: Interpolater.Interpolate(HueRotate, tto.HueRotate, t),
                invert: Interpolater.Interpolate(Invert, tto.Invert, t),
                opacity: Interpolater.Interpolate(Opacity, tto.Opacity, t),
                saturate: Interpolater.Interpolate(Saturate, tto.Saturate, t),
                grain: Interpolater.Interpolate(Grain, tto.Grain, t),
                pixelate: Interpolater.Interpolate(Pixelate, tto.Pixelate, t),
                sepia: Interpolater.Interpolate(Sepia, tto.Sepia, t)
            );
        }

        public class Converter : StyleConverterBase
        {
            static IComputedValue blurDefault = new ComputedConstant(0);
            static IComputedValue brightnessDefault = new ComputedConstant(1);
            static IComputedValue contrastDefault = new ComputedConstant(1);
            static IComputedValue grayscaleDefault = new ComputedConstant(0);
            static IComputedValue hueRotateDefault = new ComputedConstant(0);
            static IComputedValue invertDefault = new ComputedConstant(0);
            static IComputedValue opacityDefault = new ComputedConstant(1);
            static IComputedValue saturateDefault = new ComputedConstant(1);
            static IComputedValue grainDefault = new ComputedConstant(0);
            static IComputedValue pixelateDefault = new ComputedConstant(0);
            static IComputedValue sepiaDefault = new ComputedConstant(0);

            protected override System.Type TargetType => typeof(FilterDefinition);

            protected override bool ParseInternal(string value, out IComputedValue result)
            {

                IComputedValue blur = blurDefault;
                IComputedValue brightness = brightnessDefault;
                IComputedValue contrast = contrastDefault;
                IComputedValue grayscale = grayscaleDefault;
                IComputedValue hueRotate = hueRotateDefault;
                IComputedValue invert = invertDefault;
                IComputedValue opacity = opacityDefault;
                IComputedValue saturate = saturateDefault;
                IComputedValue grain = grainDefault;
                IComputedValue pixelate = pixelateDefault;
                IComputedValue sepia = sepiaDefault;

                var calls = ParserHelpers.SplitWhitespace(value?.ToString());
                var count = calls.Count;

                result = null;

                for (int ci = 0; ci < count; ci++)
                {
                    var expression = calls[ci];

                    if (string.IsNullOrWhiteSpace(expression)) continue;

                    var (name, args, ac) = ParserHelpers.ParseFunction(expression);

                    var argCount = args.Length;

                    if (args == null || argCount == 0) continue;
                    else if (name == "blur") { if (!AllConverters.LengthConverter.TryConvert(ac, out blur)) return false; }
                    else if (name == "brightness") { if (!AllConverters.PercentageConverter.TryConvert(ac, out brightness)) return false; }
                    else if (name == "contrast") { if (!AllConverters.PercentageConverter.TryConvert(ac, out contrast)) return false; }
                    else if (name == "grayscale") { if (!AllConverters.PercentageConverter.TryConvert(ac, out grayscale)) return false; }
                    else if (name == "hue-rotate") { if (!AllConverters.AngleConverter.TryConvert(ac, out hueRotate)) return false; }
                    else if (name == "invert") { if (!AllConverters.PercentageConverter.TryConvert(ac, out invert)) return false; }
                    else if (name == "opacity") { if (!AllConverters.PercentageConverter.TryConvert(ac, out opacity)) return false; }
                    else if (name == "saturate") { if (!AllConverters.PercentageConverter.TryConvert(ac, out saturate)) return false; }
                    else if (name == "grain") { if (!AllConverters.PercentageConverter.TryConvert(ac, out grain)) return false; }
                    else if (name == "pixelate") { if (!AllConverters.LengthConverter.TryConvert(ac, out pixelate)) return false; }
                    else if (name == "sepia") { if (!AllConverters.PercentageConverter.TryConvert(ac, out sepia)) return false; }
                }

                result = new ComputedCompound(new List<IComputedValue> {
                    blur,
                    brightness,
                    contrast,
                    grayscale,
                    hueRotate,
                    invert,
                    opacity,
                    saturate,
                    grain,
                    pixelate,
                    sepia,
                }, new List<StyleConverterBase> {
                    AllConverters.LengthConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.AngleConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.LengthConverter,
                    AllConverters.PercentageConverter,
                }, values => new FilterDefinition(
                    blur: System.Convert.ToSingle(values[0]),
                    brightness: System.Convert.ToSingle(values[1]),
                    contrast: System.Convert.ToSingle(values[2]),
                    grayscale: System.Convert.ToSingle(values[3]),
                    hueRotate: System.Convert.ToSingle(values[4]),
                    invert: System.Convert.ToSingle(values[5]),
                    opacity: System.Convert.ToSingle(values[6]),
                    saturate: System.Convert.ToSingle(values[7]),
                    grain: System.Convert.ToSingle(values[8]),
                    pixelate: System.Convert.ToSingle(values[9]),
                    sepia: System.Convert.ToSingle(values[10])
                ));
                return true;
            }
        }

        #region Equality

        public override bool Equals(object obj)
        {
            return obj is FilterDefinition definition &&
                   Blur == definition.Blur &&
                   Brightness == definition.Brightness &&
                   Contrast == definition.Contrast &&
                   Grayscale == definition.Grayscale &&
                   HueRotate == definition.HueRotate &&
                   Invert == definition.Invert &&
                   Opacity == definition.Opacity &&
                   Saturate == definition.Saturate &&
                   Grain == definition.Grain &&
                   Pixelate == definition.Pixelate &&
                   Sepia == definition.Sepia;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Blur + Pixelate, Brightness, Contrast, Grayscale, HueRotate, Invert + Grain, Opacity, Saturate + Sepia);
        }

        #endregion
    }
}
