using System.Collections.Generic;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;
using Yoga;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Cuts an element and its subtree to its <c>clip-path</c> with the stencil, as <c>overflow: hidden</c>
    /// is cut, instead of capturing the subtree offscreen. The edge comes out aliased, so it only takes a
    /// shape the capture would draw the same, or one <c>shape-rendering</c> has allowed to lose its antialiasing.
    /// </summary>
    /// <remarks>
    /// It is the element's own graphic, drawn into the stencil by a <see cref="Mask"/> beside it -- the slot
    /// the overflow mask uses, so <see cref="CanCut"/> sends an element with both to the capture.
    /// </remarks>
    [RequireComponent(typeof(CanvasRenderer))]
    public class ClipPathStencil : MaskableGraphic
    {
        /// <summary>How many points a polygon or a path may have, since checking it is simple is quadratic.</summary>
        const int MaxPoints = 256;

        private UGUIComponent component;
        private ClipPath shape = ClipPath.None;
        private Mask mask;
        // Graphic.Raycast skips a parent graphic that is no raycast target, so the hit test sits beside it.
        private ClipPathRaycastFilter hit;

        static readonly List<Vector2> outline = new List<Vector2>();
        static readonly List<int> triangles = new List<int>();
        static readonly List<int> remaining = new List<int>();

        /// <summary>Whether the stencil draws <paramref name="clip"/> as the capture would, give or take the antialiasing.</summary>
        internal static bool CanCut(UGUIComponent cmp, ClipPath clip)
        {
            var rendering = cmp.ComputedStyle.shapeRendering;
            if (rendering == ShapeRendering.GeometricPrecision) return false;

            // An overflow mask, even a disabled one, already holds the element's one graphic.
            if (cmp.GameObject.TryGetComponent<Graphic>(out var existing) && !(existing is ClipPathStencil)) return false;

            var fast = rendering == ShapeRendering.OptimizeSpeed || rendering == ShapeRendering.CrispEdges;

            switch (clip.Kind)
            {
                // Decided on the value rather than the resolved radii, which a box not laid out yet shrinks to nothing.
                case ClipPathKind.Inset:
                case ClipPathKind.Rect:
                case ClipPathKind.Xywh:
                    return fast || !(Rounds(clip.TopLeftRadius) || Rounds(clip.TopRightRadius) || Rounds(clip.BottomRightRadius) || Rounds(clip.BottomLeftRadius));

                case ClipPathKind.Circle:
                case ClipPathKind.Ellipse:
                    return fast;

                case ClipPathKind.Polygon:
                case ClipPathKind.Path:
                case ClipPathKind.Shape:
                {
                    if (!fast) return false;

                    var rect = cmp.RectTransform.rect;
                    if (rect.width <= 0 || rect.height <= 0) rect = new Rect(0, 0, 100, 100);
                    var ring = clip.Resolve(ElementFilter.ReferenceBox(rect, clip, cmp.Layout)).Ring;
                    return ring != null && ring.Length - 1 <= MaxPoints && LoadRing(ring) && IsSimple(outline) && Triangulate(outline, triangles);
                }

                default:
                    return false;
            }
        }

        static bool Rounds(YogaValue2 radius) => radius.X.Value > 0 || radius.Y.Value > 0;

        /// <summary>Clips <paramref name="cmp"/> to <paramref name="clip"/>, or stops clipping it when that is null.</summary>
        internal static void Set(UGUIComponent cmp, ClipPath clip)
        {
            // Kept on the component: this runs on every restyle, and a failed GetComponent allocates in the editor.
            var current = cmp.ClipStencil;

            if (clip == null)
            {
                // Parked, not destroyed: a pooled element changes role on nearly every remount.
                if (current && current.enabled) current.Park();
                return;
            }

            if (!current)
            {
                current = cmp.ClipStencil = cmp.GameObject.AddComponent<ClipPathStencil>();
                current.raycastTarget = false;
                current.mask = cmp.GameObject.AddComponent<Mask>();
                current.mask.showMaskGraphic = false;
                current.hit = cmp.GameObject.AddComponent<ClipPathRaycastFilter>();
            }
            else if (!current.enabled)
            {
                current.enabled = true;
                if (current.mask) current.mask.enabled = true;
                if (current.hit) current.hit.enabled = true;
            }

            current.component = cmp;
            // Any box but the border box moves with padding and borders, which do not resize the rect.
            if (!ReferenceEquals(current.shape, clip) || clip.Box != ClipGeometryBox.BorderBox)
            {
                current.shape = clip;
                current.SetVerticesDirty();
            }
        }

        /// <summary>
        /// Takes the stencil off <paramref name="cmp"/> for good, for the overflow mask that wants its graphic
        /// slot. The graphic and its mask go together and at once: Mask caches the graphic it found, so it
        /// cannot outlive it, and the overflow mask may want the slot in the same style pass.
        /// </summary>
        internal static void Remove(UGUIComponent cmp)
        {
            var current = cmp.ClipStencil;
            cmp.ClipStencil = null;
            if (!current) return;

            if (current.mask) DestroyImmediate(current.mask);
            if (current.hit) DestroyImmediate(current.hit);
            DestroyImmediate(current);
        }

        void Park()
        {
            // The shape goes too, so the one that comes back is always new and rebuilds the mesh.
            shape = ClipPath.None;
            if (hit)
            {
                hit.Shape = ClipPath.None;
                hit.enabled = false;
            }
            if (mask) mask.enabled = false;
            enabled = false;
        }

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            if (shape == null || shape.Kind == ClipPathKind.None) return;

            var rect = rectTransform.rect;
            var box = ElementFilter.ReferenceBox(rect, shape, component?.Layout);
            var resolved = shape.Resolve(box);

            if (hit)
            {
                hit.Shape = shape;
                hit.BoxSize = rect.size;
                hit.BoxOffset = Vector2.zero;
                hit.ClipBox = box;
            }
            outline.Clear();
            triangles.Clear();

            switch (resolved.Form)
            {
                case ClipShapeForm.RoundedBox:
                    AddRoundedBox(resolved);
                    Fan();
                    break;

                case ClipShapeForm.Ellipse:
                    AddArc(resolved.Center, resolved.Radius, 0, 2 * Mathf.PI, false);
                    Fan();
                    break;

                case ClipShapeForm.Contours:
                    // A resize can have bent a percentage-and-pixel polygon out of shape; a fan is the fallback.
                    if (!LoadRing(resolved.Ring) || !Triangulate(outline, triangles)) Fan();
                    break;
            }

            var origin = rect.min;
            var c = color;
            for (int i = 0; i < outline.Count; i++) vh.AddVert(origin + outline[i], c, Vector4.zero);
            for (int i = 0; i + 2 < triangles.Count; i += 3) vh.AddTriangle(triangles[i], triangles[i + 1], triangles[i + 2]);
        }

        #region Geometry

        static void AddRoundedBox(ClipPath.Resolved r)
        {
            var box = r.Box;
            var half = box.size * 0.5f;

            // Counter-clockwise from the top-right; the radii are in CSS's order, top-left first.
            Corner(new Vector2(box.xMax, box.yMax), r.RadiiX[1], r.RadiiY[1], half, -1, -1, 0);
            Corner(new Vector2(box.xMin, box.yMax), r.RadiiX[0], r.RadiiY[0], half, 1, -1, 0.5f * Mathf.PI);
            Corner(new Vector2(box.xMin, box.yMin), r.RadiiX[3], r.RadiiY[3], half, 1, 1, Mathf.PI);
            Corner(new Vector2(box.xMax, box.yMin), r.RadiiX[2], r.RadiiY[2], half, -1, 1, 1.5f * Mathf.PI);
        }

        static void Corner(Vector2 corner, float rx, float ry, Vector2 half, float sx, float sy, float from)
        {
            rx = Mathf.Min(rx, half.x);
            ry = Mathf.Min(ry, half.y);
            if (rx <= 0 || ry <= 0) outline.Add(corner);
            else AddArc(corner + new Vector2(sx * rx, sy * ry), new Vector2(rx, ry), from, 0.5f * Mathf.PI, true);
        }

        static void AddArc(Vector2 center, Vector2 radius, float from, float sweep, bool closed)
        {
            // As many segments as keep the chord within the flattening tolerance of the curve.
            var r = Mathf.Max(radius.x, radius.y);
            if (r <= 0) return;
            var step = 2 * Mathf.Acos(1 - Mathf.Min(ClipPathGeometry.Tolerance / r, 1));
            var n = Mathf.Clamp(Mathf.CeilToInt(sweep / step), 1, 128);

            var last = closed ? n : n - 1;
            for (int i = 0; i <= last; i++)
            {
                var a = from + sweep * i / n;
                outline.Add(center + new Vector2(Mathf.Cos(a) * radius.x, Mathf.Sin(a) * radius.y));
            }
        }

        static void Fan()
        {
            triangles.Clear();
            for (int i = 1; i + 1 < outline.Count; i++)
            {
                triangles.Add(0);
                triangles.Add(i);
                triangles.Add(i + 1);
            }
        }

        /// <summary>Copies a closed ring into <see cref="outline"/> without its repeated first point.</summary>
        static bool LoadRing(Vector2[] ring)
        {
            outline.Clear();
            if (ring == null) return false;

            var count = ring.Length;
            if (count > 1 && ring[count - 1] == ring[0]) count--;
            for (int i = 0; i < count; i++) outline.Add(ring[i]);
            return count >= 3;
        }

        /// <summary>Whether no two edges of the ring cross, which is when both fill rules agree and ear clipping works.</summary>
        static bool IsSimple(List<Vector2> pts)
        {
            var n = pts.Count;
            for (int i = 0; i < n; i++)
            {
                var a = pts[i];
                var b = pts[(i + 1) % n];
                for (int j = i + 2; j < n; j++)
                {
                    if (i == 0 && j == n - 1) continue;
                    if (Cross(a, b, pts[j], pts[(j + 1) % n])) return false;
                }
            }
            return true;
        }

        static bool Cross(Vector2 a, Vector2 b, Vector2 c, Vector2 d)
        {
            var d1 = Side(c, d, a);
            var d2 = Side(c, d, b);
            var d3 = Side(a, b, c);
            var d4 = Side(a, b, d);
            return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
        }

        static float Side(Vector2 a, Vector2 b, Vector2 p) => (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);

        /// <summary>Ear clipping, for a simple ring of either winding.</summary>
        static bool Triangulate(List<Vector2> pts, List<int> tris)
        {
            tris.Clear();
            var n = pts.Count;
            if (n < 3) return false;

            var area = 0f;
            for (int i = 0; i < n; i++)
            {
                var a = pts[i];
                var b = pts[(i + 1) % n];
                area += a.x * b.y - b.x * a.y;
            }
            if (Mathf.Abs(area) < 1e-6f) return false;
            var sign = area > 0 ? 1f : -1f;

            remaining.Clear();
            for (int i = 0; i < n; i++) remaining.Add(i);

            while (remaining.Count > 3)
            {
                var clipped = false;
                var count = remaining.Count;
                for (int i = 0; i < count; i++)
                {
                    int p = remaining[(i + count - 1) % count], c = remaining[i], q = remaining[(i + 1) % count];
                    if (Side(pts[p], pts[c], pts[q]) * sign <= 0) continue;

                    var ear = true;
                    for (int k = 0; k < count && ear; k++)
                    {
                        var v = remaining[k];
                        if (v == p || v == c || v == q) continue;
                        if (Side(pts[p], pts[c], pts[v]) * sign >= 0 && Side(pts[c], pts[q], pts[v]) * sign >= 0 && Side(pts[q], pts[p], pts[v]) * sign >= 0) ear = false;
                    }
                    if (!ear) continue;

                    tris.Add(p);
                    tris.Add(c);
                    tris.Add(q);
                    remaining.RemoveAt(i);
                    clipped = true;
                    break;
                }
                if (!clipped) return false;
            }

            tris.Add(remaining[0]);
            tris.Add(remaining[1]);
            tris.Add(remaining[2]);
            return true;
        }

        #endregion
    }
}
