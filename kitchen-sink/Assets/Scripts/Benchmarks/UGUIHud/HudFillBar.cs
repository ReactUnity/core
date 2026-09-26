using UnityEngine;
using UnityEngine.UI;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>
    /// A sliced sprite laid out at the full rect width and cut off at <see cref="Fill"/>, so the far end
    /// is square the way a bar inside an overflow-hidden rounded well is -- no mask, and it batches with
    /// the atlas. Borders shrink uniformly when the rect is smaller than them, keeping pill ends round.
    /// </summary>
    public class HudFillBar : MaskableGraphic
    {
        static readonly float[] xs = new float[4], ys = new float[4], us = new float[4], vs = new float[4];

        [SerializeField] Sprite sprite;
        [SerializeField] float fill = 1f;

        public Sprite Sprite
        {
            get => sprite;
            set
            {
                sprite = value;
                SetAllDirty();
            }
        }

        public float Fill
        {
            get => fill;
            set
            {
                value = Mathf.Clamp01(value);
                if (Mathf.Abs(value - fill) < 0.0005f) return;
                fill = value;
                SetVerticesDirty();
            }
        }

        public override Texture mainTexture => sprite ? sprite.texture : s_WhiteTexture;

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var r = rectTransform.rect;
            if (!sprite || fill <= 0f || r.width <= 0f || r.height <= 0f) return;

            var tex = sprite.texture;
            var tr = sprite.textureRect;
            var b = sprite.border;
            float iw = 1f / tex.width, ih = 1f / tex.height;
            float w = r.width, h = r.height;

            float k = 1f;
            if (b.x + b.z > w) k = Mathf.Min(k, w / (b.x + b.z));
            if (b.y + b.w > h) k = Mathf.Min(k, h / (b.y + b.w));

            xs[0] = 0f; xs[1] = b.x * k; xs[2] = w - b.z * k; xs[3] = w;
            ys[0] = 0f; ys[1] = b.y * k; ys[2] = h - b.w * k; ys[3] = h;
            us[0] = tr.xMin * iw; us[1] = (tr.xMin + b.x) * iw; us[2] = (tr.xMax - b.z) * iw; us[3] = tr.xMax * iw;
            vs[0] = tr.yMin * ih; vs[1] = (tr.yMin + b.y) * ih; vs[2] = (tr.yMax - b.w) * ih; vs[3] = tr.yMax * ih;

            float clip = fill * w;
            Color32 c = color;

            for (int i = 0; i < 3; i++)
            {
                float x0 = xs[i], x1 = xs[i + 1], u0 = us[i], u1 = us[i + 1];
                if (x1 <= x0) continue;
                if (x0 >= clip) break;
                if (x1 > clip)
                {
                    u1 = Mathf.Lerp(u0, u1, (clip - x0) / (x1 - x0));
                    x1 = clip;
                }

                for (int j = 0; j < 3; j++)
                {
                    float y0 = ys[j], y1 = ys[j + 1];
                    if (y1 <= y0) continue;
                    Quad(vh, r.xMin + x0, r.yMin + y0, r.xMin + x1, r.yMin + y1, u0, vs[j], u1, vs[j + 1], c);
                }
            }
        }

        internal static void Quad(VertexHelper vh, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, Color32 c)
        {
            int i = vh.currentVertCount;
            vh.AddVert(new Vector3(x0, y0), c, new Vector4(u0, v0));
            vh.AddVert(new Vector3(x0, y1), c, new Vector4(u0, v1));
            vh.AddVert(new Vector3(x1, y1), c, new Vector4(u1, v1));
            vh.AddVert(new Vector3(x1, y0), c, new Vector4(u1, v0));
            vh.AddTriangle(i, i + 1, i + 2);
            vh.AddTriangle(i + 2, i + 3, i);
        }
    }
}
