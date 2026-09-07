using System;
using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

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

        /// <summary>How far the grain's noise field is shifted. The hash amplifies any change, so
        /// animating this resamples the field rather than sliding it.</summary>
        public float GrainPhase { get; } = 0;

        /// <summary>Colour levels per channel. 0 is the identity: no quantisation.</summary>
        public float Posterize { get; } = 0;

        /// <summary>`scanlines`. Zero intensity is the identity: nothing is drawn.</summary>
        public float ScanlineIntensity { get; } = 0;
        public float ScanlinePeriod { get; } = DefaultScanlinePeriod;
        public float ScanlinePhase { get; } = 0;

        /// <summary>`tint`, multiplied into the result. White is the identity.</summary>
        public Color Tint { get; } = Color.white;

        /// <summary>How far the red and blue channels are pulled apart, in opposite directions.</summary>
        public float ChromaticAberration { get; } = 0;

        /// <summary>Two rows on, two off -- the period a CRT line pair reads as.</summary>
        public const float DefaultScanlinePeriod = 4f;

        /// <summary>`drop-shadow`. A clear colour is the identity: no shadow is drawn.</summary>
        public Color DropShadowColor { get; } = Color.clear;
        public Vector2 DropShadowOffset { get; } = Vector2.zero;
        public float DropShadowBlur { get; } = 0;

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
            float sepia = 0,
            float grainPhase = 0,
            float posterize = 0,
            float scanlineIntensity = 0,
            float scanlinePeriod = DefaultScanlinePeriod,
            float scanlinePhase = 0,
            Color? tint = null,
            float chromaticAberration = 0,
            Color? dropShadowColor = null,
            Vector2? dropShadowOffset = null,
            float dropShadowBlur = 0
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
            GrainPhase = grainPhase;
            Posterize = posterize;
            ScanlineIntensity = scanlineIntensity;
            ScanlinePeriod = scanlinePeriod;
            ScanlinePhase = scanlinePhase;
            Tint = tint ?? Color.white;
            ChromaticAberration = chromaticAberration;
            DropShadowColor = dropShadowColor ?? Color.clear;
            DropShadowOffset = dropShadowOffset ?? Vector2.zero;
            DropShadowBlur = dropShadowBlur;
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
                sepia: Interpolater.Interpolate(Sepia, tto.Sepia, t),
                grainPhase: Interpolater.Interpolate(GrainPhase, tto.GrainPhase, t),
                posterize: Interpolater.Interpolate(Posterize, tto.Posterize, t),
                scanlineIntensity: Interpolater.Interpolate(ScanlineIntensity, tto.ScanlineIntensity, t),
                scanlinePeriod: Interpolater.Interpolate(ScanlinePeriod, tto.ScanlinePeriod, t),
                scanlinePhase: Interpolater.Interpolate(ScanlinePhase, tto.ScanlinePhase, t),
                tint: Interpolater.Interpolate(Tint, tto.Tint, t),
                chromaticAberration: Interpolater.Interpolate(ChromaticAberration, tto.ChromaticAberration, t),
                dropShadowColor: Interpolater.Interpolate(DropShadowColor, tto.DropShadowColor, t),
                dropShadowOffset: Interpolater.Interpolate(DropShadowOffset, tto.DropShadowOffset, t),
                dropShadowBlur: Interpolater.Interpolate(DropShadowBlur, tto.DropShadowBlur, t)
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
            static IComputedValue grainPhaseDefault = new ComputedConstant(0);
            static IComputedValue posterizeDefault = new ComputedConstant(0);
            static IComputedValue scanlineIntensityDefault = new ComputedConstant(0);
            static IComputedValue scanlinePeriodDefault = new ComputedConstant(DefaultScanlinePeriod);
            static IComputedValue scanlinePhaseDefault = new ComputedConstant(0);
            static IComputedValue tintDefault = new ComputedConstant(Color.white);
            static IComputedValue chromaticAberrationDefault = new ComputedConstant(0);
            static IComputedValue dropShadowDefault = new ComputedConstant(BoxShadow.Default);

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
                IComputedValue grainPhase = grainPhaseDefault;
                IComputedValue posterize = posterizeDefault;
                IComputedValue scanlineIntensity = scanlineIntensityDefault;
                IComputedValue scanlinePeriod = scanlinePeriodDefault;
                IComputedValue scanlinePhase = scanlinePhaseDefault;
                IComputedValue tint = tintDefault;
                IComputedValue chromaticAberration = chromaticAberrationDefault;
                IComputedValue dropShadow = dropShadowDefault;

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
                    else if (name == "pixelate") { if (!AllConverters.LengthConverter.TryConvert(ac, out pixelate)) return false; }
                    else if (name == "sepia") { if (!AllConverters.PercentageConverter.TryConvert(ac, out sepia)) return false; }
                    else if (name == "posterize") { if (!AllConverters.FloatConverter.TryConvert(ac, out posterize)) return false; }
                    else if (name == "tint") { if (!AllConverters.ColorConverter.TryConvert(ac, out tint)) return false; }
                    else if (name == "chromatic-aberration") { if (!AllConverters.LengthConverter.TryConvert(ac, out chromaticAberration)) return false; }
                    // A trailing phase is what a keyframe animation drives: grain resamples its
                    // field, scanlines roll. Neither has one to interpolate otherwise.
                    else if (name == "grain")
                    {
                        var parts = ParserHelpers.SplitWhitespace(ac);
                        if (parts.Count == 0) continue;
                        if (!AllConverters.PercentageConverter.TryConvert(parts[0], out grain)) return false;
                        if (parts.Count > 1 && !AllConverters.FloatConverter.TryConvert(parts[1], out grainPhase)) return false;
                    }
                    else if (name == "scanlines")
                    {
                        var parts = ParserHelpers.SplitWhitespace(ac);
                        if (parts.Count == 0) continue;
                        if (!AllConverters.PercentageConverter.TryConvert(parts[0], out scanlineIntensity)) return false;
                        if (parts.Count > 1 && !AllConverters.LengthConverter.TryConvert(parts[1], out scanlinePeriod)) return false;
                        if (parts.Count > 2 && !AllConverters.LengthConverter.TryConvert(parts[2], out scanlinePhase)) return false;
                    }
                    // `drop-shadow(<x> <y> [blur] [color])`. BoxShadow's parser reads it as written
                    // and accepts a spread and `inset` besides, which CSS does not -- both ignored.
                    else if (name == "drop-shadow") { if (!AllConverters.BoxShadowConverter.TryConvert(ac, out dropShadow)) return false; }
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
                    grainPhase,
                    posterize,
                    scanlineIntensity,
                    scanlinePeriod,
                    scanlinePhase,
                    tint,
                    chromaticAberration,
                    dropShadow,
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
                    AllConverters.FloatConverter,
                    AllConverters.FloatConverter,
                    AllConverters.PercentageConverter,
                    AllConverters.LengthConverter,
                    AllConverters.LengthConverter,
                    AllConverters.ColorConverter,
                    AllConverters.LengthConverter,
                    AllConverters.BoxShadowConverter,
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
                    sepia: System.Convert.ToSingle(values[10]),
                    grainPhase: System.Convert.ToSingle(values[11]),
                    posterize: System.Convert.ToSingle(values[12]),
                    scanlineIntensity: System.Convert.ToSingle(values[13]),
                    scanlinePeriod: System.Convert.ToSingle(values[14]),
                    scanlinePhase: System.Convert.ToSingle(values[15]),
                    tint: values[16] is Color tintColor ? tintColor : Color.white,
                    chromaticAberration: System.Convert.ToSingle(values[17]),
                    dropShadowColor: (values[18] as BoxShadow)?.color,
                    dropShadowOffset: (values[18] as BoxShadow)?.offset,
                    // A single radius, since a filter's shadow has no axis of its own.
                    dropShadowBlur: (values[18] as BoxShadow)?.blur.x ?? 0
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
                   Sepia == definition.Sepia &&
                   GrainPhase == definition.GrainPhase &&
                   Posterize == definition.Posterize &&
                   ScanlineIntensity == definition.ScanlineIntensity &&
                   ScanlinePeriod == definition.ScanlinePeriod &&
                   ScanlinePhase == definition.ScanlinePhase &&
                   Tint == definition.Tint &&
                   ChromaticAberration == definition.ChromaticAberration &&
                   DropShadowColor == definition.DropShadowColor &&
                   DropShadowOffset == definition.DropShadowOffset &&
                   DropShadowBlur == definition.DropShadowBlur;
        }

        public override int GetHashCode()
        {
            // Combine takes eight, so the chain is grouped rather than packed into sums -- two
            // values whose sum collides are not the same filter.
            return HashCode.Combine(
                HashCode.Combine(Blur, Brightness, Contrast, Grayscale, HueRotate, Invert, Opacity, Saturate),
                HashCode.Combine(Grain, GrainPhase, Pixelate, Sepia, Posterize, Tint, ChromaticAberration),
                HashCode.Combine(ScanlineIntensity, ScanlinePeriod, ScanlinePhase),
                DropShadowColor, DropShadowOffset, DropShadowBlur);
        }

        #endregion
    }
}
