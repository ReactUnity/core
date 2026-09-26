using UnityEngine;
using UnityEngine.UI;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>
    /// The perspective floor's two line gradients, projected on the CPU once into quads. The mask
    /// fade rides in vertex alpha, so each receding line is subdivided along its depth. The rect is
    /// the horizon box, pivot top-left.
    /// </summary>
    public class HudFloorGrid : MaskableGraphic
    {
        public const float Spacing = 46f, Perspective = 260f, Tilt = 68f;
        const int DepthSteps = 16;
        const float Fringe = 0.75f;

        static readonly Color32 Line = new Color32(34, 211, 238, 255);

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var r = rectTransform.rect;
            if (r.width <= 0f || r.height <= 0f) return;

            var plane = new HudFloorPlane(r.width, r.height, Perspective, Tilt);
            float depth = plane.VisibleDepth;
            float left = r.xMin, top = r.yMax;

            // The "to bottom" layer is listed second, so it paints first.
            for (float y = 0f; y < depth; y += Spacing)
            {
                float y0 = plane.ScreenY(y), y1 = plane.ScreenY(y + 1f);
                float thick = y1 - y0;
                float a = 0.45f * plane.Fade(y + 0.5f) * Mathf.Min(1f, thick);
                float mid = (y0 + y1) * 0.5f, half = Mathf.Max(thick, 1f) * 0.5f;
                float xa = plane.ScreenX(0f, y), xb = plane.ScreenX(r.width, y);

                int v = vh.currentVertCount;
                AddRow(vh, left + xa, left + xb, top - (mid - half - Fringe), 0f);
                AddRow(vh, left + xa, left + xb, top - (mid - half), a);
                AddRow(vh, left + xa, left + xb, top - (mid + half), a);
                AddRow(vh, left + xa, left + xb, top - (mid + half + Fringe), 0f);
                for (int i = 0; i < 3; i++)
                {
                    int p = v + i * 2;
                    vh.AddTriangle(p, p + 1, p + 3);
                    vh.AddTriangle(p + 3, p + 2, p);
                }
            }

            for (float x = 0f; x <= r.width; x += Spacing)
            {
                int start = vh.currentVertCount;
                for (int s = 0; s <= DepthSteps; s++)
                {
                    float y = depth * s / DepthSteps;
                    float sy = top - plane.ScreenY(y);
                    float xl = left + plane.ScreenX(x, y), xr = left + plane.ScreenX(x + 1f, y);
                    var a = (byte)Mathf.RoundToInt(255f * 0.55f * plane.Fade(y));
                    vh.AddVert(new Vector3(xl - Fringe, sy), new Color32(Line.r, Line.g, Line.b, 0), Vector4.zero);
                    vh.AddVert(new Vector3(xl, sy), new Color32(Line.r, Line.g, Line.b, a), Vector4.zero);
                    vh.AddVert(new Vector3(xr, sy), new Color32(Line.r, Line.g, Line.b, a), Vector4.zero);
                    vh.AddVert(new Vector3(xr + Fringe, sy), new Color32(Line.r, Line.g, Line.b, 0), Vector4.zero);
                }

                for (int s = 0; s < DepthSteps; s++)
                {
                    int row = start + s * 4, next = row + 4;
                    for (int c = 0; c < 3; c++)
                    {
                        vh.AddTriangle(row + c, next + c, next + c + 1);
                        vh.AddTriangle(next + c + 1, row + c + 1, row + c);
                    }
                }
            }
        }

        static void AddRow(VertexHelper vh, float x0, float x1, float y, float alpha)
        {
            var c = new Color32(Line.r, Line.g, Line.b, (byte)Mathf.RoundToInt(255f * Mathf.Clamp01(alpha)));
            vh.AddVert(new Vector3(x0, y), c, Vector4.zero);
            vh.AddVert(new Vector3(x1, y), c, Vector4.zero);
        }
    }
}
