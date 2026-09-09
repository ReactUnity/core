using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;
using Yoga;

namespace ReactUnity.Types
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    public enum ClipPathKind
    {
        None = 0,
        Inset = 1,
        Circle = 2,
        Ellipse = 3,
        Polygon = 4,
    }

    /// <summary>Where a circle's or an ellipse's radius comes from, when it is a keyword and not a length.</summary>
    public enum ClipRadiusExtent
    {
        Length = 0,
        ClosestSide = 1,
        FarthestSide = 2,
    }

    /// <summary>
    /// https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path -- the basic-shape subset:
    /// inset(), circle(), ellipse() and polygon().
    /// </summary>
    /// <remarks>
    /// Values are kept as written and resolved against the element's box by <see cref="Resolve"/>,
    /// which both the shader uniforms and hit testing go through -- so a percentage or a calc()
    /// follows the element as it resizes.
    /// </remarks>
    [Serializable]
    public class ClipPath : Interpolatable
    {
        public static readonly ClipPath None = new ClipPath();

        /// <summary>
        /// How many points a polygon() may carry. The shader walks the ring with a constant-bound
        /// loop so its uniform-array indices stay compile-time constants, which is what keeps the
        /// walk inside a fragment shader's register budget; a longer list is cut to this.
        /// </summary>
        public const int MaxPolygonPoints = 16;

        public ClipPathKind Kind { get; }

        /// <summary>inset(), as a distance in from each edge of the border box.</summary>
        public YogaValue Top { get; } = YogaValue.Point(0);
        public YogaValue Right { get; } = YogaValue.Point(0);
        public YogaValue Bottom { get; } = YogaValue.Point(0);
        public YogaValue Left { get; } = YogaValue.Point(0);

        /// <summary>The `round` radii, in the corner order CSS writes: top-left first, clockwise.</summary>
        public YogaValue2 TopLeftRadius { get; } = YogaValue2.Zero;
        public YogaValue2 TopRightRadius { get; } = YogaValue2.Zero;
        public YogaValue2 BottomRightRadius { get; } = YogaValue2.Zero;
        public YogaValue2 BottomLeftRadius { get; } = YogaValue2.Zero;

        /// <summary>The `at position`, measured from the box's top-left as CSS positions are.</summary>
        public YogaValue2 Position { get; } = YogaValue2.Center;

        public YogaValue RadiusX { get; } = YogaValue.Point(0);
        public YogaValue RadiusY { get; } = YogaValue.Point(0);
        public ClipRadiusExtent ExtentX { get; } = ClipRadiusExtent.ClosestSide;
        public ClipRadiusExtent ExtentY { get; } = ClipRadiusExtent.ClosestSide;

        /// <summary>polygon() vertices, from the box's top-left.</summary>
        public YogaValue2[] Points { get; } = new YogaValue2[0];

        /// <summary>`evenodd`. CSS defaults to `nonzero`, and the two differ only where a polygon crosses itself.</summary>
        public bool EvenOdd { get; }

        public ClipPath()
        {
            Kind = ClipPathKind.None;
        }

        public static ClipPath Inset(YogaValue top, YogaValue right, YogaValue bottom, YogaValue left,
            YogaValue2 tl = default, YogaValue2 tr = default, YogaValue2 br = default, YogaValue2 bl = default)
            => new ClipPath(top, right, bottom, left, tl, tr, br, bl);

        private ClipPath(YogaValue top, YogaValue right, YogaValue bottom, YogaValue left,
            YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            Kind = ClipPathKind.Inset;
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
            TopLeftRadius = tl;
            TopRightRadius = tr;
            BottomRightRadius = br;
            BottomLeftRadius = bl;
        }

        public static ClipPath Circle(YogaValue radius, ClipRadiusExtent extent, YogaValue2 position)
            => new ClipPath(ClipPathKind.Circle, radius, radius, extent, extent, position);

        public static ClipPath Ellipse(YogaValue rx, YogaValue ry, ClipRadiusExtent ex, ClipRadiusExtent ey, YogaValue2 position)
            => new ClipPath(ClipPathKind.Ellipse, rx, ry, ex, ey, position);

        private ClipPath(ClipPathKind kind, YogaValue rx, YogaValue ry, ClipRadiusExtent ex, ClipRadiusExtent ey, YogaValue2 position)
        {
            Kind = kind;
            RadiusX = rx;
            RadiusY = ry;
            ExtentX = ex;
            ExtentY = ey;
            Position = position;
        }

        public ClipPath(YogaValue2[] points, bool evenOdd)
        {
            Kind = ClipPathKind.Polygon;
            Points = points ?? new YogaValue2[0];
            EvenOdd = evenOdd;
        }

        /// <summary>A shape resolved against a box, in the box's own points with y growing upwards.</summary>
        public struct Resolved
        {
            public ClipPathKind Kind;

            /// <summary>inset(): the rectangle that survives.</summary>
            public Rect Box;
            /// <summary>Corner radii, top-left first and clockwise, already clamped to fit the box.</summary>
            public Vector4 RadiiX;
            public Vector4 RadiiY;

            /// <summary>circle() and ellipse().</summary>
            public Vector2 Center;
            public Vector2 Radius;

            /// <summary>polygon(), closed: the first point is repeated at the end.</summary>
            public Vector2[] Ring;
            public bool EvenOdd;
        }

        /// <summary>
        /// The shape in the box's coordinates, y up from its bottom edge -- the space the composite's
        /// fragment shader works in, and the one RectTransform.rect reports hits in.
        /// </summary>
        public Resolved Resolve(Vector2 size)
        {
            var result = new Resolved { Kind = Kind, EvenOdd = EvenOdd };

            switch (Kind)
            {
                case ClipPathKind.Inset:
                {
                    // CSS measures `top` from the top edge, where y grows the other way here.
                    var minX = Left.GetPointValue(size.x, 0);
                    var maxX = size.x - Right.GetPointValue(size.x, 0);
                    var minY = Bottom.GetPointValue(size.y, 0);
                    var maxY = size.y - Top.GetPointValue(size.y, 0);

                    result.Box = Rect.MinMaxRect(minX, minY, Mathf.Max(minX, maxX), Mathf.Max(minY, maxY));
                    ResolveRadii(result.Box.size, out result.RadiiX, out result.RadiiY);
                    break;
                }

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                {
                    var pos = Position.GetPointValue(size, 0f, true);
                    result.Center = pos;

                    var rx = ResolveRadius(RadiusX, ExtentX, size, pos, true);
                    var ry = ResolveRadius(RadiusY, ExtentY, size, pos, false);

                    // A circle has one radius for both axes, so a side keyword takes the closest or
                    // farthest of all four sides rather than one per axis, and a percentage resolves
                    // against the box's diagonal rather than against either side.
                    if (Kind == ClipPathKind.Circle)
                    {
                        if (ExtentX == ClipRadiusExtent.ClosestSide) rx = ry = Mathf.Min(rx, ry);
                        else if (ExtentX == ClipRadiusExtent.FarthestSide) rx = ry = Mathf.Max(rx, ry);
                        else if (RadiusX.Unit == YogaUnit.Percent)
                            rx = ry = RadiusX.Value / 100f * Mathf.Sqrt((size.x * size.x + size.y * size.y) / 2f);
                    }

                    result.Radius = new Vector2(Mathf.Max(rx, 0), Mathf.Max(ry, 0));
                    break;
                }

                case ClipPathKind.Polygon:
                {
                    var count = Mathf.Min(Points.Length, MaxPolygonPoints);
                    if (count < 3) break;

                    var ring = new Vector2[count + 1];
                    for (int i = 0; i < count; i++) ring[i] = Points[i].GetPointValue(size, 0f, true);
                    ring[count] = ring[0];
                    result.Ring = ring;
                    break;
                }
            }

            return result;
        }

        private static float ResolveRadius(YogaValue value, ClipRadiusExtent extent, Vector2 size, Vector2 center, bool horizontal)
        {
            if (extent == ClipRadiusExtent.Length)
                return value.GetPointValue(horizontal ? size.x : size.y, 0);

            var near = horizontal ? center.x : center.y;
            var far = (horizontal ? size.x : size.y) - near;
            return extent == ClipRadiusExtent.ClosestSide ? Mathf.Min(near, far) : Mathf.Max(near, far);
        }

        /// <summary>
        /// The four corner radii, scaled down together if any pair overflows the side it shares --
        /// the same reduction border-radius gets, so `inset(0 round 100%)` is a stadium rather than
        /// four overlapping quarter-ellipses.
        /// </summary>
        private void ResolveRadii(Vector2 box, out Vector4 x, out Vector4 y)
        {
            x = new Vector4(
                TopLeftRadius.X.GetPointValue(box.x, 0),
                TopRightRadius.X.GetPointValue(box.x, 0),
                BottomRightRadius.X.GetPointValue(box.x, 0),
                BottomLeftRadius.X.GetPointValue(box.x, 0));
            y = new Vector4(
                TopLeftRadius.Y.GetPointValue(box.y, 0),
                TopRightRadius.Y.GetPointValue(box.y, 0),
                BottomRightRadius.Y.GetPointValue(box.y, 0),
                BottomLeftRadius.Y.GetPointValue(box.y, 0));

            var f = 1f;
            f = Mathf.Min(f, Ratio(box.x, x.x + x.y)); // top
            f = Mathf.Min(f, Ratio(box.x, x.w + x.z)); // bottom
            f = Mathf.Min(f, Ratio(box.y, y.x + y.w)); // left
            f = Mathf.Min(f, Ratio(box.y, y.y + y.z)); // right

            if (f < 1f)
            {
                x *= f;
                y *= f;
            }
        }

        private static float Ratio(float side, float sum) => sum > 0 ? side / sum : 1f;

        /// <summary>Interpolater has no pair overload for this; the struct interpolates itself.</summary>
        private static YogaValue2 Lerp(YogaValue2 from, YogaValue2 to, float t) => (YogaValue2) from.Interpolate(to, t);

        public object Interpolate(object to, float t)
        {
            var tto = to as ClipPath;
            if (tto == null) return t > 0.5f ? to : this;

            // Only shapes of one kind have anything to interpolate between; CSS makes the rest
            // discrete, and so is a polygon whose point count changed.
            if (tto.Kind != Kind) return t > 0.5f ? tto : (object) this;

            switch (Kind)
            {
                case ClipPathKind.Inset:
                    return Inset(
                        Interpolater.Interpolate(Top, tto.Top, t),
                        Interpolater.Interpolate(Right, tto.Right, t),
                        Interpolater.Interpolate(Bottom, tto.Bottom, t),
                        Interpolater.Interpolate(Left, tto.Left, t),
                        Lerp(TopLeftRadius, tto.TopLeftRadius, t),
                        Lerp(TopRightRadius, tto.TopRightRadius, t),
                        Lerp(BottomRightRadius, tto.BottomRightRadius, t),
                        Lerp(BottomLeftRadius, tto.BottomLeftRadius, t));

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    // An extent keyword is not a length, so it cannot meet one halfway.
                    if (ExtentX != tto.ExtentX || ExtentY != tto.ExtentY) return t > 0.5f ? tto : (object) this;
                    return new ClipPath(Kind,
                        Interpolater.Interpolate(RadiusX, tto.RadiusX, t),
                        Interpolater.Interpolate(RadiusY, tto.RadiusY, t),
                        ExtentX, ExtentY,
                        Lerp(Position, tto.Position, t));

                case ClipPathKind.Polygon:
                {
                    if (Points.Length != tto.Points.Length || EvenOdd != tto.EvenOdd) return t > 0.5f ? tto : (object) this;
                    var points = new YogaValue2[Points.Length];
                    for (int i = 0; i < points.Length; i++) points[i] = Lerp(Points[i], tto.Points[i], t);
                    return new ClipPath(points, EvenOdd);
                }
            }

            return this;
        }

        public class Converter : TypedStyleConverterBase<ClipPath>
        {
            private static readonly StyleConverterBase Length = AllConverters.YogaValueConverter;
            private static readonly StyleConverterBase PositionConverter = AllConverters.YogaValue2Converter;
            private static readonly StyleConverterBase RadiusConverter = AllConverters.BorderRadiusConverter;

            /// <summary>
            /// Geometry boxes CSS lets a shape carry. Only the border box is drawn against here, so
            /// they parse and are dropped rather than making the whole declaration invalid.
            /// </summary>
            private static readonly HashSet<string> GeometryBoxes = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "border-box", "padding-box", "content-box", "margin-box",
                "fill-box", "stroke-box", "view-box",
            };

            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                return base.HandleKeyword(keyword, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                result = null;

                var shape = (string) null;
                var parts = ParserHelpers.SplitFunctionList(value);
                for (int i = 0; i < parts.Count; i++)
                {
                    var trimmed = parts[i]?.Trim();
                    if (string.IsNullOrEmpty(trimmed)) continue;
                    if (GeometryBoxes.Contains(trimmed)) continue;
                    if (shape != null) return false;
                    shape = trimmed;
                }

                if (shape == null) return false;

                var (name, args, ac) = ParserHelpers.ParseFunction(shape);
                if (name == null || args == null) return false;

                switch (name.ToLowerInvariant())
                {
                    case "inset": return ParseInset(ac, out result);
                    case "circle": return ParseCircle(ac, false, out result);
                    case "ellipse": return ParseCircle(ac, true, out result);
                    case "polygon": return ParsePolygon(args, out result);
                    default: return false;
                }
            }

            private static bool ParseInset(string args, out IComputedValue result)
            {
                result = null;

                var round = args.IndexOf(" round ", StringComparison.OrdinalIgnoreCase);
                var edgePart = round < 0 ? args : args.Substring(0, round);
                var radiusPart = round < 0 ? null : args.Substring(round + 7);

                var edges = ParserHelpers.SplitWhitespace(edgePart);
                if (edges.Count < 1 || edges.Count > 4) return false;

                // The one-to-four shorthand every box edge list uses.
                var top = edges[0];
                var right = edges.Count > 1 ? edges[1] : top;
                var bottom = edges.Count > 2 ? edges[2] : top;
                var left = edges.Count > 3 ? edges[3] : right;

                var values = new List<object> { top, right, bottom, left };
                var converters = new List<StyleConverterBase> { Length, Length, Length, Length };

                var hasRadii = radiusPart != null;

                if (hasRadii)
                {
                    if (!SplitCornerRadii(radiusPart, out var corners)) return false;
                    values.AddRange(corners);
                    for (int i = 0; i < corners.Count; i++) converters.Add(RadiusConverter);
                }

                return ComputedCompound.Create(out result, values, converters, resolved => {
                    if (!(resolved[0] is YogaValue t) || !(resolved[1] is YogaValue r) ||
                        !(resolved[2] is YogaValue b) || !(resolved[3] is YogaValue l)) return null;

                    if (!hasRadii) return Inset(t, r, b, l);

                    if (!(resolved[4] is YogaValue2 tl) || !(resolved[5] is YogaValue2 tr) ||
                        !(resolved[6] is YogaValue2 br) || !(resolved[7] is YogaValue2 bl)) return null;

                    return Inset(t, r, b, l, tl, tr, br, bl);
                });
            }

            /// <summary>
            /// The `round` argument in its own right: the border-radius grammar, one to four values
            /// per axis with the axes split on a slash, expanded to exactly four corners.
            /// </summary>
            private static bool SplitCornerRadii(string value, out List<object> corners)
            {
                corners = null;

                var axes = ParserHelpers.SplitSlash(value);
                if (axes.Count > 2) return false;

                var xs = ParserHelpers.SplitWhitespace(axes[0]);
                if (xs.Count < 1 || xs.Count > 4) return false;

                var ys = axes.Count > 1 ? ParserHelpers.SplitWhitespace(axes[1]) : xs;
                if (ys.Count < 1 || ys.Count > 4) return false;

                corners = new List<object>(4);
                for (int i = 0; i < 4; i++) corners.Add(Corner(xs, i) + " " + Corner(ys, i));
                return true;
            }

            private static string Corner(List<string> values, int index)
            {
                switch (index)
                {
                    case 0: return values[0];
                    case 1: return values.Count > 1 ? values[1] : values[0];
                    case 2: return values.Count > 2 ? values[2] : values[0];
                    default: return values.Count > 3 ? values[3] : (values.Count > 1 ? values[1] : values[0]);
                }
            }

            private static bool ParseCircle(string args, bool ellipse, out IComputedValue result)
            {
                result = null;

                var trimmed = (args ?? "").Trim();
                var at = trimmed.IndexOf(" at ", StringComparison.OrdinalIgnoreCase);
                var radiusPart = at < 0 ? trimmed : trimmed.Substring(0, at);
                var position = at < 0 ? "center" : trimmed.Substring(at + 4);

                // The whole argument may be a bare `at ...`, which the leading-space search cannot see.
                if (radiusPart.StartsWith("at ", StringComparison.OrdinalIgnoreCase))
                {
                    position = radiusPart.Substring(3);
                    radiusPart = "";
                }

                var radii = ParserHelpers.SplitWhitespace(radiusPart);
                var wanted = ellipse ? 2 : 1;
                if (radii.Count > wanted) return false;

                var extentX = ClipRadiusExtent.ClosestSide;
                var extentY = ClipRadiusExtent.ClosestSide;
                object rx = "0";
                object ry = "0";

                if (radii.Count > 0) ReadRadius(radii[0], ref extentX, ref rx);

                if (!ellipse || radii.Count < 2)
                {
                    extentY = extentX;
                    ry = rx;
                }
                else ReadRadius(radii[1], ref extentY, ref ry);

                var values = new List<object> { rx, ry, position };
                var converters = new List<StyleConverterBase> { Length, Length, PositionConverter };

                return ComputedCompound.Create(out result, values, converters, resolved => {
                    if (!(resolved[0] is YogaValue x) || !(resolved[1] is YogaValue y) ||
                        !(resolved[2] is YogaValue2 pos)) return null;

                    return ellipse
                        ? Ellipse(x, y, extentX, extentY, pos)
                        : Circle(x, extentX, pos);
                });
            }

            private static void ReadRadius(string value, ref ClipRadiusExtent extent, ref object length)
            {
                if (string.Equals(value, "closest-side", StringComparison.OrdinalIgnoreCase))
                {
                    extent = ClipRadiusExtent.ClosestSide;
                    return;
                }

                if (string.Equals(value, "farthest-side", StringComparison.OrdinalIgnoreCase))
                {
                    extent = ClipRadiusExtent.FarthestSide;
                    return;
                }

                extent = ClipRadiusExtent.Length;
                length = value;
            }

            private static bool ParsePolygon(string[] args, out IComputedValue result)
            {
                result = null;
                if (args.Length == 0) return false;

                var evenOdd = false;
                var first = 0;

                // An optional fill rule sits in the first comma-separated slot, ahead of the points.
                var head = ParserHelpers.SplitWhitespace(args[0]);
                if (head.Count == 1)
                {
                    if (string.Equals(head[0], "evenodd", StringComparison.OrdinalIgnoreCase)) evenOdd = true;
                    else if (!string.Equals(head[0], "nonzero", StringComparison.OrdinalIgnoreCase)) return false;
                    first = 1;
                }

                var count = args.Length - first;
                if (count < 3) return false;

                // Anything past the cap is dropped rather than refused: a shape missing its last few
                // vertices is closer to what was asked for than no clip at all.
                count = Mathf.Min(count, MaxPolygonPoints);

                var values = new List<object>(count);
                var converters = new List<StyleConverterBase>(count);

                for (int i = 0; i < count; i++)
                {
                    var pair = ParserHelpers.SplitWhitespace(args[first + i]);
                    if (pair.Count != 2) return false;
                    values.Add(args[first + i]);
                    converters.Add(PositionConverter);
                }

                return ComputedCompound.Create(out result, values, converters, resolved => {
                    var points = new YogaValue2[resolved.Count];
                    for (int i = 0; i < resolved.Count; i++)
                    {
                        if (!(resolved[i] is YogaValue2 p)) return null;
                        points[i] = p;
                    }
                    return new ClipPath(points, evenOdd);
                });
            }
        }

        #region Equality

        public override bool Equals(object obj)
        {
            if (!(obj is ClipPath other) || other.Kind != Kind) return false;

            switch (Kind)
            {
                case ClipPathKind.None:
                    return true;

                case ClipPathKind.Inset:
                    return Top == other.Top && Right == other.Right && Bottom == other.Bottom && Left == other.Left &&
                           TopLeftRadius == other.TopLeftRadius && TopRightRadius == other.TopRightRadius &&
                           BottomRightRadius == other.BottomRightRadius && BottomLeftRadius == other.BottomLeftRadius;

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    return RadiusX == other.RadiusX && RadiusY == other.RadiusY &&
                           ExtentX == other.ExtentX && ExtentY == other.ExtentY && Position == other.Position;

                default:
                {
                    if (EvenOdd != other.EvenOdd || Points.Length != other.Points.Length) return false;
                    for (int i = 0; i < Points.Length; i++)
                        if (Points[i] != other.Points[i]) return false;
                    return true;
                }
            }
        }

        public override int GetHashCode()
        {
            switch (Kind)
            {
                case ClipPathKind.None:
                    return (int) Kind;

                case ClipPathKind.Inset:
                    return HashCode.Combine((int) Kind, Top, Right, Bottom, Left,
                        TopLeftRadius, TopRightRadius, BottomRightRadius);

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    return HashCode.Combine((int) Kind, RadiusX, RadiusY, (int) ExtentX, (int) ExtentY, Position);

                default:
                {
                    var hash = HashCode.Combine((int) Kind, EvenOdd, Points.Length);
                    for (int i = 0; i < Points.Length; i++) hash = HashCode.Combine(hash, Points[i]);
                    return hash;
                }
            }
        }

        #endregion
    }
}
