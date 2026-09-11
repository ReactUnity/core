using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Keeps a pointer out of the part of an element its <c>clip-path</c> cut away -- which CSS asks
    /// for, and <c>mask-image</c> does not: a mask paints, a clip changes the element's shape.
    /// </summary>
    /// <remarks>
    /// This sits on the composite, so <see cref="FilterRaycaster"/>'s existing
    /// <c>Composite.Raycast</c> gate consults it for the whole subtree at once. Graphic.Raycast
    /// runs every ICanvasRaycastFilter it finds on the way up the hierarchy, and the composite is
    /// where that walk starts.
    /// </remarks>
    public class ClipPathRaycastFilter : MonoBehaviour, ICanvasRaycastFilter
    {
        public ClipPath Shape = ClipPath.None;

        /// <summary>
        /// The element's border box inside the composite's rect: its size, and where its bottom-left
        /// corner sits relative to the composite's own. The two differ by however much the filter
        /// region grew, and the element's own RectTransform cannot answer this -- it was reparented
        /// to the offscreen surface, a hundred thousand units from anything a pointer can hit.
        /// </summary>
        public Vector2 BoxSize;

        public Vector2 BoxOffset;

        /// <summary>
        /// The shape's reference box, in the border box's own coordinates -- so a
        /// <c>content-box</c> clip is hit-tested against the same rectangle it is drawn against.
        /// The border box itself is (0, 0, BoxSize).
        /// </summary>
        public Rect ClipBox;

        public bool IsRaycastLocationValid(Vector2 screenPoint, Camera eventCamera)
        {
            var shape = Shape;
            if (shape == null || shape.Kind == ClipPathKind.None) return true;
            if (BoxSize.x <= 0 || BoxSize.y <= 0) return true;

            var rt = transform as RectTransform;
            if (!rt) return true;

            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(rt, screenPoint, eventCamera, out var local)) return false;

            // The same mapping the shader makes out of its uv: out of the composite's rect, then in
            // by the filter region, which lands in the box's own points with y up from its bottom.
            return Contains(shape.Resolve(ClipBox), local - rt.rect.min - BoxOffset);
        }

        /// <summary>The shader's test, in C# and without the antialiased edge -- a pointer is either in or out.</summary>
        public static bool Contains(ClipPath.Resolved shape, Vector2 point)
        {
            switch (shape.Form)
            {
                case ClipShapeForm.RoundedBox:
                    return InsideRoundedBox(shape, point);

                case ClipShapeForm.Ellipse:
                {
                    if (shape.Radius.x <= 0 || shape.Radius.y <= 0) return false;
                    var d = point - shape.Center;
                    var u = new Vector2(d.x / shape.Radius.x, d.y / shape.Radius.y);
                    return u.sqrMagnitude <= 1f;
                }

                case ClipShapeForm.Contours:
                    return ClipPathGeometry.Contains(shape.Contours, shape.EvenOdd, point);

                default:
                    // Nothing to clip, which is also where a malformed shape lands -- an element
                    // that could not be clipped stays clickable rather than becoming a hole.
                    return true;
            }
        }

        private static bool InsideRoundedBox(ClipPath.Resolved shape, Vector2 point)
        {
            var box = shape.Box;
            if (!box.Contains(point)) return false;

            var half = box.size * 0.5f;
            var rel = point - box.center;

            // CSS names the corners top-left first and clockwise, and `top` is +y here.
            var i = rel.x < 0 ? (rel.y > 0 ? 0 : 3) : (rel.y > 0 ? 1 : 2);
            var rx = Mathf.Min(shape.RadiiX[i], half.x);
            var ry = Mathf.Min(shape.RadiiY[i], half.y);
            if (rx <= 0 || ry <= 0) return true;

            var q = new Vector2(Mathf.Abs(rel.x), Mathf.Abs(rel.y)) - (half - new Vector2(rx, ry));
            if (q.x <= 0 || q.y <= 0) return true;

            return new Vector2(q.x / rx, q.y / ry).sqrMagnitude <= 1f;
        }
    }
}
