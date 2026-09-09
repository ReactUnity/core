using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>An element that reads the frame behind it -- `backdrop-filter`, or a
    /// `mix-blend-mode` that is not `normal`.</summary>
    public interface IBackdropReader
    {
        /// <summary>The renderer whose place in the canvas decides what counts as behind.</summary>
        CanvasRenderer BackdropRenderer { get; }

        /// <summary>Hands over the backdrop for this frame, or null to fall back to whatever the
        /// pipeline offers.</summary>
        void SetBackdrop(Texture backdrop);
    }

    /// <summary>
    /// The frame as it stands behind the elements that read it, for a pipeline that cannot hand one
    /// over.
    /// </summary>
    /// <remarks>
    /// Built-in's <c>GrabPass { }</c> copies the render target immediately before the pass that reads
    /// it, so a backdrop there is exact and costs nothing to arrange. A scriptable pipeline has no
    /// GrabPass at all, and URP's <c>_CameraOpaqueTexture</c> is one snapshot taken before any
    /// transparent geometry -- so no UI is ever in it, and a frosted panel over a page blurs the 3D
    /// scene behind the page instead of the page.
    ///
    /// This renders the canvas's camera again for each reader, with everything from that reader
    /// onwards hidden, which is the image a grab at that point would have produced. Readers are
    /// taken in paint order and handed their backdrop as they go, so one that sits over another
    /// finds the first one's result already in it, as on the web.
    ///
    /// A render apiece is what the exactness costs, and it is not cheap: about 3 ms per reader in
    /// the editor, of which 1.4 ms is fixed <c>Camera.Render</c> overhead that a smaller target does
    /// not touch, and the rest is the canvas re-batching for content it has not drawn before. That
    /// is the price of having no GrabPass, which copies the target for 0.16 ms -- so the built-in
    /// pipeline keeps grabbing, and this is only for the pipelines that cannot.
    /// </remarks>
    [DefaultExecutionOrder(100)]
    public class BackdropSurface : MonoBehaviour
    {
        /// <summary>Whether a backdrop has to be rendered rather than grabbed. Only the built-in
        /// pipeline has a GrabPass, and it is the one pipeline with no render pipeline asset.</summary>
        public static bool Required => GraphicsSettings.currentRenderPipeline != null;

        public UGUIContext Context;

        private readonly List<IBackdropReader> readers = new List<IBackdropReader>();
        private readonly List<RenderTexture> surfaces = new List<RenderTexture>();

        private readonly List<Transform> hidden = new List<Transform>();
        private readonly List<Vector3> scales = new List<Vector3>();

        public void Register(IBackdropReader reader)
        {
            if (reader != null && !readers.Contains(reader)) readers.Add(reader);
        }

        public void Unregister(IBackdropReader reader)
        {
            // Told before the surface it was handed is released under it.
            if (readers.Remove(reader)) reader.SetBackdrop(null);
        }

        /// <summary>The camera whose frame the readers are drawn into. An overlay canvas is drawn
        /// after every camera has finished, so there is no camera whose output contains it and no
        /// backdrop to render -- those elements keep reading whatever the pipeline offers.</summary>
        Camera SourceCamera
        {
            get
            {
                var root = Context?.RootCanvas;
                if (!root || root.renderMode == RenderMode.ScreenSpaceOverlay) return null;
                return root.worldCamera ? root.worldCamera : Camera.main;
            }
        }

        void LateUpdate()
        {
            for (int i = readers.Count - 1; i >= 0; i--)
                if (readers[i] == null || !readers[i].BackdropRenderer) readers.RemoveAt(i);

            var cam = Required && readers.Count > 0 ? SourceCamera : null;
            if (!cam)
            {
                Clear();
                return;
            }

            var root = Context.RootCanvas.transform;
            readers.Sort(ComparePaintOrder);
            EnsureSurfaces(cam.pixelWidth, cam.pixelHeight);

            var target = cam.targetTexture;

            for (int r = 0; r < readers.Count; r++)
            {
                if (!Hide(readers[r].BackdropRenderer.transform, root))
                {
                    readers[r].SetBackdrop(null);
                    continue;
                }

                // Nothing may leave the page hidden: a throw between here and Unhide would take the
                // whole UI off the screen and leave it off.
                try
                {
                    cam.targetTexture = surfaces[r];
                    cam.Render();
                }
                finally
                {
                    Unhide();
                    cam.targetTexture = target;
                }

                // Bound as we go, so the next reader's render finds this one's result in place.
                readers[r].SetBackdrop(surfaces[r]);
            }
        }

        /// <summary>
        /// Takes everything painted at or after <paramref name="reader"/> out of the frame, for one
        /// render. False if the reader is not under this canvas, and nothing was touched.
        /// </summary>
        /// <remarks>
        /// A zero scale, rather than the <c>CanvasRenderer.cull</c> flag that looks like it is for
        /// exactly this: RectMask2D re-derives cull for every maskable graphic it clips on each
        /// canvas update, and one of those runs inside the render below -- so the flag survived on
        /// only the third of the page that no scroll box contained. Disabling the graphics instead
        /// would hold, but it clears their geometry and dirties them again on the way back, which
        /// rebuilds the whole page twice a frame. A degenerate transform rasterizes nothing and
        /// costs a re-batch.
        /// </remarks>
        bool Hide(Transform reader, Transform root)
        {
            if (!reader || !reader.IsChildOf(root) || reader == root) return false;

            // The reader's own subtree, then every later sibling on the way up to the canvas: the
            // tail of a depth-first walk, in as few transforms as it can be written.
            hidden.Add(reader);
            for (var t = reader; t != root; t = t.parent)
            {
                var parent = t.parent;
                for (int i = t.GetSiblingIndex() + 1; i < parent.childCount; i++) hidden.Add(parent.GetChild(i));
            }

            for (int i = 0; i < hidden.Count; i++)
            {
                scales.Add(hidden[i].localScale);
                hidden[i].localScale = Vector3.zero;
            }

            return true;
        }

        void Unhide()
        {
            for (int i = 0; i < hidden.Count; i++) hidden[i].localScale = scales[i];
            hidden.Clear();
            scales.Clear();
        }

        static int ComparePaintOrder(IBackdropReader a, IBackdropReader b)
        {
            return ComparePaintOrder(a.BackdropRenderer.transform, b.BackdropRenderer.transform);
        }

        /// <summary>Which of two transforms a depth-first walk reaches first, which is the order the
        /// canvas paints them in.</summary>
        static int ComparePaintOrder(Transform a, Transform b)
        {
            if (a == b) return 0;

            int da = Depth(a), db = Depth(b);
            Transform ta = a, tb = b;
            for (int i = da; i > db; i--) ta = ta.parent;
            for (int i = db; i > da; i--) tb = tb.parent;

            // One is an ancestor of the other, and a parent is always painted before its children.
            if (ta == tb) return da < db ? -1 : 1;

            while (ta && tb && ta.parent != tb.parent) { ta = ta.parent; tb = tb.parent; }
            if (!ta || !tb) return 0;

            return ta.GetSiblingIndex().CompareTo(tb.GetSiblingIndex());
        }

        static int Depth(Transform t)
        {
            var d = 0;
            while (t.parent) { d++; t = t.parent; }
            return d;
        }

        void EnsureSurfaces(int width, int height)
        {
            var w = Mathf.Max(1, width);
            var h = Mathf.Max(1, height);

            for (int i = surfaces.Count - 1; i >= 0; i--)
            {
                var rt = surfaces[i];
                if (i < readers.Count && rt && rt.width == w && rt.height == h) continue;
                Release(rt);
                surfaces.RemoveAt(i);
            }

            while (surfaces.Count < readers.Count)
            {
                var rt = new RenderTexture(w, h, 24) { name = "[BackdropSurface]" };
                rt.Create();
                surfaces.Add(rt);
            }
        }

        /// <summary>Drops the surfaces and tells every reader it is on its own again.</summary>
        void Clear()
        {
            if (surfaces.Count == 0) return;

            for (int i = 0; i < readers.Count; i++) readers[i]?.SetBackdrop(null);
            for (int i = 0; i < surfaces.Count; i++) Release(surfaces[i]);
            surfaces.Clear();
        }

        void Release(RenderTexture rt)
        {
            if (!rt) return;
            rt.Release();
            Destroy(rt);
        }

        void OnDisable() => Clear();

        void OnDestroy() => Clear();
    }
}
