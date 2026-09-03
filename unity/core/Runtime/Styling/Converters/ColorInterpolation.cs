using System;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public enum ColorInterpolationSpace
    {
        Srgb,
        SrgbLinear,
        Hsl,
        Lab,
        Lch,
        Oklab,
        Oklch,
    }

    public enum HueInterpolationMethod
    {
        Shorter,
        Longer,
        Increasing,
        Decreasing,
    }

    /// <summary>
    /// Mixing of two colors inside a given interpolation space, as CSS Color 4 defines it for
    /// color-mix(). Alpha is premultiplied so that mixing with a transparent color does not
    /// drag the result towards black.
    /// </summary>
    public static class ColorInterpolation
    {
        public static bool TryParseSpace(string name, out ColorInterpolationSpace space)
        {
            switch (name?.ToLowerInvariant())
            {
                case "srgb":
                    space = ColorInterpolationSpace.Srgb;
                    return true;
                case "srgb-linear":
                    space = ColorInterpolationSpace.SrgbLinear;
                    return true;
                case "hsl":
                    space = ColorInterpolationSpace.Hsl;
                    return true;
                case "lab":
                    space = ColorInterpolationSpace.Lab;
                    return true;
                case "lch":
                    space = ColorInterpolationSpace.Lch;
                    return true;
                case "oklab":
                    space = ColorInterpolationSpace.Oklab;
                    return true;
                case "oklch":
                    space = ColorInterpolationSpace.Oklch;
                    return true;
                default:
                    space = ColorInterpolationSpace.Oklab;
                    return false;
            }
        }

        public static bool TryParseHueMethod(string name, out HueInterpolationMethod method)
        {
            switch (name?.ToLowerInvariant())
            {
                case "shorter":
                    method = HueInterpolationMethod.Shorter;
                    return true;
                case "longer":
                    method = HueInterpolationMethod.Longer;
                    return true;
                case "increasing":
                    method = HueInterpolationMethod.Increasing;
                    return true;
                case "decreasing":
                    method = HueInterpolationMethod.Decreasing;
                    return true;
                default:
                    method = HueInterpolationMethod.Shorter;
                    return false;
            }
        }

        /// <summary>Index of the hue channel in the space's component triple, or -1 if it has none.</summary>
        public static int HueChannel(ColorInterpolationSpace space)
        {
            switch (space)
            {
                case ColorInterpolationSpace.Hsl: return 0;
                case ColorInterpolationSpace.Lch: return 2;
                case ColorInterpolationSpace.Oklch: return 2;
                default: return -1;
            }
        }

        /// <summary><paramref name="ratio"/> is the weight of <paramref name="to"/>.</summary>
        public static Color Mix(Color from, Color to, float ratio, ColorInterpolationSpace space, HueInterpolationMethod hueMethod)
        {
            Decompose(from, space, out var c1);
            Decompose(to, space, out var c2);

            var hue = HueChannel(space);

            if (hue >= 0)
            {
                var h1 = c1[hue];
                var h2 = c2[hue];
                InterpolateHue(ref h1, ref h2, hueMethod);
                c1[hue] = h1;
                c2[hue] = h2;
            }

            var a1 = from.a;
            var a2 = to.a;
            var alpha = Mathf.Lerp(a1, a2, ratio);

            var result = Vector3.zero;

            for (int i = 0; i < 3; i++)
            {
                if (i == hue)
                {
                    // Hue is an angle, so premultiplying it is meaningless.
                    result[i] = Mathf.Lerp(c1[i], c2[i], ratio);
                }
                else
                {
                    var premultiplied = Mathf.Lerp(c1[i] * a1, c2[i] * a2, ratio);
                    result[i] = alpha < 1e-6f ? 0 : premultiplied / alpha;
                }
            }

            return Compose(result, alpha, space);
        }

        private static void InterpolateHue(ref float h1, ref float h2, HueInterpolationMethod method)
        {
            h1 = ColorSpaces.NormalizeHue(h1);
            h2 = ColorSpaces.NormalizeHue(h2);

            var delta = h2 - h1;

            switch (method)
            {
                case HueInterpolationMethod.Shorter:
                    if (delta > 180) h2 -= 360;
                    else if (delta < -180) h2 += 360;
                    break;
                case HueInterpolationMethod.Longer:
                    if (delta > 0 && delta < 180) h2 -= 360;
                    else if (delta > -180 && delta <= 0) h2 += 360;
                    break;
                case HueInterpolationMethod.Increasing:
                    if (delta < 0) h2 += 360;
                    break;
                case HueInterpolationMethod.Decreasing:
                    if (delta > 0) h2 -= 360;
                    break;
            }
        }

        private static void Decompose(Color color, ColorInterpolationSpace space, out Vector3 comps)
        {
            float c0, c1, c2;

            switch (space)
            {
                case ColorInterpolationSpace.Srgb:
                    c0 = color.r;
                    c1 = color.g;
                    c2 = color.b;
                    break;
                case ColorInterpolationSpace.SrgbLinear:
                    c0 = ColorSpaces.SrgbToLinear(color.r);
                    c1 = ColorSpaces.SrgbToLinear(color.g);
                    c2 = ColorSpaces.SrgbToLinear(color.b);
                    break;
                case ColorInterpolationSpace.Hsl:
                    ColorSpaces.ColorToHsl(color, out c0, out c1, out c2);
                    break;
                case ColorInterpolationSpace.Lab:
                    ColorSpaces.ColorToLab(color, out c0, out c1, out c2);
                    break;
                case ColorInterpolationSpace.Lch:
                    ColorSpaces.ColorToLch(color, out c0, out c1, out c2);
                    break;
                case ColorInterpolationSpace.Oklab:
                    ColorSpaces.ColorToOklab(color, out c0, out c1, out c2);
                    break;
                case ColorInterpolationSpace.Oklch:
                    ColorSpaces.ColorToOklch(color, out c0, out c1, out c2);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(space));
            }

            comps = new Vector3(c0, c1, c2);
        }

        private static Color Compose(Vector3 comps, float alpha, ColorInterpolationSpace space)
        {
            switch (space)
            {
                case ColorInterpolationSpace.Srgb:
                    return new Color(Mathf.Clamp01(comps[0]), Mathf.Clamp01(comps[1]), Mathf.Clamp01(comps[2]), alpha);
                case ColorInterpolationSpace.SrgbLinear:
                    return new Color(
                        Mathf.Clamp01(ColorSpaces.LinearToSrgb(comps[0])),
                        Mathf.Clamp01(ColorSpaces.LinearToSrgb(comps[1])),
                        Mathf.Clamp01(ColorSpaces.LinearToSrgb(comps[2])),
                        alpha);
                case ColorInterpolationSpace.Hsl:
                    return ColorSpaces.HslToColor(comps[0], Mathf.Clamp01(comps[1]), Mathf.Clamp01(comps[2]), alpha);
                case ColorInterpolationSpace.Lab:
                    return ColorSpaces.LabToColor(comps[0], comps[1], comps[2], alpha);
                case ColorInterpolationSpace.Lch:
                    return ColorSpaces.LchToColor(comps[0], Mathf.Max(0, comps[1]), comps[2], alpha);
                case ColorInterpolationSpace.Oklab:
                    return ColorSpaces.OklabToColor(comps[0], comps[1], comps[2], alpha);
                case ColorInterpolationSpace.Oklch:
                    return ColorSpaces.OklchToColor(comps[0], Mathf.Max(0, comps[1]), comps[2], alpha);
                default:
                    throw new ArgumentOutOfRangeException(nameof(space));
            }
        }
    }
}
