using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// One offscreen render for many filters.
    /// </summary>
    /// <remarks>
    /// A capture is a whole pipeline entry, and an entry costs about the same whatever it draws: an
    /// empty 4x4 camera measures 1.5 ms in the editor against 2.0 ms for a 1777x820 one. So what a
    /// page of filters costs is the number of times it enters the pipeline, not the pixels -- eleven
    /// spinning 62x62 rings cost eleven entries. The filters that can share a frame are packed into
    /// one texture, taken in a single render, and copied back out into the targets each of them was
    /// already using, so nothing downstream of the capture changes.
    ///
    /// Two things decide who can share. The camera takes its element's rotation, which is what keeps
    /// a capture free of the element's own transform, so only the ones standing square can be framed
    /// together -- and a <c>perspective</c> needs a frustum of its own besides. And a subtree is free
    /// to draw outside the element's box, which each filter's own camera used to crop away for free;
    /// packed edge to edge that overflow would land on a neighbour, so a cell is sized to hold the
    /// subtree as well and only the capture region is copied out of it. The rest of the cell is
    /// padding nothing reads.
    /// </remarks>
    internal static class FilterBatch
    {
        /// <summary>The plane the packed surfaces are moved onto, clear of the per-filter slots.</summary>
        public const float AtlasZ = 50000f;

        const int MaxDimension = 4096;
        const int Padding = 2;

        struct Entry
        {
            public ElementFilter Filter;
            public int Depth;

            // The capture, and the cell that has to hold the subtree around it.
            public int CaptureW, CaptureH;
            public int CellW, CellH;
            public Vector2Int CaptureOffset;

            public Vector4 Margins;
            public float Width, Height;

            public int X, Y;
        }

        static readonly List<Entry> pending = new List<Entry>();
        static readonly List<Entry> group = new List<Entry>();
        static Camera camera;
        static RenderTexture atlas;
        static FilterBatchDriver driver;

        /// <summary>Off sends every capture back to a camera of its own. The packed result is meant
        /// to be identical to that one, and the test that holds it to that needs both.</summary>
        internal static bool Enabled = true;

        /// <summary>How many captures have been taken packed rather than alone, ever. For tests.</summary>
        internal static int PackedCount;

        /// <summary>
        /// Takes a capture to be made with the others this frame. <paramref name="cellSize"/> holds
        /// the subtree as well as the capture; <paramref name="captureOffset"/> is where the capture
        /// sits inside it, from the cell's bottom left.
        /// </summary>
        public static void Enqueue(ElementFilter filter, int depth, Vector2Int capture, Vector2Int cellSize,
            Vector2Int captureOffset, Vector4 margins, float width, float height)
        {
            EnsureDriver();

            pending.Add(new Entry
            {
                Filter = filter,
                Depth = depth,
                CaptureW = capture.x,
                CaptureH = capture.y,
                CellW = cellSize.x,
                CellH = cellSize.y,
                CaptureOffset = captureOffset,
                Margins = margins,
                Width = width,
                Height = height,
            });
        }

        /// <summary>
        /// Renders everything taken this frame and lets each filter finish. Nesting is what the
        /// passes are split on: a filter draws the composite of any filter inside it, so the inner
        /// one has to have been captured first or the outer would take last frame's copy of it.
        /// </summary>
        public static void Flush()
        {
            if (pending.Count == 0) return;

            var deepest = 0;
            for (int i = 0; i < pending.Count; i++) deepest = Mathf.Max(deepest, pending[i].Depth);

            for (int d = deepest; d >= 0; d--)
            {
                group.Clear();
                for (int i = 0; i < pending.Count; i++)
                    if (pending[i].Depth == d && pending[i].Filter) group.Add(pending[i]);
                if (group.Count > 0) RenderGroup();
            }

            pending.Clear();
        }

        static void RenderGroup()
        {
            // Tallest first, so a shelf is opened by the row that sets its height.
            group.Sort((a, b) => b.CellH.CompareTo(a.CellH));

            int x = 0, y = 0, shelf = 0, width = 0;

            for (int i = 0; i < group.Count; i++)
            {
                var e = group[i];

                if (e.CellW > MaxDimension || e.CellH > MaxDimension)
                {
                    // Nothing this big can be packed with anything. It keeps its own camera.
                    e.Filter.CaptureAlone(e.Margins, e.Width, e.Height);
                    group.RemoveAt(i--);
                    continue;
                }

                if (x > 0 && x + e.CellW > MaxDimension)
                {
                    x = 0;
                    y += shelf + Padding;
                    shelf = 0;
                }

                if (y + e.CellH > MaxDimension)
                {
                    // Out of room for this frame. The rest go one at a time rather than wait.
                    e.Filter.CaptureAlone(e.Margins, e.Width, e.Height);
                    group.RemoveAt(i--);
                    continue;
                }

                e.X = x;
                e.Y = y;
                group[i] = e;

                x += e.CellW + Padding;
                shelf = Mathf.Max(shelf, e.CellH);
                width = Mathf.Max(width, x);
            }

            if (group.Count == 0) return;

            var height = y + shelf;
            if (width <= 0 || height <= 0) return;

            // One filter left in the group is one render either way, and doing it alone keeps the
            // atlas out of it -- the packed path only pays off from two up.
            if (group.Count == 1)
            {
                var only = group[0];
                only.Filter.CaptureAlone(only.Margins, only.Width, only.Height);
                return;
            }

            var scale = group[0].Filter.CaptureScale;
            EnsureAtlas(width, height);
            EnsureCamera();

            for (int i = 0; i < group.Count; i++)
            {
                var e = group[i];
                // Where this cell's capture centre has to end up, in the atlas's own world plane.
                var centre = new Vector3(
                    (e.X + e.CaptureOffset.x + e.CaptureW * 0.5f) / scale,
                    (e.Y + e.CaptureOffset.y + e.CaptureH * 0.5f) / scale,
                    AtlasZ);
                e.Filter.MoveCaptureTo(centre);
            }

            // Framed against the whole texture and not the packed extent: the atlas is grown in
            // steps and kept, so it is its own size that decides which pixel a cell lands on.
            var aw = atlas.width;
            var ah = atlas.height;
            camera.transform.SetPositionAndRotation(
                new Vector3(aw * 0.5f / scale, ah * 0.5f / scale, AtlasZ - 100f), Quaternion.identity);
            camera.orthographicSize = ah * 0.5f / scale;
            camera.aspect = (float) aw / ah;
            camera.cullingMask = group[0].Filter.CaptureLayerMask;
            camera.targetTexture = atlas;
            using (ReactUnity.Helpers.ReactProfiling.FilterCapture.Auto()) camera.Render();

            for (int i = 0; i < group.Count; i++)
            {
                var e = group[i];
                Graphics.CopyTexture(atlas, 0, 0,
                    e.X + e.CaptureOffset.x, e.Y + e.CaptureOffset.y,
                    e.CaptureW, e.CaptureH,
                    e.Filter.CaptureTarget, 0, 0, 0, 0);

                // Home before the chain runs: the slots are what keep one surface out of
                // another's camera, and the mask below renders on one of its own.
                e.Filter.RestoreSlot();
                e.Filter.CompleteCapture(e.Margins, e.Width, e.Height);
                PackedCount++;
            }
        }

        static void EnsureAtlas(int width, int height)
        {
            var w = Grow(width);
            var h = Grow(height);

            if (atlas && atlas.width >= w && atlas.height >= h)
            {
                // Kept unless it has been far too big for a while. Shrinking on the first small
                // frame would reallocate every frame for a packing that oscillates across a step,
                // and never shrinking would leave a filter-heavy page's atlas behind for good.
                if (atlas.width <= w * 2 && atlas.height <= h * 2) { oversized = 0; return; }
                if (++oversized < 120) return;
            }

            oversized = 0;

            if (atlas)
            {
                atlas.Release();
                Object.Destroy(atlas);
            }

            // Matched to what a filter allocates for itself, so the copy out of here is a straight
            // GPU blit rather than a converting one.
            atlas = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32);
            atlas.filterMode = FilterMode.Bilinear;
            atlas.wrapMode = TextureWrapMode.Clamp;
            atlas.name = "[FilterAtlas]";
            atlas.Create();
        }

        /// <summary>In steps, so a packing that comes out a few pixels wider than the last one
        /// reuses the texture instead of reallocating it.</summary>
        static int Grow(int v) => Mathf.Min(MaxDimension, Mathf.CeilToInt(v / 512f) * 512);

        static int oversized;

        static void EnsureCamera()
        {
            if (camera) return;

            var go = new GameObject("[FilterAtlasCamera]") { hideFlags = HideFlags.DontSave };
            camera = go.AddComponent<Camera>();
            camera.orthographic = true;
            camera.clearFlags = CameraClearFlags.SolidColor;
            camera.backgroundColor = Color.clear;
            camera.nearClipPlane = 0.01f;
            camera.farClipPlane = 1000f;
            camera.enabled = false;
            camera.useOcclusionCulling = false;
            camera.allowHDR = false;
            camera.allowMSAA = false;
        }

        static void EnsureDriver()
        {
            if (driver) return;
            driver = new GameObject("[FilterBatch]") { hideFlags = HideFlags.DontSave }
                .AddComponent<FilterBatchDriver>();
        }
    }

    /// <summary>
    /// Flushes the batch once every filter has offered its capture. The order is what the execution
    /// order buys: a filter enqueues from its own LateUpdate, and this has to run after the last of
    /// them rather than somewhere in the middle of the list.
    /// </summary>
    [DefaultExecutionOrder(32000)]
    internal class FilterBatchDriver : MonoBehaviour
    {
        void LateUpdate() => FilterBatch.Flush();
    }
}
