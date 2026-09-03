using System;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// Conversions between the color spaces the CSS subset understands. Every entry point takes and
    /// returns gamma-encoded sRGB, which is what a Unity <see cref="Color"/> holds.
    /// </summary>
    public static class ColorSpaces
    {
        /// <summary>Chroma that a 100% chroma percentage refers to in oklch(), and the a/b reference in oklab().</summary>
        public const float OklchChromaReference = 0.4f;

        #region sRGB transfer function

        // The transfer function and the OKLab matrices are evaluated in double and narrowed at the
        // end. In float, encoding a linear 1.0 gives 1.055f - 0.055f == 0.99999994f, and that error
        // is enough to move a mixed channel across a rounding boundary. In double it narrows to 1f.

        public static float SrgbToLinear(float c) => (float) SrgbToLinearPrecise(c);

        public static float LinearToSrgb(float c) => (float) LinearToSrgbPrecise(c);

        internal static double SrgbToLinearPrecise(double c)
        {
            var sign = c < 0 ? -1d : 1d;
            c = Math.Abs(c);
            return sign * (c <= 0.04045d ? c / 12.92d : Math.Pow((c + 0.055d) / 1.055d, 2.4d));
        }

        internal static double LinearToSrgbPrecise(double c)
        {
            var sign = c < 0 ? -1d : 1d;
            c = Math.Abs(c);
            return sign * (c <= 0.0031308d ? c * 12.92d : 1.055d * Math.Pow(c, 1d / 2.4d) - 0.055d);
        }

        #endregion

        #region OKLab

        // Björn Ottosson's matrices. Linear sRGB <-> LMS <-> OKLab.

        public static void LinearSrgbToOklab(float r, float g, float b, out float ol, out float oa, out float ob)
        {
            LinearSrgbToOklabPrecise(r, g, b, out var l, out var a, out var bl);
            ol = (float) l;
            oa = (float) a;
            ob = (float) bl;
        }

        public static void OklabToLinearSrgb(float ol, float oa, float ob, out float r, out float g, out float b)
        {
            OklabToLinearSrgbPrecise(ol, oa, ob, out var lr, out var lg, out var lb);
            r = (float) lr;
            g = (float) lg;
            b = (float) lb;
        }

        internal static void LinearSrgbToOklabPrecise(double r, double g, double b, out double ol, out double oa, out double ob)
        {
            var l = 0.4122214708d * r + 0.5363325363d * g + 0.0514459929d * b;
            var m = 0.2119034982d * r + 0.6806995451d * g + 0.1073969566d * b;
            var s = 0.0883024619d * r + 0.2817188376d * g + 0.6299787005d * b;

            var l_ = Cbrt(l);
            var m_ = Cbrt(m);
            var s_ = Cbrt(s);

            ol = 0.2104542553d * l_ + 0.7936177850d * m_ - 0.0040720468d * s_;
            oa = 1.9779984951d * l_ - 2.4285922050d * m_ + 0.4505937099d * s_;
            ob = 0.0259040371d * l_ + 0.7827717662d * m_ - 0.8086757660d * s_;
        }

        internal static void OklabToLinearSrgbPrecise(double ol, double oa, double ob, out double r, out double g, out double b)
        {
            var l_ = ol + 0.3963377774d * oa + 0.2158037573d * ob;
            var m_ = ol - 0.1055613458d * oa - 0.0638541728d * ob;
            var s_ = ol - 0.0894841775d * oa - 1.2914855480d * ob;

            var l = l_ * l_ * l_;
            var m = m_ * m_ * m_;
            var s = s_ * s_ * s_;

            r = +4.0767416621d * l - 3.3077115913d * m + 0.2309699292d * s;
            g = -1.2684380046d * l + 2.6097574011d * m - 0.3413193965d * s;
            b = -0.0041960863d * l - 0.7034186147d * m + 1.7076147010d * s;
        }

        public static void ColorToOklab(Color color, out float l, out float a, out float b)
        {
            LinearSrgbToOklabPrecise(
                SrgbToLinearPrecise(color.r),
                SrgbToLinearPrecise(color.g),
                SrgbToLinearPrecise(color.b),
                out var ol, out var oa, out var ob);

            l = (float) ol;
            a = (float) oa;
            b = (float) ob;
        }

        public static Color OklabToColor(float l, float a, float b, float alpha)
        {
            OklabToLinearSrgbPrecise(l, a, b, out var lr, out var lg, out var lb);

            // Out-of-gamut OKLab is clamped per channel, which shifts hue on very saturated colors.
            // Proper CSS Color 4 gamut mapping reduces chroma instead; not implemented yet.
            return new Color(
                Mathf.Clamp01((float) LinearToSrgbPrecise(lr)),
                Mathf.Clamp01((float) LinearToSrgbPrecise(lg)),
                Mathf.Clamp01((float) LinearToSrgbPrecise(lb)),
                alpha);
        }

        #endregion

        #region OKLCh

        public static void ColorToOklch(Color color, out float l, out float c, out float h)
        {
            ColorToOklab(color, out l, out var a, out var b);
            LabToLch(a, b, out c, out h);
        }

        public static Color OklchToColor(float l, float c, float h, float alpha)
        {
            LchToLab(c, h, out var a, out var b);
            return OklabToColor(l, a, b, alpha);
        }

        public static void LabToLch(float a, float b, out float c, out float h)
        {
            c = Mathf.Sqrt(a * a + b * b);
            h = c < 1e-6f ? 0 : NormalizeHue(Mathf.Atan2(b, a) * Mathf.Rad2Deg);
        }

        public static void LchToLab(float c, float h, out float a, out float b)
        {
            var rad = h * Mathf.Deg2Rad;
            a = c * Mathf.Cos(rad);
            b = c * Mathf.Sin(rad);
        }

        #endregion

        #region HSL

        public static Color HslToColor(float h, float s, float l, float alpha)
        {
            HslToRgb(h, s, l, out var r, out var g, out var b);
            return new Color(r, g, b, alpha);
        }

        /// <summary>Hue is in degrees; saturation and lightness are 0..1.</summary>
        public static void HslToRgb(float h, float s, float l, out float r, out float g, out float b)
        {
            h = NormalizeHue(h) / 360f;

            if (s == 0)
            {
                r = g = b = l;
                return;
            }

            var q = l < 0.5f ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = HueToRgb(p, q, h + 1f / 3f);
            g = HueToRgb(p, q, h);
            b = HueToRgb(p, q, h - 1f / 3f);
        }

        /// <summary>Hue is in degrees; saturation and lightness are 0..1.</summary>
        public static void ColorToHsl(Color color, out float h, out float s, out float l)
        {
            var r = color.r;
            var g = color.g;
            var b = color.b;

            var max = Mathf.Max(r, Mathf.Max(g, b));
            var min = Mathf.Min(r, Mathf.Min(g, b));
            var delta = max - min;

            l = (max + min) / 2f;

            if (delta < 1e-6f)
            {
                h = 0;
                s = 0;
                return;
            }

            s = l > 0.5f ? delta / (2f - max - min) : delta / (max + min);

            if (max == r) h = (g - b) / delta + (g < b ? 6f : 0f);
            else if (max == g) h = (b - r) / delta + 2f;
            else h = (r - g) / delta + 4f;

            h = NormalizeHue(h * 60f);
        }

        private static float HueToRgb(float p, float q, float t)
        {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1f / 6) return p + (q - p) * 6 * t;
            if (t < 1f / 2) return q;
            if (t < 2f / 3) return p + (q - p) * (2f / 3 - t) * 6;
            return p;
        }

        #endregion

        public static float NormalizeHue(float h)
        {
            h %= 360f;
            if (h < 0) h += 360f;
            return h;
        }

        // Math.Pow returns NaN for negative bases, and OKLab's LMS values do go negative.
        private static double Cbrt(double x)
        {
            if (x < 0) return -Math.Pow(-x, 1d / 3d);
            return Math.Pow(x, 1d / 3d);
        }
    }
}
