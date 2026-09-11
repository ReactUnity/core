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
    /// One camera's worth of backdrops: a surface per reader, each holding the frame as it stood
    /// when that reader was about to be drawn.
    /// </summary>
    /// <remarks>
    /// Built-in's <c>GrabPass { }</c> copies the render target immediately before the pass that reads
    /// it, so a backdrop there is exact and costs nothing to arrange. A scriptable pipeline has no
    /// GrabPass at all, and URP's <c>_CameraOpaqueTexture</c> is one snapshot taken before any
    /// transparent geometry -- so no UI is ever in it, and a frosted panel over a page blurs the 3D
    /// scene behind the page instead of the page.
    ///
    /// So the camera renders again for each reader, with everything from that reader onwards hidden,
    /// which is the image a grab at that point would have produced. Readers are taken in paint order
    /// and handed their backdrop as they go, so one that sits over another finds the first one's
    /// result already in it, as on the web.
    ///
    /// A render apiece is what the exactness costs: about 1.5 ms per reader in the editor, against
    /// the 0.16 ms a GrabPass takes to copy the target -- so the built-in pipeline keeps grabbing,
    /// and this is only for the pipelines that cannot. What it must not also cost is a canvas
    /// rebuild, which is far more than the render; see <see cref="Hide"/>.
    /// </remarks>
    public class BackdropPass
    {
        private readonly List<RenderTexture> surfaces = new List<RenderTexture>();
        private readonly List<Transform> hidden = new List<Transform>();
        private readonly List<CanvasRenderer> dimmed = new List<CanvasRenderer>();
        private readonly List<float> alphas = new List<float>();
        private readonly List<CanvasRenderer> buffer = new List<CanvasRenderer>();

        /// <summary>
        /// Renders one surface per reader, in the order given, and hands each reader its own.
        /// </summary>
        /// <param name="root">The canvas the readers live under, which bounds how far up the frame
        /// is taken apart. A reader outside it gets nothing and falls back to the pipeline.</param>
        public void Render(Camera cam, Transform root, List<IBackdropReader> readers, int width, int height)
        {
            if (!cam || !root || readers.Count == 0)
            {
                Release();
                return;
            }

            EnsureSurfaces(readers.Count, width, height);
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
        /// Zero alpha on the CanvasRenderers, rather than either of the two things that look like
        /// they are for exactly this. The <c>CanvasRenderer.cull</c> flag does not hold: RectMask2D
        /// re-derives cull for every maskable graphic it clips on each canvas update, and one of
        /// those runs inside the render below, so the flag survived on only the third of the page
        /// that no scroll box contained. A degenerate transform does hold, but it collapses every
        /// rect beneath it, which sends RectMask2D the other way -- it culls the whole page, clears
        /// the geometry and rebuilds it on the way back, twice a frame. That cost 33 ms a frame on
        /// the sample's scrolling page against 8.6 ms for this. Alpha moves no rect, so nothing is
        /// re-clipped and nothing is re-tessellated; the canvas only re-submits what it already has.
        /// </remarks>
        bool Hide(Transform reader, Transform root)
        {
            if (!reader || !reader.IsChildOf(root) || reader == root) return false;

            // The reader's own subtree, then every later sibling on the way up to the canvas: the
            // tail of a depth-first walk, in as few transforms as it can be written.
            hidden.Clear();
            hidden.Add(reader);
            for (var t = reader; t != root; t = t.parent)
            {
                var parent = t.parent;
                for (int i = t.GetSiblingIndex() + 1; i < parent.childCount; i++) hidden.Add(parent.GetChild(i));
            }

            for (int i = 0; i < hidden.Count; i++)
            {
                hidden[i].GetComponentsInChildren(true, buffer);
                for (int k = 0; k < buffer.Count; k++)
                {
                    dimmed.Add(buffer[k]);
                    alphas.Add(buffer[k].GetAlpha());
                    buffer[k].SetAlpha(0);
                }
            }

            return true;
        }

        void Unhide()
        {
            for (int i = 0; i < dimmed.Count; i++) if (dimmed[i]) dimmed[i].SetAlpha(alphas[i]);
            dimmed.Clear();
            alphas.Clear();
        }

        void EnsureSurfaces(int count, int width, int height)
        {
            var w = Mathf.Max(1, width);
            var h = Mathf.Max(1, height);

            for (int i = surfaces.Count - 1; i >= 0; i--)
            {
                var rt = surfaces[i];
                if (i < count && rt && rt.width == w && rt.height == h) continue;
                Free(rt);
                surfaces.RemoveAt(i);
            }

            while (surfaces.Count < count)
            {
                var rt = new RenderTexture(w, h, 24) { name = "[BackdropSurface]" };
                rt.Create();
                surfaces.Add(rt);
            }
        }

        /// <summary>Drops the surfaces. Readers are unbound by whoever registered them.</summary>
        public void Release()
        {
            for (int i = 0; i < surfaces.Count; i++) Free(surfaces[i]);
            surfaces.Clear();
        }

        static void Free(RenderTexture rt)
        {
            if (!rt) return;
            rt.Release();
            Object.Destroy(rt);
        }

        /// <summary>Which of two readers the canvas paints first.</summary>
        public static int ComparePaintOrder(IBackdropReader a, IBackdropReader b)
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
    }

    /// <summary>
    /// The context's register of everything that reads a backdrop, and the pass that serves the ones
    /// drawn straight to the screen.
    /// </summary>
    /// <remarks>
    /// A reader inside a <see cref="ElementFilter"/>'s capture is not one of those: it is drawn by
    /// that filter's offscreen camera, into that filter's target, so its backdrop is the capture so
    /// far rather than the screen. That is what built-in gets for free -- a GrabPass copies whatever
    /// render target is current -- and it is what makes `isolation: isolate` contain a blend. Those
    /// readers are handed back out by <see cref="CollectFor"/> and rendered by the filter itself,
    /// which is the only thing that knows when its capture is being taken.
    /// </remarks>
    [DefaultExecutionOrder(100)]
    public class BackdropSurface : MonoBehaviour
    {
        /// <summary>Whether a backdrop has to be rendered rather than grabbed. Only the built-in
        /// pipeline has a GrabPass, and it is the one pipeline with no render pipeline asset.</summary>
        public static bool Required => GraphicsSettings.currentRenderPipeline != null;

        public UGUIContext Context;

        private readonly List<IBackdropReader> readers = new List<IBackdropReader>();
        private readonly List<IBackdropReader> onScreen = new List<IBackdropReader>();
        private readonly BackdropPass pass = new BackdropPass();
        private bool bound;

        public void Register(IBackdropReader reader)
        {
            if (reader != null && !readers.Contains(reader)) readers.Add(reader);
        }

        public void Unregister(IBackdropReader reader)
        {
            // Told before the surface it was handed is released under it.
            if (readers.Remove(reader)) reader.SetBackdrop(null);
        }

        /// <summary>
        /// The readers whose backdrop is <paramref name="group"/>'s capture, in paint order -- or the
        /// ones drawn straight to the screen, for a null group.
        /// </summary>
        public void CollectFor(ElementFilter group, List<IBackdropReader> into)
        {
            into.Clear();

            for (int i = readers.Count - 1; i >= 0; i--)
            {
                var renderer = readers[i]?.BackdropRenderer;
                if (!renderer)
                {
                    readers.RemoveAt(i);
                    continue;
                }

                // Whichever capture this renderer is drawn into, which is the nearest filter above
                // it -- a filter's own composite sits back in the page, so it finds the one outside.
                if (renderer.GetComponentInParent<ElementFilter>() == group) into.Add(readers[i]);
            }

            into.Sort(BackdropPass.ComparePaintOrder);
        }

        /// <summary>The camera whose frame the on-screen readers are drawn into. An overlay canvas is
        /// drawn after every camera has finished, so there is no camera whose output contains it and
        /// no backdrop to render -- those elements keep reading whatever the pipeline offers.</summary>
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
            if (!Required)
            {
                Clear();
                return;
            }

            CollectFor(null, onScreen);

            var cam = onScreen.Count > 0 ? SourceCamera : null;
            if (!cam)
            {
                Clear();
                return;
            }

            pass.Render(cam, Context.RootCanvas.transform, onScreen, cam.pixelWidth, cam.pixelHeight);
            bound = true;
        }

        /// <summary>Drops the surfaces and tells every reader it is on its own again.</summary>
        void Clear()
        {
            if (!bound) return;
            bound = false;

            for (int i = 0; i < readers.Count; i++) readers[i]?.SetBackdrop(null);
            pass.Release();
        }

        void OnDisable() => Clear();

        void OnDestroy() => Clear();
    }
}
