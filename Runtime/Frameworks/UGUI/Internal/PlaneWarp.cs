using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Draws a filter's composite as a <c>perspective</c> sees a flat capture: each vertex of the
    /// visible part of the plane goes where the projection puts it, and the uv carries 1/w so the
    /// texture is interpolated across the plane rather than across the screen.
    /// </summary>
    /// <remarks>
    /// Everything is in the element's own space, which the composite shares. The plane is a point and
    /// two axes with z already scaled to depth, so a plane coordinate (s, t) lands at
    /// <c>point + s * axisS + t * axisT</c> before the divide. The capture covers
    /// <c>region</c>; the polygon is the convex part of it the frustum would have drawn.
    /// </remarks>
    public class PlaneWarp : BaseMeshEffect
    {
        private Vector3 point;
        private Vector3 axisS;
        private Vector3 axisT;
        private Rect region;
        private Vector2 eye;
        private float inverseDistance;
        private readonly List<Vector2> polygon = new List<Vector2>();

        public bool Warping { get; private set; }

        public void Set(Vector3 point, Vector3 axisS, Vector3 axisT, Rect region, List<Vector2> polygon, Vector2 eye, float perspective)
        {
            var k = 1f / perspective;
            if (Warping && point == this.point && axisS == this.axisS && axisT == this.axisT &&
                region == this.region && eye == this.eye && k == inverseDistance && SamePolygon(polygon)) return;

            this.point = point;
            this.axisS = axisS;
            this.axisT = axisT;
            this.region = region;
            this.eye = eye;
            inverseDistance = k;
            this.polygon.Clear();
            this.polygon.AddRange(polygon);
            Warping = true;
            if (graphic) graphic.SetVerticesDirty();
        }

        bool SamePolygon(List<Vector2> other)
        {
            if (other.Count != polygon.Count) return false;
            for (int i = 0; i < other.Count; i++)
                if (other[i] != polygon[i]) return false;
            return true;
        }

        public void Clear()
        {
            if (!Warping) return;
            Warping = false;
            if (graphic) graphic.SetVerticesDirty();
        }

        public override void ModifyMesh(VertexHelper vh)
        {
            if (!Warping || !IsActive()) return;

            Color32 color = graphic.color;
            vh.Clear();
            for (int i = 0; i < polygon.Count; i++)
            {
                var st = polygon[i];
                var x = point + st.x * axisS + st.y * axisT;
                var w = 1f + x.z * inverseDistance;
                var p = eye + ((Vector2) x - eye) / w;
                var q = 1f / w;
                var u = (st.x - region.xMin) / region.width;
                var v = (st.y - region.yMin) / region.height;
                vh.AddVert(new Vector3(p.x, p.y, 0), color, new Vector4(u * q, v * q, 0, q));
            }

            // Convex, so a fan covers it.
            for (int i = 1; i + 1 < polygon.Count; i++) vh.AddTriangle(0, i, i + 1);
        }

        /// <summary>
        /// Takes a point in the element's space back through the projection to the capture's uv.
        /// False when it lands behind the eye or outside the part of the plane that is drawn.
        /// </summary>
        public bool TryUnproject(Vector2 p, out Vector2 uv)
        {
            uv = default;
            if (!Warping) return false;

            // (p - eye) * w = point.xy - eye + s * axisS.xy + t * axisT.xy, with w affine in s and t.
            var k = inverseDistance;
            var d = p - eye;
            var c0 = (Vector2) axisS - d * (k * axisS.z);
            var c1 = (Vector2) axisT - d * (k * axisT.z);
            var rhs = d * (1f + k * point.z) - ((Vector2) point - eye);

            var det = c0.x * c1.y - c1.x * c0.y;
            if (Mathf.Abs(det) < 1e-8f) return false;

            var st = new Vector2((rhs.x * c1.y - c1.x * rhs.y) / det, (c0.x * rhs.y - rhs.x * c0.y) / det);
            if (1f + k * (point.z + st.x * axisS.z + st.y * axisT.z) <= 0f || !Inside(st)) return false;

            uv = new Vector2((st.x - region.xMin) / region.width, (st.y - region.yMin) / region.height);
            return true;
        }

        /// <summary>Whether a plane point is inside the convex polygon, whichever way it winds.</summary>
        bool Inside(Vector2 st)
        {
            var sign = 0f;
            for (int i = 0; i < polygon.Count; i++)
            {
                var a = polygon[i];
                var b = polygon[(i + 1) % polygon.Count];
                var cross = (b.x - a.x) * (st.y - a.y) - (b.y - a.y) * (st.x - a.x);
                if (cross == 0f) continue;
                if (sign == 0f) sign = cross;
                else if ((cross > 0f) != (sign > 0f)) return false;
            }
            return true;
        }
    }
}
