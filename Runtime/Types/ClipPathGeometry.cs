using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Types
{
    /// <summary>
    /// Turns a <see cref="ClipPathCommand"/> list into closed polylines, and those into a coverage
    /// mask. Both halves are pure geometry, so they run the same for hit testing as for drawing --
    /// which is the property that keeps a pointer and a pixel agreeing about where the shape is.
    /// </summary>
    public static class ClipPathGeometry
    {
        /// <summary>
        /// How far a flattened curve may sit from the real one, in the box's own points. A quarter
        /// point is under half a device pixel at any scale a UI is read at, and the number feeds a
        /// segment count rather than a subdivision test, so a wider curve gets more segments.
        /// </summary>
        public const float Tolerance = 0.25f;

        /// <summary>
        /// The total a flattened value may reach, across every contour. Path data comes out of
        /// design tools, so this is a ceiling on the pathological rather than a design budget: at
        /// the tolerance above, a shape the size of a screen is a few hundred points.
        /// </summary>
        public const int MaxPoints = 4096;

        /// <summary>Vertical samples per texel row the mask is rasterized with. Coverage across a
        /// row is exact, so this only quantises how a near-horizontal edge lands.</summary>
        const int Subsamples = 4;

        const int MaxSegmentsPerCurve = 64;
        const int MaxSegmentsPerArc = 128;

        /// <summary>
        /// The commands as closed rings in the box's own points, y up from its bottom edge -- the
        /// space every other resolved shape is in.
        /// </summary>
        /// <remarks>
        /// Flattening itself runs in CSS's coordinates, y down from the box's top-left, because that
        /// is what both grammars are written in and what an arc's sweep direction is defined
        /// against; the flip to y-up happens as each contour is emitted. Mirroring reverses every
        /// contour's orientation at once, which leaves a `nonzero` fill rule saying the same thing.
        /// </remarks>
        public static Vector2[][] Flatten(IList<ClipPathCommand> commands, Rect box)
        {
            if (commands == null || commands.Count == 0) return null;

            var size = box.size;
            var contours = new List<Vector2[]>();
            var points = new List<Vector2>();

            var current = Vector2.zero;
            var start = Vector2.zero;
            var lastCubicControl = Vector2.zero;
            var lastQuadControl = Vector2.zero;
            var afterCubic = false;
            var afterQuad = false;
            var total = 0;

            for (int i = 0; i < commands.Count; i++)
            {
                var command = commands[i];
                var relative = command.Relative;
                var isCubic = false;
                var isQuad = false;

                switch (command.Kind)
                {
                    case ClipPathCommandKind.Move:
                        total += Emit(contours, points, box);
                        current = Resolve(command.To, size, current, relative);
                        start = current;
                        points.Add(current);
                        break;

                    case ClipPathCommandKind.Line:
                        current = Resolve(command.To, size, current, relative);
                        Open(points, ref start, current);
                        points.Add(current);
                        break;

                    case ClipPathCommandKind.HLine:
                    {
                        var x = command.To.X.GetPointValue(size.x, 0);
                        current = new Vector2(relative ? current.x + x : x, current.y);
                        Open(points, ref start, current);
                        points.Add(current);
                        break;
                    }

                    case ClipPathCommandKind.VLine:
                    {
                        var y = command.To.Y.GetPointValue(size.y, 0);
                        current = new Vector2(current.x, relative ? current.y + y : y);
                        Open(points, ref start, current);
                        points.Add(current);
                        break;
                    }

                    case ClipPathCommandKind.Cubic:
                    case ClipPathCommandKind.SmoothCubic:
                    {
                        var to = Resolve(command.To, size, current, relative);
                        var c2 = Resolve(command.Control2, size, current, relative);

                        // A smooth curve's first control point is the mirror of the one before it,
                        // which is what makes the join smooth. With no curve to mirror there is no
                        // curvature to carry over, and CSS falls back to the current point.
                        var c1 = command.Kind == ClipPathCommandKind.Cubic
                            ? Resolve(command.Control1, size, current, relative)
                            : afterCubic ? 2f * current - lastCubicControl : current;

                        Open(points, ref start, current);
                        AddCubic(points, current, c1, c2, to);
                        current = to;
                        lastCubicControl = c2;
                        isCubic = true;
                        break;
                    }

                    case ClipPathCommandKind.Quadratic:
                    case ClipPathCommandKind.SmoothQuadratic:
                    {
                        var to = Resolve(command.To, size, current, relative);
                        var q = command.Kind == ClipPathCommandKind.Quadratic
                            ? Resolve(command.Control1, size, current, relative)
                            : afterQuad ? 2f * current - lastQuadControl : current;

                        Open(points, ref start, current);
                        // Every quadratic is a cubic with its controls two thirds of the way out,
                        // so one flattener covers both exactly.
                        AddCubic(points, current, current + 2f / 3f * (q - current), to + 2f / 3f * (q - to), to);
                        current = to;
                        lastQuadControl = q;
                        // Not a cubic for the purpose of the next command: a smooth *cubic* after a
                        // quadratic has no cubic control point to mirror, so CSS and SVG both send
                        // it back to the current point.
                        isQuad = true;
                        break;
                    }

                    case ClipPathCommandKind.Arc:
                    {
                        var to = Resolve(command.To, size, current, relative);
                        var rx = command.Radius.X.GetPointValue(size.x, 0);
                        var ry = command.Radius.Y.GetPointValue(size.y, 0);

                        Open(points, ref start, current);
                        AddArc(points, current, to, rx, ry, command.Angle, command.LargeArc, command.Clockwise);
                        current = to;
                        break;
                    }

                    case ClipPathCommandKind.Close:
                        total += Emit(contours, points, box);
                        // A command after a close carries on from where the subpath began, not from
                        // where it ended -- so `Z L 10 10` draws from the start point.
                        current = start;
                        break;
                }

                afterCubic = isCubic;
                afterQuad = isQuad;

                if (total + points.Count > MaxPoints) break;
            }

            Emit(contours, points, box);

            return contours.Count > 0 ? contours.ToArray() : null;
        }

        /// <summary>A drawing command with no subpath open starts one where it stands, which is what
        /// SVG does with path data that draws before it moves.</summary>
        static void Open(List<Vector2> points, ref Vector2 start, Vector2 current)
        {
            if (points.Count > 0) return;
            start = current;
            points.Add(current);
        }

        /// <summary>
        /// Closes the run of points into a ring and flips it into the box's y-up coordinates. An
        /// unclosed subpath is filled as though it were closed, exactly as SVG fills one, so the
        /// ring is completed here whether or not the value said `close`.
        /// </summary>
        static int Emit(List<Vector2[]> contours, List<Vector2> points, Rect box)
        {
            var added = 0;

            if (points.Count >= 3)
            {
                var ring = new Vector2[points.Count + 1];
                for (int i = 0; i < points.Count; i++)
                    ring[i] = new Vector2(box.xMin + points[i].x, box.yMax - points[i].y);
                ring[points.Count] = ring[0];
                contours.Add(ring);
                added = ring.Length;
            }

            points.Clear();
            return added;
        }

        static Vector2 Resolve(YogaValue2 value, Vector2 size, Vector2 current, bool relative)
        {
            var point = new Vector2(value.X.GetPointValue(size.x, 0), value.Y.GetPointValue(size.y, 0));
            return relative ? current + point : point;
        }

        /// <summary>
        /// Segments from the control polygon's length rather than by recursive subdivision: the
        /// count is then known before any point is produced, which is what lets
        /// <see cref="MaxPoints"/> be a real bound.
        /// </summary>
        static void AddCubic(List<Vector2> points, Vector2 p0, Vector2 c1, Vector2 c2, Vector2 p1)
        {
            var length = (c1 - p0).magnitude + (c2 - c1).magnitude + (p1 - c2).magnitude;
            var count = Mathf.Clamp(Mathf.CeilToInt(Mathf.Sqrt(length / Tolerance)), 1, MaxSegmentsPerCurve);

            for (int i = 1; i <= count; i++)
            {
                var t = (float) i / count;
                var u = 1f - t;
                points.Add(u * u * u * p0 + 3f * u * u * t * c1 + 3f * u * t * t * c2 + t * t * t * p1);
            }
        }

        /// <summary>
        /// An elliptical arc, from SVG's endpoint parameterisation (F.6.5) to its centre and then
        /// sampled. CSS's `arc` command carries the same five parameters under different names --
        /// `large`/`small` for the arc-size flag and `cw`/`ccw` for the sweep.
        /// </summary>
        static void AddArc(List<Vector2> points, Vector2 p0, Vector2 p1, float rx, float ry, float angle, bool largeArc, bool clockwise)
        {
            rx = Mathf.Abs(rx);
            ry = Mathf.Abs(ry);

            // Either radius at zero is a straight line, and so are coincident endpoints -- an arc
            // between a point and itself is nothing at all rather than a full turn.
            if (rx < 1e-4f || ry < 1e-4f || (p1 - p0).sqrMagnitude < 1e-8f)
            {
                points.Add(p1);
                return;
            }

            var phi = angle * Mathf.Deg2Rad;
            var cos = Mathf.Cos(phi);
            var sin = Mathf.Sin(phi);

            var half = (p0 - p1) * 0.5f;
            var x1 = cos * half.x + sin * half.y;
            var y1 = -sin * half.x + cos * half.y;

            // Radii too small to reach between the endpoints are scaled up until they just do.
            var lambda = x1 * x1 / (rx * rx) + y1 * y1 / (ry * ry);
            if (lambda > 1f)
            {
                var s = Mathf.Sqrt(lambda);
                rx *= s;
                ry *= s;
            }

            var denominator = rx * rx * y1 * y1 + ry * ry * x1 * x1;
            var numerator = rx * rx * ry * ry - denominator;
            var factor = Mathf.Sqrt(Mathf.Max(numerator / Mathf.Max(denominator, 1e-12f), 0f));
            // Which of the two centres: the flags together pick one of the four arcs on offer.
            if (largeArc == clockwise) factor = -factor;

            var cx1 = factor * rx * y1 / ry;
            var cy1 = -factor * ry * x1 / rx;

            var mid = (p0 + p1) * 0.5f;
            var centre = new Vector2(cos * cx1 - sin * cy1 + mid.x, sin * cx1 + cos * cy1 + mid.y);

            var theta1 = Mathf.Atan2((y1 - cy1) / ry, (x1 - cx1) / rx);
            var theta2 = Mathf.Atan2((-y1 - cy1) / ry, (-x1 - cx1) / rx);
            var delta = theta2 - theta1;

            if (clockwise && delta < 0f) delta += 2f * Mathf.PI;
            else if (!clockwise && delta > 0f) delta -= 2f * Mathf.PI;

            // The sagitta of one step is r(1 - cos(a/2)) ~ r*a^2/8, so the step that stays inside
            // the tolerance grows as the arc's radius shrinks.
            var radius = Mathf.Max(rx, ry);
            var step = Mathf.Sqrt(8f * Tolerance / Mathf.Max(radius, Tolerance));
            var count = Mathf.Clamp(Mathf.CeilToInt(Mathf.Abs(delta) / Mathf.Max(step, 1e-3f)), 1, MaxSegmentsPerArc);

            for (int i = 1; i <= count; i++)
            {
                var t = theta1 + delta * i / count;
                var ct = Mathf.Cos(t);
                var st = Mathf.Sin(t);
                points.Add(new Vector2(
                    cos * rx * ct - sin * ry * st + centre.x,
                    sin * rx * ct + cos * ry * st + centre.y));
            }
        }

        /// <summary>Whether a point is inside the contours under the given fill rule. The crossings
        /// of a ray running +x from the point decide it, counted plainly for `evenodd` and with each
        /// edge's direction for `nonzero`.</summary>
        public static bool Contains(Vector2[][] contours, bool evenOdd, Vector2 point)
        {
            if (contours == null) return false;

            var winding = 0;
            var crossings = 0;

            for (int c = 0; c < contours.Length; c++)
            {
                var ring = contours[c];
                if (ring == null) continue;

                for (int i = 0; i < ring.Length - 1; i++)
                {
                    var a = ring[i];
                    var b = ring[i + 1];

                    if ((a.y <= point.y && b.y > point.y) || (b.y <= point.y && a.y > point.y))
                    {
                        var t = (point.y - a.y) / (b.y - a.y);
                        if (a.x + t * (b.x - a.x) > point.x)
                        {
                            crossings++;
                            winding += b.y > a.y ? 1 : -1;
                        }
                    }
                }
            }

            return evenOdd ? (crossings % 2) != 0 : winding != 0;
        }

        /// <summary>The number of points across every contour, which is what decides whether a shape
        /// fits in the shader's uniform ring or has to be rasterized.</summary>
        public static int CountPoints(Vector2[][] contours)
        {
            if (contours == null) return 0;

            var total = 0;
            for (int i = 0; i < contours.Length; i++) total += contours[i]?.Length ?? 0;
            return total;
        }

        struct Edge
        {
            public float X0, Y0, X1, Y1;
            public int Direction;
        }

        struct Crossing
        {
            public float X;
            public int Direction;
        }

        /// <summary>
        /// An antialiased coverage mask of the contours, one byte per texel, row 0 at the bottom --
        /// which is where a Unity texture's v axis starts, so the result uploads without a flip.
        /// </summary>
        /// <param name="scale">Texels per point, per axis.</param>
        /// <param name="offset">How far past the box's own origin the mask's origin sits, in points.
        /// This is the filter region the capture reaches beyond the element.</param>
        public static byte[] Rasterize(Vector2[][] contours, bool evenOdd, int width, int height, Vector2 scale, Vector2 offset)
        {
            var result = new byte[Mathf.Max(width, 0) * Mathf.Max(height, 0)];
            if (contours == null || width <= 0 || height <= 0) return result;

            var edges = new List<Edge>();

            for (int c = 0; c < contours.Length; c++)
            {
                var ring = contours[c];
                if (ring == null) continue;

                for (int i = 0; i < ring.Length - 1; i++)
                {
                    var a = new Vector2((ring[i].x + offset.x) * scale.x, (ring[i].y + offset.y) * scale.y);
                    var b = new Vector2((ring[i + 1].x + offset.x) * scale.x, (ring[i + 1].y + offset.y) * scale.y);

                    // A horizontal edge is crossed by no scanline, so it contributes nothing but a
                    // division by zero.
                    if (a.y == b.y) continue;

                    // Normalised upwards, with the original direction kept for the winding count.
                    edges.Add(a.y < b.y
                        ? new Edge { X0 = a.x, Y0 = a.y, X1 = b.x, Y1 = b.y, Direction = 1 }
                        : new Edge { X0 = b.x, Y0 = b.y, X1 = a.x, Y1 = a.y, Direction = -1 });
                }
            }

            if (edges.Count == 0) return result;

            edges.Sort((l, r) => l.Y0.CompareTo(r.Y0));

            // An active edge table, so a tall shape's cost follows the edges each row actually
            // crosses rather than every edge in the value.
            var active = new List<int>();
            var next = 0;
            var crossings = new List<Crossing>();
            var row = new float[width];
            var weight = 1f / Subsamples;

            for (int j = 0; j < height; j++)
            {
                while (next < edges.Count && edges[next].Y0 < j + 1f) active.Add(next++);
                for (int k = active.Count - 1; k >= 0; k--)
                    if (edges[active[k]].Y1 <= j) active.RemoveAt(k);

                if (active.Count == 0) continue;

                Array.Clear(row, 0, width);

                for (int s = 0; s < Subsamples; s++)
                {
                    var y = j + (s + 0.5f) / Subsamples;

                    crossings.Clear();
                    for (int k = 0; k < active.Count; k++)
                    {
                        var e = edges[active[k]];
                        // Half-open in y, so a vertex two edges share is crossed once.
                        if (y < e.Y0 || y >= e.Y1) continue;

                        var t = (y - e.Y0) / (e.Y1 - e.Y0);
                        Insert(crossings, new Crossing { X = e.X0 + t * (e.X1 - e.X0), Direction = e.Direction });
                    }

                    var winding = 0;
                    var count = 0;
                    var spanStart = 0f;

                    for (int k = 0; k < crossings.Count; k++)
                    {
                        var wasInside = evenOdd ? (count % 2) != 0 : winding != 0;

                        winding += crossings[k].Direction;
                        count++;

                        var isInside = evenOdd ? (count % 2) != 0 : winding != 0;

                        if (!wasInside && isInside) spanStart = crossings[k].X;
                        else if (wasInside && !isInside) AddSpan(row, spanStart, crossings[k].X, weight);
                    }
                }

                var offsetRow = j * width;
                for (int i = 0; i < width; i++)
                    result[offsetRow + i] = (byte) Mathf.Clamp(Mathf.RoundToInt(row[i] * 255f), 0, 255);
            }

            return result;
        }

        /// <summary>Insertion into an already sorted list. A scanline crosses a handful of edges, so
        /// this beats sorting -- and allocates no comparer per row.</summary>
        static void Insert(List<Crossing> crossings, Crossing crossing)
        {
            var i = crossings.Count - 1;
            crossings.Add(crossing);

            while (i >= 0 && crossings[i].X > crossing.X)
            {
                crossings[i + 1] = crossings[i];
                i--;
            }

            crossings[i + 1] = crossing;
        }

        /// <summary>Adds a horizontal span's coverage, exact at both ends -- which is what carries
        /// the antialiasing along a near-vertical edge, where subsampling in y says nothing.</summary>
        static void AddSpan(float[] row, float x0, float x1, float weight)
        {
            var width = row.Length;
            x0 = Mathf.Clamp(x0, 0f, width);
            x1 = Mathf.Clamp(x1, 0f, width);
            if (x1 <= x0) return;

            var first = Mathf.Min((int) x0, width - 1);
            var last = Mathf.Min((int) x1, width - 1);

            if (first == last)
            {
                row[first] += (x1 - x0) * weight;
                return;
            }

            row[first] += (first + 1 - x0) * weight;
            for (int i = first + 1; i < last; i++) row[i] += weight;
            row[last] += (x1 - last) * weight;
        }
    }
}
