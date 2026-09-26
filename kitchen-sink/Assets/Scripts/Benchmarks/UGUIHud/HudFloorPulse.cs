using UnityEngine;
using UnityEngine.UI;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>The 3px band that travels along the tilted floor; six vertices rebuilt per frame.</summary>
    public class HudFloorPulse : MaskableGraphic
    {
        static readonly Color32 Tint = new Color32(103, 232, 249, 255);

        float depth, opacity;

        public void Set(float planeY, float alpha)
        {
            if (Mathf.Abs(planeY - depth) < 0.01f && Mathf.Abs(alpha - opacity) < 0.002f) return;
            depth = planeY;
            opacity = alpha;
            SetVerticesDirty();
        }

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var r = rectTransform.rect;
            if (opacity <= 0.002f || r.width <= 0f || r.height <= 0f) return;

            var plane = new HudFloorPlane(r.width, r.height, HudFloorGrid.Perspective, HudFloorGrid.Tilt);
            float limit = plane.VisibleDepth;
            if (depth >= limit) return;

            float y0 = depth, y1 = Mathf.Min(depth + 3f, limit);
            float left = r.xMin, top = r.yMax;
            Row(vh, plane, left, top, y0, 0.95f * opacity * plane.Fade(y0));
            Row(vh, plane, left, top, y1, 0.95f * opacity * plane.Fade(y1));

            // Columns are transparent / peak / transparent, which is exact along a line of constant depth.
            vh.AddTriangle(0, 1, 4);
            vh.AddTriangle(4, 3, 0);
            vh.AddTriangle(1, 2, 5);
            vh.AddTriangle(5, 4, 1);
        }

        static void Row(VertexHelper vh, HudFloorPlane plane, float left, float top, float y, float alpha)
        {
            float sy = top - plane.ScreenY(y);
            var peak = new Color32(Tint.r, Tint.g, Tint.b, (byte)Mathf.RoundToInt(255f * Mathf.Clamp01(alpha)));
            var clear = new Color32(Tint.r, Tint.g, Tint.b, 0);
            vh.AddVert(new Vector3(left + plane.ScreenX(0f, y), sy), clear, Vector4.zero);
            vh.AddVert(new Vector3(left + plane.ScreenX(plane.Width * 0.5f, y), sy), peak, Vector4.zero);
            vh.AddVert(new Vector3(left + plane.ScreenX(plane.Width, y), sy), clear, Vector4.zero);
        }
    }
}
