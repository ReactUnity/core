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

        /// <summary>Rectangular to polar. Unit-agnostic, so both Lab families share it.</summary>
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

        #region CIE Lab

        /// <summary>a/b axis value that a 100% percentage refers to in lab().</summary>
        public const float LabAxisReference = 125f;

        /// <summary>Chroma that a 100% chroma percentage refers to in lch().</summary>
        public const float LchChromaReference = 150f;

        private const double Epsilon = 216d / 24389d;
        private const double Kappa = 24389d / 27d;

        // The D50 white point, from the chromaticity CSS Color 4 specifies for lab().
        private const double WhiteX = 0.3457d / 0.3585d;
        private const double WhiteY = 1d;
        private const double WhiteZ = (1d - 0.3457d - 0.3585d) / 0.3585d;

        // CSS lab() is referenced to D50, so the chain is linear sRGB -> XYZ D65 -> XYZ D50 -> Lab.
        // The two matrices are kept apart rather than folded into one so each can be checked
        // against the table in CSS Color 4 that it came from.

        internal static void LinearSrgbToXyzD50(double r, double g, double b, out double x, out double y, out double z)
        {
            var x65 = 0.41239079926595934d * r + 0.357584339383878d * g + 0.1804807884018343d * b;
            var y65 = 0.21263900587151027d * r + 0.715168678767756d * g + 0.07219231536073371d * b;
            var z65 = 0.01933081871559182d * r + 0.11919477979462598d * g + 0.9505321522496607d * b;

            // Bradford-adapted D65 -> D50.
            x = 1.0479298208405488d * x65 + 0.022946793341019088d * y65 - 0.05019222954313557d * z65;
            y = 0.029627815688159344d * x65 + 0.990434484573249d * y65 - 0.01707382502938514d * z65;
            z = -0.009243058152591178d * x65 + 0.015055144896577895d * y65 + 0.7518742899580008d * z65;
        }

        internal static void XyzD50ToLinearSrgb(double x, double y, double z, out double r, out double g, out double b)
        {
            var x65 = 0.9554734527042182d * x - 0.023098536874261423d * y + 0.0632593086610217d * z;
            var y65 = -0.028369706963208136d * x + 1.0099954580058226d * y + 0.021041398966943008d * z;
            var z65 = 0.012314001688319899d * x - 0.020507696433477912d * y + 1.3303659366080753d * z;

            r = 3.2409699419045226d * x65 - 1.537383177570094d * y65 - 0.4986107602930034d * z65;
            g = -0.9692436362808796d * x65 + 1.8759675015077202d * y65 + 0.04155505740717559d * z65;
            b = 0.05563007969699366d * x65 - 0.20397695888897652d * y65 + 1.0569715142428786d * z65;
        }

        /// <summary>Lightness is 0..100 here, not 0..1 as in <see cref="ColorToOklab"/>.</summary>
        public static void ColorToLab(Color color, out float l, out float a, out float b)
        {
            LinearSrgbToXyzD50(
                SrgbToLinearPrecise(color.r),
                SrgbToLinearPrecise(color.g),
                SrgbToLinearPrecise(color.b),
                out var x, out var y, out var z);

            var fx = LabF(x / WhiteX);
            var fy = LabF(y / WhiteY);
            var fz = LabF(z / WhiteZ);

            l = (float) (116d * fy - 16d);
            a = (float) (500d * (fx - fy));
            b = (float) (200d * (fy - fz));
        }

        public static Color LabToColor(float l, float a, float b, float alpha)
        {
            var fy = (l + 16d) / 116d;
            var fx = a / 500d + fy;
            var fz = fy - b / 200d;

            // Y is recovered from L rather than from f(y), which is exact on the linear leg of the curve.
            var x = LabFInverse(fx) * WhiteX;
            var y = (l > Kappa * Epsilon ? fy * fy * fy : l / Kappa) * WhiteY;
            var z = LabFInverse(fz) * WhiteZ;

            XyzD50ToLinearSrgb(x, y, z, out var lr, out var lg, out var lb);

            // Clamped per channel, with the same hue-shifting caveat as OklabToColor.
            return new Color(
                Mathf.Clamp01((float) LinearToSrgbPrecise(lr)),
                Mathf.Clamp01((float) LinearToSrgbPrecise(lg)),
                Mathf.Clamp01((float) LinearToSrgbPrecise(lb)),
                alpha);
        }

        public static void ColorToLch(Color color, out float l, out float c, out float h)
        {
            ColorToLab(color, out l, out var a, out var b);
            LabToLch(a, b, out c, out h);
        }

        public static Color LchToColor(float l, float c, float h, float alpha)
        {
            LchToLab(c, h, out var a, out var b);
            return LabToColor(l, a, b, alpha);
        }

        private static double LabF(double t) => t > Epsilon ? Math.Pow(t, 1d / 3d) : (Kappa * t + 16d) / 116d;

        private static double LabFInverse(double f)
        {
            var cubed = f * f * f;
            return cubed > Epsilon ? cubed : (116d * f - 16d) / Kappa;
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
