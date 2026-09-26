using UnityEngine;
using UnityEngine.UI;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>
    /// The "armed" rim around an action slot: a rounded-rect band whose vertex alpha samples the
    /// spinning conic gradient. Replaces a stencil Mask plus a rotating wedge per slot; the slot drawn
    /// on top hides the band's inner half, as it does on the page.
    /// </summary>
    public class HudArmedRim : MaskableGraphic
    {
        const int Segments = 72;
        const float Radius = 12f, Band = 3.5f, Fringe = 1f;

        static readonly Color32 Tint = new Color32(103, 232, 249, 230);

        readonly Vector2[] outer = new Vector2[Segments], inner = new Vector2[Segments], fringe = new Vector2[Segments];
        readonly float[] angles = new float[Segments];
        Vector2 builtFor;
        float rotation = -1f;

        public void SetRotation(float degrees)
        {
            if (Mathf.Abs(degrees - rotation) < 0.05f) return;
            rotation = degrees;
            SetVerticesDirty();
        }

        void Build(Rect r)
        {
            builtFor = r.size;
            float hx = r.width * 0.5f, hy = r.height * 0.5f;
            for (int i = 0; i < Segments; i++)
            {
                float deg = 360f * i / Segments;
                float a = deg * Mathf.Deg2Rad;
                var dir = new Vector2(Mathf.Sin(a), Mathf.Cos(a));
                angles[i] = deg;
                outer[i] = dir * Ray(dir, hx, hy, Radius);
                inner[i] = dir * Ray(dir, hx - Band, hy - Band, Radius - Band);
                fringe[i] = dir * Ray(dir, hx + Fringe, hy + Fringe, Radius + Fringe);
            }
        }

        static float Ray(Vector2 dir, float hx, float hy, float radius)
        {
            float lo = 0f, hi = hx + hy;
            for (int i = 0; i < 24; i++)
            {
                float mid = (lo + hi) * 0.5f;
                if (SdRoundBox(dir.x * mid, dir.y * mid, hx, hy, radius) < 0f) lo = mid;
                else hi = mid;
            }
            return lo;
        }

        static float SdRoundBox(float px, float py, float hx, float hy, float r)
        {
            float qx = Mathf.Abs(px) - hx + r, qy = Mathf.Abs(py) - hy + r;
            float ox = Mathf.Max(qx, 0f), oy = Mathf.Max(qy, 0f);
            return Mathf.Sqrt(ox * ox + oy * oy) + Mathf.Min(Mathf.Max(qx, qy), 0f) - r;
        }

        /// <summary>conic-gradient(transparent 0deg, tint 72deg, transparent 144deg).</summary>
        static float Conic(float deg)
        {
            deg -= 360f * Mathf.Floor(deg / 360f);
            if (deg < 72f) return deg / 72f;
            if (deg < 144f) return (144f - deg) / 72f;
            return 0f;
        }

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var r = rectTransform.rect;
            if (r.width <= 0f || r.height <= 0f) return;
            if (builtFor != r.size) Build(r);

            var c = r.center;
            var clear = new Color32(Tint.r, Tint.g, Tint.b, 0);
            for (int i = 0; i < Segments; i++)
            {
                var col = new Color32(Tint.r, Tint.g, Tint.b, (byte)Mathf.RoundToInt(Tint.a * Conic(angles[i] - rotation)));
                vh.AddVert(c + inner[i], col, Vector4.zero);
                vh.AddVert(c + outer[i], col, Vector4.zero);
                vh.AddVert(c + fringe[i], clear, Vector4.zero);
            }

            for (int i = 0; i < Segments; i++)
            {
                int a = i * 3, b = ((i + 1) % Segments) * 3;
                vh.AddTriangle(a, a + 1, b + 1);
                vh.AddTriangle(b + 1, b, a);
                vh.AddTriangle(a + 1, a + 2, b + 2);
                vh.AddTriangle(b + 2, b + 1, a + 1);
            }
        }
    }
}
