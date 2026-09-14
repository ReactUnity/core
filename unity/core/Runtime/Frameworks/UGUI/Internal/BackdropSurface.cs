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

        /// <summary>How far outside its own rect, in screen pixels, the element reads the backdrop.
        /// Only a blur does, and only that far.</summary>
        float BackdropBleed { get; }
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
        private readonly List<IBackdropReader> held = new List<IBackdropReader>();

        /// <summary>How many surfaces this pass has rendered, ever. For tests.</summary>
        public int RenderCount { get; private set; }

        /// <summary>
        /// Renders one surface per reader, in the order given, and hands each reader its own.
        /// </summary>
        /// <param name="root">The canvas the readers live under, which bounds how far up the frame
        /// is taken apart. A reader outside it gets nothing and falls back to the pipeline.</param>
        /// <param name="stale">Which readers have had something change behind them since last time.
        /// The rest keep the surface they were given, which is the whole point of asking: a render
        /// apiece is the cost here, and a backdrop only moves when what is painted before it does.
        /// Null renders every one of them.</param>
        public void Render(Camera cam, Transform root, List<IBackdropReader> readers, int width, int height,
            List<bool> stale = null)
        {
            if (!cam || !root || readers.Count == 0)
            {
                Release();
                return;
            }

            EnsureSurfaces(readers.Count, width, height);
            var reusable = Reusable(readers);
            var target = cam.targetTexture;

            for (int r = 0; r < readers.Count; r++)
            {
                // Nothing behind it moved, and it is still holding the surface it was given.
                if (reusable && stale != null && r < stale.Count && !stale[r])
                {
                    readers[r].SetBackdrop(surfaces[r]);
                    continue;
                }

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
                    RenderCount++;
                }
                finally
                {
                    Unhide();
                    cam.targetTexture = target;
                }

                // Bound as we go, so the next reader's render finds this one's result in place.
                readers[r].SetBackdrop(surfaces[r]);
            }

            held.Clear();
            held.AddRange(readers);
        }

        /// <summary>
        /// Whether the surfaces still belong to the readers holding them. They are matched by
        /// position, so a reader appearing, going, or changing places invalidates the lot.
        /// </summary>
        bool Reusable(List<IBackdropReader> readers)
        {
            if (held.Count != readers.Count) return false;
            for (int i = 0; i < held.Count; i++) if (!ReferenceEquals(held[i], readers[i])) return false;
            for (int i = 0; i < surfaces.Count; i++) if (!surfaces[i] || !surfaces[i].IsCreated()) return false;
            return true;
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
                held.Clear();
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
            held.Clear();
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

        [System.NonSerialized] public UGUIContext Context;

        private readonly List<IBackdropReader> readers = new List<IBackdropReader>();
        private readonly List<IBackdropReader> onScreen = new List<IBackdropReader>();
        private readonly List<int> indices = new List<int>();
        private readonly List<bool> stale = new List<bool>();
        private readonly HashSet<IBackdropReader> missed = new HashSet<IBackdropReader>();
        private readonly BackdropPass pass = new BackdropPass();
        private readonly BackdropWatch watch = new BackdropWatch();
        private bool bound;

        /// <summary>Whether a backdrop may be kept between frames. Off renders every reader every
        /// frame, which is what this did before there was anything watching the page. For tests.</summary>
        internal static bool CacheEnabled = true;

        /// <summary>How many backdrops this pass has rendered for the page. For tests.</summary>
        public int RenderCount => pass.RenderCount;

        /// <summary>Something rewrote the pixels a graphic on the page draws, which no rebuild and
        /// no movement would have reported. A filter re-capturing is what raises this.</summary>
        public void NoteRepaint(UnityEngine.UI.Graphic graphic) => watch.NoteRepaint(graphic);

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

            var root = Context.RootCanvas.transform;
            watch.Poll(root, cam);
            watch.IndexReaders(onScreen, indices);

            var frame = new Rect(0, 0, cam.pixelWidth, cam.pixelHeight);

            stale.Clear();
            for (int i = 0; i < onScreen.Count; i++)
            {
                // A reader the frame does not reach is never sampled, so whatever it is holding --
                // an old surface, or none at all -- costs nothing to leave it with. What it does
                // cost is the changes it was not there for, so it is taken again on its way back.
                var rect = watch.ReaderRect(cam, onScreen[i]);
                var seen = rect.Overlaps(frame);

                if (!seen) missed.Add(onScreen[i]);

                stale.Add(!CacheEnabled ||
                    (seen && (missed.Remove(onScreen[i]) || watch.Stale(indices[i], rect))));
            }

            pass.Render(cam, root, onScreen, cam.pixelWidth, cam.pixelHeight, stale);
            bound = true;
        }

        /// <summary>Drops the surfaces and tells every reader it is on its own again.</summary>
        void Clear()
        {
            if (!bound) return;
            bound = false;

            for (int i = 0; i < readers.Count; i++) readers[i]?.SetBackdrop(null);
            pass.Release();
            watch.Reset();
            missed.Clear();
        }

        void OnDisable() => Clear();

        void OnDestroy() => Clear();
    }
}
