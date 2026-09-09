using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace ReactUnity.Types
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    /// <summary>The drawing commands <c>path()</c> and <c>shape()</c> share, named as CSS names them.</summary>
    public enum ClipPathCommandKind
    {
        Move = 0,
        Line = 1,
        HLine = 2,
        VLine = 3,
        Cubic = 4,
        Quadratic = 5,
        SmoothCubic = 6,
        SmoothQuadratic = 7,
        Arc = 8,
        Close = 9,
    }

    /// <summary>
    /// One command of a <c>path()</c> or a <c>shape()</c>. The two grammars differ only in how they
    /// spell a command -- SVG path data against CSS keywords -- so both parse to this, and one
    /// flattener in <see cref="ClipPathGeometry"/> serves them.
    /// </summary>
    /// <remarks>
    /// Coordinates are kept as written, so a <c>shape()</c>'s percentages follow the element as it
    /// resizes. <c>path()</c> has no percentages and fills these with points. Everything here is in
    /// CSS's own coordinates: y grows down from the reference box's top-left corner.
    /// </remarks>
    [Serializable]
    public struct ClipPathCommand : IEquatable<ClipPathCommand>
    {
        public ClipPathCommandKind Kind;

        /// <summary>Whether the coordinates are an offset from the current point -- SVG's lowercase
        /// commands, and CSS's `by` in place of `to`.</summary>
        public bool Relative;

        /// <summary>The endpoint. <see cref="ClipPathCommandKind.HLine"/> reads only X and
        /// <see cref="ClipPathCommandKind.VLine"/> only Y.</summary>
        public YogaValue2 To;

        public YogaValue2 Control1;
        public YogaValue2 Control2;

        /// <summary>An arc's two radii.</summary>
        public YogaValue2 Radius;

        /// <summary>An arc's x-axis rotation, in degrees.</summary>
        public float Angle;

        public bool LargeArc;

        /// <summary>An arc's sweep direction. CSS spells the two `cw` and `ccw`, SVG 1 and 0.</summary>
        public bool Clockwise;

        public static ClipPathCommand Simple(ClipPathCommandKind kind, bool relative, YogaValue2 to)
            => new ClipPathCommand { Kind = kind, Relative = relative, To = to };

        public static ClipPathCommand Curve(ClipPathCommandKind kind, bool relative, YogaValue2 to, YogaValue2 c1, YogaValue2 c2)
            => new ClipPathCommand { Kind = kind, Relative = relative, To = to, Control1 = c1, Control2 = c2 };

        public static ClipPathCommand ArcTo(bool relative, YogaValue2 to, YogaValue2 radius, float angle, bool largeArc, bool clockwise)
            => new ClipPathCommand
            {
                Kind = ClipPathCommandKind.Arc,
                Relative = relative,
                To = to,
                Radius = radius,
                Angle = angle,
                LargeArc = largeArc,
                Clockwise = clockwise,
            };

        public static readonly ClipPathCommand ClosePath = new ClipPathCommand { Kind = ClipPathCommandKind.Close };

        public bool Equals(ClipPathCommand other) =>
            Kind == other.Kind && Relative == other.Relative && To == other.To &&
            Control1 == other.Control1 && Control2 == other.Control2 && Radius == other.Radius &&
            Angle == other.Angle && LargeArc == other.LargeArc && Clockwise == other.Clockwise;

        public override bool Equals(object obj) => obj is ClipPathCommand other && Equals(other);

        public override int GetHashCode() => HashCode.Combine((int) Kind, Relative, To, Control1, Control2, Radius, Angle);

        /// <summary>Whether two commands can meet halfway. CSS interpolates a command list only
        /// against one of the same shape, which is everything but the coordinates.</summary>
        public bool Matches(ClipPathCommand other) =>
            Kind == other.Kind && Relative == other.Relative &&
            LargeArc == other.LargeArc && Clockwise == other.Clockwise;
    }

    /// <summary>
    /// SVG path data, as <c>clip-path: path()</c> takes it. Everything here produces
    /// <see cref="ClipPathCommand"/>s, so a parsed path and a parsed <c>shape()</c> are the same
    /// thing by the time anything draws them.
    /// </summary>
    public static class ClipPathCommands
    {
        static readonly CultureInfo Culture = CultureInfo.InvariantCulture;

        /// <summary>
        /// How many commands one value may carry. Path data is authored by tools, so this is a
        /// bound on pathological input rather than on anything a person would write.
        /// </summary>
        public const int MaxCommands = 4096;

        /// <summary>
        /// Reads SVG path data -- the `d` attribute's grammar, every command letter of it. Numbers
        /// are lengths in px: CSS gives `path()` no percentages, which is the one thing it cannot
        /// express that <c>shape()</c> can.
        /// </summary>
        public static bool TryParsePathData(string data, out List<ClipPathCommand> commands)
        {
            commands = null;
            if (string.IsNullOrWhiteSpace(data)) return false;

            var result = new List<ClipPathCommand>();
            var i = 0;
            var len = data.Length;
            var command = '\0';

            while (true)
            {
                SkipSeparators(data, ref i);
                if (i >= len) break;

                var c = data[i];

                if (char.IsLetter(c))
                {
                    command = c;
                    i++;
                }
                else if (command == '\0') return false;
                else
                {
                    // A repeated argument list carries on with the same command, except that more
                    // pairs after a moveto are linetos -- the one place SVG changes it for you.
                    if (command == 'M') command = 'L';
                    else if (command == 'm') command = 'l';
                }

                // Path data has to open with a moveto, so nothing can draw from an undefined point.
                if (result.Count == 0 && command != 'M' && command != 'm') return false;
                if (result.Count >= MaxCommands) return false;

                var relative = char.IsLower(command);

                switch (char.ToUpperInvariant(command))
                {
                    case 'M':
                    case 'L':
                    {
                        if (!ReadPoint(data, ref i, out var p)) return false;
                        result.Add(ClipPathCommand.Simple(
                            char.ToUpperInvariant(command) == 'M' ? ClipPathCommandKind.Move : ClipPathCommandKind.Line, relative, p));
                        break;
                    }

                    case 'H':
                    {
                        if (!ReadNumber(data, ref i, out var x)) return false;
                        result.Add(ClipPathCommand.Simple(ClipPathCommandKind.HLine, relative, YogaValue2.Point(x, 0)));
                        break;
                    }

                    case 'V':
                    {
                        if (!ReadNumber(data, ref i, out var y)) return false;
                        result.Add(ClipPathCommand.Simple(ClipPathCommandKind.VLine, relative, YogaValue2.Point(0, y)));
                        break;
                    }

                    case 'C':
                    {
                        if (!ReadPoint(data, ref i, out var c1) || !ReadPoint(data, ref i, out var c2) ||
                            !ReadPoint(data, ref i, out var to)) return false;
                        result.Add(ClipPathCommand.Curve(ClipPathCommandKind.Cubic, relative, to, c1, c2));
                        break;
                    }

                    case 'S':
                    {
                        if (!ReadPoint(data, ref i, out var c2) || !ReadPoint(data, ref i, out var to)) return false;
                        result.Add(ClipPathCommand.Curve(ClipPathCommandKind.SmoothCubic, relative, to, YogaValue2.Zero, c2));
                        break;
                    }

                    case 'Q':
                    {
                        if (!ReadPoint(data, ref i, out var c1) || !ReadPoint(data, ref i, out var to)) return false;
                        result.Add(ClipPathCommand.Curve(ClipPathCommandKind.Quadratic, relative, to, c1, YogaValue2.Zero));
                        break;
                    }

                    case 'T':
                    {
                        if (!ReadPoint(data, ref i, out var to)) return false;
                        result.Add(ClipPathCommand.Simple(ClipPathCommandKind.SmoothQuadratic, relative, to));
                        break;
                    }

                    case 'A':
                    {
                        if (!ReadNumber(data, ref i, out var rx) || !ReadNumber(data, ref i, out var ry) ||
                            !ReadNumber(data, ref i, out var angle) ||
                            !ReadFlag(data, ref i, out var large) || !ReadFlag(data, ref i, out var sweep) ||
                            !ReadPoint(data, ref i, out var to)) return false;
                        result.Add(ClipPathCommand.ArcTo(relative, to, YogaValue2.Point(rx, ry), angle, large, sweep));
                        break;
                    }

                    case 'Z':
                        result.Add(ClipPathCommand.ClosePath);
                        break;

                    default:
                        return false;
                }
            }

            if (result.Count == 0) return false;

            commands = result;
            return true;
        }

        static void SkipSeparators(string s, ref int i)
        {
            while (i < s.Length && (char.IsWhiteSpace(s[i]) || s[i] == ',')) i++;
        }

        static bool ReadPoint(string s, ref int i, out YogaValue2 point)
        {
            point = YogaValue2.Zero;
            if (!ReadNumber(s, ref i, out var x) || !ReadNumber(s, ref i, out var y)) return false;
            point = YogaValue2.Point(x, y);
            return true;
        }

        /// <summary>An arc's two flags, which SVG lets run together: `a1 1 0 011 1` is five
        /// numbers, a `1` flag and a `1`, not a stray eleven.</summary>
        static bool ReadFlag(string s, ref int i, out bool flag)
        {
            flag = false;
            SkipSeparators(s, ref i);
            if (i >= s.Length) return false;

            var c = s[i];
            if (c != '0' && c != '1') return false;

            flag = c == '1';
            i++;
            return true;
        }

        static bool ReadNumber(string s, ref int i, out float value)
        {
            value = 0;
            SkipSeparators(s, ref i);

            var start = i;
            var len = s.Length;

            if (i < len && (s[i] == '+' || s[i] == '-')) i++;

            var digits = false;
            while (i < len && char.IsDigit(s[i]))
            {
                digits = true;
                i++;
            }

            // A second dot starts the next number rather than extending this one, which is what
            // makes `.5.5` a pair -- the shortest way a minifier can write one.
            if (i < len && s[i] == '.')
            {
                i++;
                while (i < len && char.IsDigit(s[i]))
                {
                    digits = true;
                    i++;
                }
            }

            if (!digits) return false;

            if (i < len && (s[i] == 'e' || s[i] == 'E'))
            {
                var exponent = i;
                i++;
                if (i < len && (s[i] == '+' || s[i] == '-')) i++;

                if (i < len && char.IsDigit(s[i]))
                {
                    while (i < len && char.IsDigit(s[i])) i++;
                }
                else i = exponent; // Not an exponent after all -- `1em` is a number and a letter.
            }

            return float.TryParse(s.Substring(start, i - start), NumberStyles.Float, Culture, out value);
        }
    }
}
