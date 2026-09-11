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
        Rect = 5,
        Xywh = 6,
        Path = 7,
        Shape = 8,
    }

    /// <summary>Where a circle's or an ellipse's radius comes from, when it is a keyword and not a length.</summary>
    public enum ClipRadiusExtent
    {
        Length = 0,
        ClosestSide = 1,
        FarthestSide = 2,
    }

    /// <summary>
    /// The box a shape is measured against, and clips to when it is the whole value. CSS's SVG-only
    /// boxes are resolved to one of these at parse time, the way they resolve on any element with no
    /// SVG geometry of its own: `fill-box` to the content box, `stroke-box` and `view-box` to the
    /// border box.
    /// </summary>
    public enum ClipGeometryBox
    {
        BorderBox = 0,
        PaddingBox = 1,
        ContentBox = 2,
        MarginBox = 3,
    }

    /// <summary>
    /// The geometry a shape came out as once resolved. Several CSS shapes share one form -- an
    /// <c>inset()</c>, a <c>rect()</c> and an <c>xywh()</c> are all a rounded box -- so this, and
    /// not <see cref="ClipPathKind"/>, is what the shader and the hit test switch on.
    /// </summary>
    public enum ClipShapeForm
    {
        None = 0,
        RoundedBox = 1,
        Ellipse = 2,
        Contours = 3,
    }

    /// <summary>
    /// https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path -- the basic shapes, a geometry
    /// box, or both: <c>inset()</c>, <c>rect()</c>, <c>xywh()</c>, <c>circle()</c>,
    /// <c>ellipse()</c>, <c>polygon()</c>, <c>path()</c> and <c>shape()</c>.
    /// </summary>
    /// <remarks>
    /// Values are kept as written and resolved against the element's box by <see cref="Resolve"/>,
    /// which both the shader uniforms and hit testing go through -- so a percentage or a calc()
    /// follows the element as it resizes.
    /// </remarks>
    [Serializable]
    public partial class ClipPath : Interpolatable
    {
        public static readonly ClipPath None = new ClipPath();

        /// <summary>
        /// How many points a shape may carry as shader uniforms. The shader walks the ring with a
        /// constant-bound loop so its uniform-array indices stay compile-time constants, which is
        /// what keeps the walk inside a fragment shader's register budget. A shape with more than
        /// this -- any flattened curve, in practice -- is rasterized to a coverage mask instead.
        /// </summary>
        public const int MaxUniformPoints = 16;

        public ClipPathKind Kind { get; }

        /// <summary>The box the shape is measured against, and the shape itself when there is no
        /// shape function.</summary>
        public ClipGeometryBox Box { get; }

        /// <summary>
        /// The four edge values, whose meaning is the shape's: <c>inset()</c> measures each in from
        /// its own edge of the box, <c>rect()</c> gives each edge's position from the top-left
        /// corner, and <c>xywh()</c> puts x, y, width and height in <see cref="X"/>,
        /// <see cref="Y"/>, <see cref="Width"/> and <see cref="Height"/>.
        /// </summary>
        public YogaValue Top { get; } = YogaValue.Point(0);
        public YogaValue Right { get; } = YogaValue.Point(0);
        public YogaValue Bottom { get; } = YogaValue.Point(0);
        public YogaValue Left { get; } = YogaValue.Point(0);

        /// <summary>xywh(): the rectangle's offset from the reference box's top-left corner.</summary>
        public YogaValue X => Left;
        public YogaValue Y => Top;

        /// <summary>xywh(): the rectangle's size.</summary>
        public YogaValue Width => Right;
        public YogaValue Height => Bottom;

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

        /// <summary>path() and shape(), which differ only in how they are written.</summary>
        public ClipPathCommand[] Commands { get; } = new ClipPathCommand[0];

        /// <summary>`evenodd`. CSS defaults to `nonzero`, and the two differ only where a shape's
        /// outline crosses itself or encloses a second contour.</summary>
        public bool EvenOdd { get; }

        public ClipPath()
        {
            Kind = ClipPathKind.None;
        }

        public static ClipPath Inset(YogaValue top, YogaValue right, YogaValue bottom, YogaValue left,
            YogaValue2 tl = default, YogaValue2 tr = default, YogaValue2 br = default, YogaValue2 bl = default)
            => new ClipPath(ClipPathKind.Inset, top, right, bottom, left, tl, tr, br, bl);

        /// <summary>rect(): the four edges, each measured from the box's top-left corner, or `auto`
        /// for the box's own edge.</summary>
        public static ClipPath RectShape(YogaValue top, YogaValue right, YogaValue bottom, YogaValue left,
            YogaValue2 tl = default, YogaValue2 tr = default, YogaValue2 br = default, YogaValue2 bl = default)
            => new ClipPath(ClipPathKind.Rect, top, right, bottom, left, tl, tr, br, bl);

        /// <summary>xywh(): a corner and a size, which is the same rectangle written the way a
        /// layout tool exports one.</summary>
        public static ClipPath Xywh(YogaValue x, YogaValue y, YogaValue width, YogaValue height,
            YogaValue2 tl = default, YogaValue2 tr = default, YogaValue2 br = default, YogaValue2 bl = default)
            => new ClipPath(ClipPathKind.Xywh, y, width, height, x, tl, tr, br, bl);

        private ClipPath(ClipPathKind kind, YogaValue top, YogaValue right, YogaValue bottom, YogaValue left,
            YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            Kind = kind;
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

        public ClipPath(ClipPathKind kind, ClipPathCommand[] commands, bool evenOdd)
        {
            Kind = kind;
            Commands = commands ?? new ClipPathCommand[0];
            EvenOdd = evenOdd;
        }

        /// <summary>The same shape against another box. Every value here is immutable, so this
        /// copies rather than mutating -- and returns the original when there is nothing to change.</summary>
        public ClipPath WithBox(ClipGeometryBox box) => box == Box ? this : new ClipPath(this, box);

        private ClipPath(ClipPath source, ClipGeometryBox box)
        {
            Kind = source.Kind;
            Box = box;
            Top = source.Top;
            Right = source.Right;
            Bottom = source.Bottom;
            Left = source.Left;
            TopLeftRadius = source.TopLeftRadius;
            TopRightRadius = source.TopRightRadius;
            BottomRightRadius = source.BottomRightRadius;
            BottomLeftRadius = source.BottomLeftRadius;
            Position = source.Position;
            RadiusX = source.RadiusX;
            RadiusY = source.RadiusY;
            ExtentX = source.ExtentX;
            ExtentY = source.ExtentY;
            Points = source.Points;
            Commands = source.Commands;
            EvenOdd = source.EvenOdd;
        }

        /// <summary>A shape resolved against a box, in the border box's own points with y growing upwards.</summary>
        public struct Resolved
        {
            public ClipShapeForm Form;

            /// <summary>A rounded box: the rectangle that survives.</summary>
            public Rect Box;
            /// <summary>Corner radii, top-left first and clockwise, already clamped to fit the box.</summary>
            public Vector4 RadiiX;
            public Vector4 RadiiY;

            /// <summary>circle() and ellipse().</summary>
            public Vector2 Center;
            public Vector2 Radius;

            /// <summary>polygon(), path() and shape(): closed rings, each repeating its first point
            /// at the end. More than one only comes out of a path with several subpaths.</summary>
            public Vector2[][] Contours;
            public bool EvenOdd;

            /// <summary>The single ring, when there is exactly one -- which a polygon always is.</summary>
            public Vector2[] Ring => Contours != null && Contours.Length == 1 ? Contours[0] : null;
        }

        // Resolving a path flattens its curves, and hit testing resolves once per pointer event, so
        // the last answer is kept. The value is immutable, so only the box can have changed.
        private Rect cachedBox;
        private Resolved cached;
        private bool hasCache;

        /// <summary>Against the border box, which is where every shape with no geometry box of its
        /// own is measured.</summary>
        public Resolved Resolve(Vector2 size) => Resolve(new Rect(0, 0, size.x, size.y));

        /// <summary>
        /// The shape in the border box's coordinates, y up from its bottom edge -- the space the
        /// composite's fragment shader works in, and the one RectTransform.rect reports hits in.
        /// </summary>
        /// <param name="referenceBox">The box the shape is measured against, itself in those
        /// coordinates: the border box is (0, 0, width, height), and a padding or content box sits
        /// inside it.</param>
        public Resolved Resolve(Rect referenceBox)
        {
            if (hasCache && cachedBox == referenceBox) return cached;

            var result = ResolveInternal(referenceBox);

            cachedBox = referenceBox;
            cached = result;
            hasCache = true;

            return result;
        }

        private Resolved ResolveInternal(Rect referenceBox)
        {
            var result = new Resolved { EvenOdd = EvenOdd };
            var size = referenceBox.size;

            switch (Kind)
            {
                case ClipPathKind.Inset:
                {
                    // CSS measures `top` from the top edge, where y grows the other way here.
                    var minX = referenceBox.xMin + Left.GetPointValue(size.x, 0);
                    var maxX = referenceBox.xMax - Right.GetPointValue(size.x, 0);
                    var minY = referenceBox.yMin + Bottom.GetPointValue(size.y, 0);
                    var maxY = referenceBox.yMax - Top.GetPointValue(size.y, 0);

                    result.Form = ClipShapeForm.RoundedBox;
                    result.Box = Rect.MinMaxRect(minX, minY, Mathf.Max(minX, maxX), Mathf.Max(minY, maxY));
                    ResolveRadii(result.Box.size, out result.RadiiX, out result.RadiiY);
                    break;
                }

                case ClipPathKind.Rect:
                {
                    // Each value is an edge's position rather than a distance in, and `auto` is the
                    // box's own edge -- so rect(auto) is the whole box.
                    var left = Edge(Left, size.x, 0);
                    var right = Edge(Right, size.x, size.x);
                    var top = Edge(Top, size.y, 0);
                    var bottom = Edge(Bottom, size.y, size.y);

                    var minX = referenceBox.xMin + left;
                    var maxX = referenceBox.xMin + Mathf.Max(left, right);
                    var maxY = referenceBox.yMax - top;
                    var minY = Mathf.Min(maxY, referenceBox.yMax - bottom);

                    result.Form = ClipShapeForm.RoundedBox;
                    result.Box = Rect.MinMaxRect(minX, minY, maxX, maxY);
                    ResolveRadii(result.Box.size, out result.RadiiX, out result.RadiiY);
                    break;
                }

                case ClipPathKind.Xywh:
                {
                    var x = X.GetPointValue(size.x, 0);
                    var y = Y.GetPointValue(size.y, 0);
                    var w = Mathf.Max(Width.GetPointValue(size.x, 0), 0);
                    var h = Mathf.Max(Height.GetPointValue(size.y, 0), 0);

                    result.Form = ClipShapeForm.RoundedBox;
                    result.Box = new Rect(referenceBox.xMin + x, referenceBox.yMax - y - h, w, h);
                    ResolveRadii(result.Box.size, out result.RadiiX, out result.RadiiY);
                    break;
                }

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                {
                    var pos = Position.GetPointValue(size, 0f, true);

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

                    result.Form = ClipShapeForm.Ellipse;
                    result.Center = referenceBox.min + pos;
                    result.Radius = new Vector2(Mathf.Max(rx, 0), Mathf.Max(ry, 0));
                    break;
                }

                case ClipPathKind.Polygon:
                {
                    var count = Mathf.Min(Points.Length, ClipPathGeometry.MaxPoints);
                    if (count < 3) break;

                    var ring = new Vector2[count + 1];
                    for (int i = 0; i < count; i++) ring[i] = referenceBox.min + Points[i].GetPointValue(size, 0f, true);
                    ring[count] = ring[0];

                    result.Form = ClipShapeForm.Contours;
                    result.Contours = new[] { ring };
                    break;
                }

                case ClipPathKind.Path:
                case ClipPathKind.Shape:
                {
                    var contours = ClipPathGeometry.Flatten(Commands, referenceBox);
                    if (contours == null) break;

                    result.Form = ClipShapeForm.Contours;
                    result.Contours = contours;
                    break;
                }
            }

            return result;
        }

        /// <summary>An edge position, where `auto` is the box's own edge rather than a length.</summary>
        private static float Edge(YogaValue value, float full, float auto)
            => value.Unit == YogaUnit.Auto ? auto : value.GetPointValue(full, 0);

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

        /// <summary>Whether the shape is a command list, which is what <c>path()</c> and
        /// <c>shape()</c> both are once parsed.</summary>
        public static bool IsCommandShape(ClipPathKind kind) => kind == ClipPathKind.Path || kind == ClipPathKind.Shape;

        /// <summary>Whether the shape is a rectangle, which <c>inset()</c>, <c>rect()</c> and
        /// <c>xywh()</c> all are -- written three ways, and each interpolating only with itself.</summary>
        public static bool IsRectangleShape(ClipPathKind kind) =>
            kind == ClipPathKind.Inset || kind == ClipPathKind.Rect || kind == ClipPathKind.Xywh;

        /// <summary>Interpolater has no pair overload for this; the struct interpolates itself.</summary>
        private static YogaValue2 Lerp(YogaValue2 from, YogaValue2 to, float t) => (YogaValue2) from.Interpolate(to, t);

        public object Interpolate(object to, float t)
        {
            var tto = to as ClipPath;
            if (tto == null) return t > 0.5f ? to : this;

            // Only shapes of one kind have anything to interpolate between; CSS makes the rest
            // discrete, and so is a polygon whose point count changed. A reference box is not a
            // length either, so a change of box is discrete too.
            if (tto.Kind != Kind || tto.Box != Box) return t > 0.5f ? tto : (object) this;

            switch (Kind)
            {
                case ClipPathKind.Inset:
                case ClipPathKind.Rect:
                case ClipPathKind.Xywh:
                    return new ClipPath(Kind,
                        Interpolater.Interpolate(Top, tto.Top, t),
                        Interpolater.Interpolate(Right, tto.Right, t),
                        Interpolater.Interpolate(Bottom, tto.Bottom, t),
                        Interpolater.Interpolate(Left, tto.Left, t),
                        Lerp(TopLeftRadius, tto.TopLeftRadius, t),
                        Lerp(TopRightRadius, tto.TopRightRadius, t),
                        Lerp(BottomRightRadius, tto.BottomRightRadius, t),
                        Lerp(BottomLeftRadius, tto.BottomLeftRadius, t)).WithBox(Box);

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    // An extent keyword is not a length, so it cannot meet one halfway.
                    if (ExtentX != tto.ExtentX || ExtentY != tto.ExtentY) return t > 0.5f ? tto : (object) this;
                    return new ClipPath(Kind,
                        Interpolater.Interpolate(RadiusX, tto.RadiusX, t),
                        Interpolater.Interpolate(RadiusY, tto.RadiusY, t),
                        ExtentX, ExtentY,
                        Lerp(Position, tto.Position, t)).WithBox(Box);

                case ClipPathKind.Polygon:
                {
                    if (Points.Length != tto.Points.Length || EvenOdd != tto.EvenOdd) return t > 0.5f ? tto : (object) this;
                    var points = new YogaValue2[Points.Length];
                    for (int i = 0; i < points.Length; i++) points[i] = Lerp(Points[i], tto.Points[i], t);
                    return new ClipPath(points, EvenOdd).WithBox(Box);
                }

                case ClipPathKind.Path:
                case ClipPathKind.Shape:
                {
                    // Two command lists meet halfway only if they draw the same shape of outline --
                    // command for command, including whether each is relative. Anything else has no
                    // correspondence between the two, which is where CSS gives up as well.
                    if (EvenOdd != tto.EvenOdd || Commands.Length != tto.Commands.Length) return t > 0.5f ? tto : (object) this;

                    for (int i = 0; i < Commands.Length; i++)
                        if (!Commands[i].Matches(tto.Commands[i])) return t > 0.5f ? tto : (object) this;

                    var commands = new ClipPathCommand[Commands.Length];
                    for (int i = 0; i < commands.Length; i++)
                    {
                        var a = Commands[i];
                        var b = tto.Commands[i];
                        commands[i] = new ClipPathCommand
                        {
                            Kind = a.Kind,
                            Relative = a.Relative,
                            LargeArc = a.LargeArc,
                            Clockwise = a.Clockwise,
                            To = Lerp(a.To, b.To, t),
                            Control1 = Lerp(a.Control1, b.Control1, t),
                            Control2 = Lerp(a.Control2, b.Control2, t),
                            Radius = Lerp(a.Radius, b.Radius, t),
                            Angle = Mathf.LerpUnclamped(a.Angle, b.Angle, t),
                        };
                    }

                    return new ClipPath(Kind, commands, EvenOdd).WithBox(Box);
                }
            }

            return this;
        }

        public partial class Converter : TypedStyleConverterBase<ClipPath>
        {
            private static readonly StyleConverterBase Length = AllConverters.YogaValueConverter;
            private static readonly StyleConverterBase PositionConverter = AllConverters.YogaValue2Converter;
            private static readonly StyleConverterBase RadiusConverter = AllConverters.BorderRadiusConverter;
            private static readonly StyleConverterBase AngleConverter = AllConverters.AngleConverter;

            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                return base.HandleKeyword(keyword, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                result = null;

                var shape = (string) null;
                var box = ClipGeometryBox.BorderBox;
                var hasBox = false;

                var parts = ParserHelpers.SplitFunctionList(value);
                for (int i = 0; i < parts.Count; i++)
                {
                    var trimmed = parts[i]?.Trim();
                    if (string.IsNullOrEmpty(trimmed)) continue;

                    if (TryReadGeometryBox(trimmed, out var read))
                    {
                        if (hasBox) return false;
                        hasBox = true;
                        box = read;
                        continue;
                    }

                    if (shape != null) return false;
                    shape = trimmed;
                }

                // A box on its own is a shape: the box itself. It is the only way to clip to the
                // padding or content box without writing out the edges the element already has.
                if (shape == null)
                {
                    if (!hasBox) return false;
                    var zero = YogaValue.Point(0);
                    return Constant(Inset(zero, zero, zero, zero).WithBox(box), out result);
                }

                var (name, args, ac) = ParserHelpers.ParseFunction(shape);
                if (name == null || args == null) return false;

                switch (name.ToLowerInvariant())
                {
                    case "inset": return ParseRectangle(ac, ClipPathKind.Inset, box, out result);
                    case "rect": return ParseRectangle(ac, ClipPathKind.Rect, box, out result);
                    case "xywh": return ParseRectangle(ac, ClipPathKind.Xywh, box, out result);
                    case "circle": return ParseCircle(ac, false, box, out result);
                    case "ellipse": return ParseCircle(ac, true, box, out result);
                    case "polygon": return ParsePolygon(args, box, out result);
                    case "path": return ParsePath(ac, box, out result);
                    case "shape": return ParseShape(args, box, out result);
                    default: return false;
                }
            }

            private static bool TryReadGeometryBox(string value, out ClipGeometryBox box)
            {
                switch (value.ToLowerInvariant())
                {
                    case "border-box":
                        box = ClipGeometryBox.BorderBox;
                        return true;
                    case "padding-box":
                        box = ClipGeometryBox.PaddingBox;
                        return true;
                    case "content-box":
                        box = ClipGeometryBox.ContentBox;
                        return true;
                    case "margin-box":
                        box = ClipGeometryBox.MarginBox;
                        return true;

                    // The three SVG boxes have nothing to measure on an element that is not SVG, and
                    // CSS resolves each to the box that does: the content box for the fill, and the
                    // border box for a stroke or a viewport neither of which exists here.
                    case "fill-box":
                        box = ClipGeometryBox.ContentBox;
                        return true;
                    case "stroke-box":
                    case "view-box":
                        box = ClipGeometryBox.BorderBox;
                        return true;

                    default:
                        box = ClipGeometryBox.BorderBox;
                        return false;
                }
            }

            /// <summary>
            /// The three ways CSS writes a rectangle. They differ only in what the four numbers mean
            /// and in how many are allowed, so one parser reads all three and the factory each kind
            /// goes through decides the rest.
            /// </summary>
            private static bool ParseRectangle(string args, ClipPathKind kind, ClipGeometryBox box, out IComputedValue result)
            {
                result = null;

                var round = args.IndexOf(" round ", StringComparison.OrdinalIgnoreCase);
                var edgePart = round < 0 ? args : args.Substring(0, round);
                var radiusPart = round < 0 ? null : args.Substring(round + 7);

                var edges = ParserHelpers.SplitWhitespace(edgePart);

                if (kind == ClipPathKind.Inset)
                {
                    if (edges.Count < 1 || edges.Count > 4) return false;

                    // The one-to-four shorthand every box edge list uses.
                    var single = edges[0];
                    edges = new List<string>
                    {
                        single,
                        edges.Count > 1 ? edges[1] : single,
                        edges.Count > 2 ? edges[2] : single,
                        edges.Count > 3 ? edges[3] : edges.Count > 1 ? edges[1] : single,
                    };
                }
                // rect() and xywh() take exactly four: neither an edge position nor a width has an
                // opposite side to borrow from.
                else if (edges.Count != 4) return false;

                // Only rect() has an `auto` edge. A negative xywh() size is clamped where it
                // resolves instead, since a calc() only says whether it is one by then.
                if (kind != ClipPathKind.Rect)
                    for (int i = 0; i < 4; i++)
                        if (string.Equals(edges[i], "auto", StringComparison.OrdinalIgnoreCase)) return false;

                var values = new List<object> { edges[0], edges[1], edges[2], edges[3] };
                var converters = new List<StyleConverterBase> { Length, Length, Length, Length };

                var hasRadii = radiusPart != null;

                if (hasRadii)
                {
                    if (!SplitCornerRadii(radiusPart, out var corners)) return false;
                    values.AddRange(corners);
                    for (int i = 0; i < corners.Count; i++) converters.Add(RadiusConverter);
                }

                return ComputedCompound.Create(out result, values, converters, resolved => {
                    if (!(resolved[0] is YogaValue a) || !(resolved[1] is YogaValue b) ||
                        !(resolved[2] is YogaValue c) || !(resolved[3] is YogaValue d)) return null;

                    var tl = YogaValue2.Zero;
                    var tr = YogaValue2.Zero;
                    var br = YogaValue2.Zero;
                    var bl = YogaValue2.Zero;

                    if (hasRadii)
                    {
                        if (!(resolved[4] is YogaValue2 rtl) || !(resolved[5] is YogaValue2 rtr) ||
                            !(resolved[6] is YogaValue2 rbr) || !(resolved[7] is YogaValue2 rbl)) return null;

                        tl = rtl;
                        tr = rtr;
                        br = rbr;
                        bl = rbl;
                    }

                    switch (kind)
                    {
                        case ClipPathKind.Rect: return RectShape(a, b, c, d, tl, tr, br, bl).WithBox(box);
                        case ClipPathKind.Xywh: return Xywh(a, b, c, d, tl, tr, br, bl).WithBox(box);
                        default: return Inset(a, b, c, d, tl, tr, br, bl).WithBox(box);
                    }
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

            private static bool ParseCircle(string args, bool ellipse, ClipGeometryBox box, out IComputedValue result)
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
                        ? Ellipse(x, y, extentX, extentY, pos).WithBox(box)
                        : Circle(x, extentX, pos).WithBox(box);
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

            private static bool ParsePolygon(string[] args, ClipGeometryBox box, out IComputedValue result)
            {
                result = null;
                if (args.Length == 0) return false;

                var evenOdd = false;
                var first = 0;

                // An optional fill rule sits in the first comma-separated slot, ahead of the points.
                var head = ParserHelpers.SplitWhitespace(args[0]);
                if (head.Count == 1)
                {
                    if (!TryReadFillRule(head[0], ref evenOdd)) return false;
                    first = 1;
                }

                var count = args.Length - first;
                if (count < 3 || count > ClipPathGeometry.MaxPoints) return false;

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
                    return new ClipPath(points, evenOdd).WithBox(box);
                });
            }

            /// <summary>
            /// <c>path()</c>: an optional fill rule and a quoted SVG path string. The data is
            /// numbers in px -- the one thing <c>path()</c> cannot do that <c>shape()</c> can -- so
            /// nothing in it is worth deferring and it is parsed here and now.
            /// </summary>
            private static bool ParsePath(string args, ClipGeometryBox box, out IComputedValue result)
            {
                result = null;

                var text = (args ?? "").Trim();
                if (text.Length == 0) return false;

                var evenOdd = false;

                // The data itself is full of commas, so only a first field that is a fill rule is
                // one -- `path(M0,0 L1,1)` has no fill rule and three commas.
                var comma = text.IndexOf(',');
                if (comma >= 0)
                {
                    var head = text.Substring(0, comma).Trim();
                    if (TryReadFillRule(head, ref evenOdd)) text = text.Substring(comma + 1).Trim();
                }

                if (text.Length >= 2 && (text[0] == '"' || text[0] == '\'') && text[text.Length - 1] == text[0])
                    text = text.Substring(1, text.Length - 2);

                if (!ClipPathCommands.TryParsePathData(text, out var commands)) return false;

                return Constant(new ClipPath(ClipPathKind.Path, commands.ToArray(), evenOdd).WithBox(box), out result);
            }

            private static bool TryReadFillRule(string value, ref bool evenOdd)
            {
                if (string.Equals(value, "evenodd", StringComparison.OrdinalIgnoreCase))
                {
                    evenOdd = true;
                    return true;
                }

                return string.Equals(value, "nonzero", StringComparison.OrdinalIgnoreCase);
            }
        }

        #region Equality

        public override bool Equals(object obj)
        {
            if (!(obj is ClipPath other) || other.Kind != Kind || other.Box != Box) return false;

            switch (Kind)
            {
                case ClipPathKind.None:
                    return true;

                case ClipPathKind.Inset:
                case ClipPathKind.Rect:
                case ClipPathKind.Xywh:
                    return Top == other.Top && Right == other.Right && Bottom == other.Bottom && Left == other.Left &&
                           TopLeftRadius == other.TopLeftRadius && TopRightRadius == other.TopRightRadius &&
                           BottomRightRadius == other.BottomRightRadius && BottomLeftRadius == other.BottomLeftRadius;

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    return RadiusX == other.RadiusX && RadiusY == other.RadiusY &&
                           ExtentX == other.ExtentX && ExtentY == other.ExtentY && Position == other.Position;

                case ClipPathKind.Path:
                case ClipPathKind.Shape:
                {
                    if (EvenOdd != other.EvenOdd || Commands.Length != other.Commands.Length) return false;
                    for (int i = 0; i < Commands.Length; i++)
                        if (!Commands[i].Equals(other.Commands[i])) return false;
                    return true;
                }

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
                case ClipPathKind.Rect:
                case ClipPathKind.Xywh:
                    return HashCode.Combine((int) Kind, (int) Box, Top, Right, Bottom, Left,
                        TopLeftRadius, TopRightRadius);

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    return HashCode.Combine((int) Kind, (int) Box, RadiusX, RadiusY, (int) ExtentX, (int) ExtentY, Position);

                case ClipPathKind.Path:
                case ClipPathKind.Shape:
                {
                    var hash = HashCode.Combine((int) Kind, (int) Box, EvenOdd, Commands.Length);
                    for (int i = 0; i < Commands.Length; i++) hash = HashCode.Combine(hash, Commands[i]);
                    return hash;
                }

                default:
                {
                    var hash = HashCode.Combine((int) Kind, (int) Box, EvenOdd, Points.Length);
                    for (int i = 0; i < Points.Length; i++) hash = HashCode.Combine(hash, Points[i]);
                    return hash;
                }
            }
        }

        #endregion
    }
}
