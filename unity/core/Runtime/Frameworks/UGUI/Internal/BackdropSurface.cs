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
    /// rebuild, which is far more than the render; see <see cref="HideFrom"/>.
    ///
    /// Where the pipeline registers an <see cref="IBackdropGrabber"/> (URP 17 does), <see cref="Grab"/>
    /// replaces all of that with a copy per reader from inside the camera's own render.
    /// </remarks>
    public class BackdropPass
    {
        private readonly List<RenderTexture> surfaces = new List<RenderTexture>();
        // The canvas in paint order, and where the hidden tail of it starts.
        private readonly List<CanvasRenderer> tail = new List<CanvasRenderer>();
        private readonly List<float> alphas = new List<float>();
        private int hiddenFrom;
        private readonly List<IBackdropReader> held = new List<IBackdropReader>();
        // Which reader's surface each reader was handed, which is its own unless it shares one.
        private readonly List<int> sources = new List<int>();
        private readonly List<UnityEngine.UI.Graphic> order = new List<UnityEngine.UI.Graphic>();

        // The grab path: every graphic's slice, and the camera the grabber is drawing for.
        private readonly Dictionary<CanvasRenderer, BackdropSlice> slices = new Dictionary<CanvasRenderer, BackdropSlice>();
        private readonly Dictionary<CanvasRenderer, int> readerAt = new Dictionary<CanvasRenderer, int>();
        private readonly List<CanvasRenderer> gone = new List<CanvasRenderer>();
        private readonly HashSet<BackdropSlice> visited = new HashSet<BackdropSlice>();
        private readonly List<BackdropSlice> masks = new List<BackdropSlice>();
        // What the last walk saw, so an unchanged canvas is not walked again.
        private readonly List<CanvasRenderer> walked = new List<CanvasRenderer>();
        private readonly List<CanvasRenderer> walkedReaders = new List<CanvasRenderer>();
        private readonly List<CanvasRenderer> bare = new List<CanvasRenderer>();
        private readonly List<CanvasRenderer> skipped = new List<CanvasRenderer>();
        private Camera grabCamera;

        /// <summary>A subtree the grab walk leaves out: the element pool, which is inactive and never drawn,
        /// and whose elements are reparented on their way back -- which changes the walk anyway.</summary>
        public Transform Skip;
        private int purgeCountdown;

        /// <summary>Off gives every reader a render of its own. For tests.</summary>
        internal static bool SharingEnabled = true;

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
            StopGrab();

            if (!cam || !root || readers.Count == 0)
            {
                Release();
                return;
            }

            EnsureSurfaces(readers.Count, width, height);
            var reusable = Reusable(readers);
            var target = cam.targetTexture;
            if (!reusable) sources.Clear();
            while (sources.Count < readers.Count) sources.Add(sources.Count);

            order.Clear();
            tail.Clear();
            hiddenFrom = 0;
            var shareFrom = -1;

            // Nothing may leave the page hidden: a throw anywhere in here would take the whole UI
            // off the screen and leave it off.
            try
            {
                for (int r = 0; r < readers.Count; r++)
                {
                    // Nothing behind it moved, and it is still holding the surface it was given.
                    if (reusable && stale != null && r < stale.Count && !stale[r])
                    {
                        readers[r].SetBackdrop(surfaces[sources[r]]);
                        continue;
                    }

                    // A surface taken earlier this call is this reader's backdrop too, where nothing
                    // painted between the two readers lands on what this one reads.
                    if (shareFrom >= 0 && SharingEnabled && !PaintedBetween(cam, root, readers[shareFrom], readers[r], width, height))
                    {
                        sources[r] = shareFrom;
                        readers[r].SetBackdrop(surfaces[shareFrom]);
                        continue;
                    }

                    if (!HideFrom(readers[r].BackdropRenderer, root))
                    {
                        readers[r].SetBackdrop(null);
                        continue;
                    }

                    OffscreenRender.Begin();
                    try
                    {
                        cam.targetTexture = surfaces[r];
                        cam.Render();
                        RenderCount++;
                    }
                    finally
                    {
                        OffscreenRender.End();
                        cam.targetTexture = target;
                    }

                    // Bound as we go, so the next reader's render finds this one's result in place.
                    sources[r] = r;
                    shareFrom = r;
                    readers[r].SetBackdrop(surfaces[r]);
                }
            }
            finally
            {
                Reveal(tail.Count);
            }
            order.Clear();
            held.Clear();
            held.AddRange(readers);
        }

        /// <summary>
        /// Serves every reader from a copy taken inside <paramref name="cam"/>'s own render, which is
        /// what a GrabPass does -- so nothing is rendered again, and nothing has to be watched to avoid
        /// it. False where the pipeline has no grabber, and the readers were not touched.
        /// </summary>
        public bool Grab(Camera cam, Transform root, List<IBackdropReader> readers, int width, int height)
        {
            var grabber = BackdropGrab.Enabled ? BackdropGrab.Grabber : null;
            if (grabber == null || !cam || !root || readers.Count == 0 || !grabber.CanGrab(this, cam))
            {
                StopGrab();
                return false;
            }
            if (grabCamera && grabCamera != cam) StopGrab();

            EnsureSurfaces(readers.Count, width, height);
            AssignSlices(root, readers);
            grabber.Schedule(this, cam, root.gameObject.layer, surfaces, readers.Count);
            grabCamera = cam;

            for (int r = 0; r < readers.Count; r++)
                readers[r].SetBackdrop(readers[r].BackdropRenderer && readerAt.ContainsKey(readers[r].BackdropRenderer) ? surfaces[r] : null);

            held.Clear();
            held.AddRange(readers);
            return true;
        }

        /// <summary>Hands the canvas back to the camera and every material back to its graphic.</summary>
        public void StopGrab()
        {
            if (grabCamera || slices.Count > 0) BackdropGrab.Grabber?.Cancel(this, grabCamera);
            grabCamera = null;

            foreach (var s in slices.Values) if (s) s.Slice = -1;
            slices.Clear();
            walked.Clear();
        }

        /// <summary>
        /// Puts every graphic under <paramref name="root"/> in the slice of the last reader painted at or
        /// before it: reader <c>r</c> starts slice <c>r + 1</c>, so it reads the copy of slice <c>r</c>.
        /// </summary>
        void AssignSlices(Transform root, List<IBackdropReader> readers)
        {
            // A reader outside the canvas gets no slice; its surface is copied and left unread.
            readerAt.Clear();
            for (int r = 0; r < readers.Count; r++)
            {
                var cr = readers[r].BackdropRenderer;
                if (cr && cr.transform.IsChildOf(root) && !readerAt.ContainsKey(cr)) readerAt.Add(cr, r);
            }

            if (--purgeCountdown <= 0)
            {
                purgeCountdown = 300;
                QueueVariants.Purge();
            }

            tail.Clear();
            root.GetComponentsInChildren(true, tail);
            DropPooled();
            if (Unchanged(readers))
            {
                tail.Clear();
                return;
            }
            BackdropSlice.Stale = false;
            visited.Clear();
            bare.Clear();

            var slice = 0;
            masks.Clear();
            for (int i = 0; i < tail.Count; i++)
            {
                var cr = tail[i];
                while (masks.Count > 0 && !cr.transform.IsChildOf(masks[masks.Count - 1].transform)) PopMask(slice);
                if (readerAt.TryGetValue(cr, out var r)) slice = Mathf.Max(slice, r + 1);

                if (!slices.TryGetValue(cr, out var s))
                {
                    if (!cr.TryGetComponent(out s) && cr.TryGetComponent<UnityEngine.UI.Graphic>(out _))
                        s = cr.gameObject.AddComponent<BackdropSlice>();
                    slices[cr] = s;
                }
                if (!s)
                {
                    bare.Add(cr);
                    continue;
                }

                var isMask = cr.TryGetComponent<UnityEngine.UI.Mask>(out _);
                if (isMask && !s.AfterMask) s = Readd(cr, s);

                s.Slice = slice;
                visited.Add(s);
                if (isMask) masks.Add(s);
                else s.PopSlice = -1;
            }
            while (masks.Count > 0) PopMask(slice);

            walked.Clear();
            walked.AddRange(tail);
            walkedReaders.Clear();
            for (int r = 0; r < readers.Count; r++) walkedReaders.Add(readers[r].BackdropRenderer);
            tail.Clear();

            // A graphic that left the canvas -- into a filter's capture, usually -- is drawn by a camera
            // of its own again, and gets its own material back.
            gone.Clear();
            foreach (var pair in slices)
            {
                if (!pair.Key) gone.Add(pair.Key);
                else if (pair.Value && !visited.Contains(pair.Value)) { pair.Value.Slice = -1; gone.Add(pair.Key); }
            }
            for (int i = 0; i < gone.Count; i++) slices.Remove(gone[i]);
        }

        /// <summary>
        /// Whether the walk would come out as it did last time: the same renderers in the same order, the
        /// same readers, no graphic arrived on a bare renderer, and no mask appeared on a sliced one.
        /// </summary>
        bool Unchanged(List<IBackdropReader> readers)
        {
            if (BackdropSlice.Stale || walked.Count != tail.Count || walkedReaders.Count != readers.Count) return false;
            for (int i = 0; i < tail.Count; i++) if (!ReferenceEquals(walked[i], tail[i])) return false;
            for (int r = 0; r < readers.Count; r++) if (!ReferenceEquals(walkedReaders[r], readers[r].BackdropRenderer)) return false;

            for (int i = 0; i < bare.Count; i++)
            {
                if (!bare[i] || !bare[i].TryGetComponent<UnityEngine.UI.Graphic>(out _)) continue;
                slices.Remove(bare[i]);
                return false;
            }
            return true;
        }

        // A subtree is one run of a depth-first walk, so it comes out in one piece.
        void DropPooled()
        {
            if (!Skip) return;
            skipped.Clear();
            Skip.GetComponentsInChildren(true, skipped);
            var n = skipped.Count;

            var from = n > 0 ? tail.IndexOf(skipped[0]) : -1;
            if (from >= 0 && from + n <= tail.Count && ReferenceEquals(tail[from + n - 1], skipped[n - 1])) tail.RemoveRange(from, n);
            skipped.Clear();
        }

        BackdropSlice Readd(CanvasRenderer cr, BackdropSlice old)
        {
            old.Slice = -1;
            // Immediately, since the component disallows a second copy.
            Object.DestroyImmediate(old);
            var s = cr.gameObject.AddComponent<BackdropSlice>();
            slices[cr] = s;
            return s;
        }

        // Slices only grow along the paint order, so a mask's subtree ends in the slice in effect when
        // the walk leaves it.
        void PopMask(int slice)
        {
            var mask = masks[masks.Count - 1];
            masks.RemoveAt(masks.Count - 1);
            mask.PopSlice = mask.Slice >= 0 ? slice : -1;
        }

        /// <summary>
        /// Whether anything painted from <paramref name="from"/> up to <paramref name="to"/> lands on
        /// what <paramref name="to"/> reads -- which is all that separates the two readers' backdrops.
        /// Assumes a graphic draws inside its own rect, as <see cref="BackdropWatch"/> does.
        /// </summary>
        bool PaintedBetween(Camera cam, Transform root, IBackdropReader from, IBackdropReader to, int width, int height)
        {
            if (order.Count == 0) root.GetComponentsInChildren(false, order);

            int start = -1, end = -1;
            for (int i = 0; i < order.Count && end < 0; i++)
            {
                var cr = order[i].canvasRenderer;
                if (start < 0 && ReferenceEquals(cr, from.BackdropRenderer)) start = i;
                else if (start >= 0 && ReferenceEquals(cr, to.BackdropRenderer)) end = i;
            }
            if (start < 0 || end < 0) return true;

            var viewProjection = cam.projectionMatrix * cam.worldToCameraMatrix;
            var viewport = new Vector2(width, height);
            var reads = ScreenRect(viewProjection, viewport, order[end].rectTransform);
            var bleed = to.BackdropBleed;
            if (bleed > 0) reads = Rect.MinMaxRect(reads.xMin - bleed, reads.yMin - bleed, reads.xMax + bleed, reads.yMax + bleed);

            for (int i = start; i < end; i++)
            {
                var g = order[i];
                if (!g.enabled) continue;
                // A stencil-only mask graphic, which a reader's own clip usually is, draws no colour.
                if (g.TryGetComponent<UnityEngine.UI.Mask>(out var mask) && mask.MaskEnabled() && !mask.showMaskGraphic) continue;
                if (ScreenRect(viewProjection, viewport, g.rectTransform).Overlaps(reads)) return true;
            }

            return false;
        }

        static Rect ScreenRect(Matrix4x4 viewProjection, Vector2 viewport, RectTransform rt)
        {
            var m = viewProjection * rt.localToWorldMatrix;
            var local = rt.rect;
            var min = new Vector2(float.MaxValue, float.MaxValue);
            var max = new Vector2(float.MinValue, float.MinValue);

            for (int i = 0; i < 4; i++)
            {
                var clip = m * new Vector4((i & 1) == 0 ? local.xMin : local.xMax, (i & 2) == 0 ? local.yMin : local.yMax, 0, 1);
                if (clip.w <= 0) return new Rect(0, 0, viewport.x, viewport.y);

                var s = new Vector2((clip.x / clip.w * 0.5f + 0.5f) * viewport.x, (clip.y / clip.w * 0.5f + 0.5f) * viewport.y);
                min = Vector2.Min(min, s);
                max = Vector2.Max(max, s);
            }

            return Rect.MinMaxRect(min.x, min.y, max.x, max.y);
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
        /// Takes everything painted at or after <paramref name="reader"/> out of the frame, and puts
        /// back whatever an earlier reader had taken out before it. False if the reader is not under
        /// this canvas, and nothing was touched.
        /// </summary>
        /// <remarks>
        /// Readers come in paint order, so what is hidden is always a tail of the canvas's depth-first
        /// walk, and each reader only moves where that tail starts -- one pass over the canvas for the
        /// lot rather than one per reader.
        ///
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
        bool HideFrom(CanvasRenderer reader, Transform root)
        {
            if (!reader || reader.transform == root || !reader.transform.IsChildOf(root)) return false;

            if (tail.Count == 0)
            {
                root.GetComponentsInChildren(true, tail);
                alphas.Clear();
                for (int i = 0; i < tail.Count; i++) alphas.Add(1f);
                hiddenFrom = tail.Count;
            }

            var from = tail.IndexOf(reader);
            if (from < 0) return false;

            if (from > hiddenFrom) Reveal(from);

            for (int i = from; i < hiddenFrom; i++)
            {
                if (!tail[i]) continue;
                alphas[i] = tail[i].GetAlpha();
                tail[i].SetAlpha(0);
            }
            hiddenFrom = from;

            return true;
        }

        /// <summary>Puts back what is hidden before <paramref name="upTo"/>.</summary>
        void Reveal(int upTo)
        {
            for (int i = hiddenFrom; i < upTo && i < tail.Count; i++) if (tail[i]) tail[i].SetAlpha(alphas[i]);
            hiddenFrom = Mathf.Max(hiddenFrom, Mathf.Min(upTo, tail.Count));
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
            StopGrab();
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
            pass.Skip = Context.PoolRoot;

            // A grab costs a copy per reader, so there is nothing to save by watching the page.
            if (pass.Grab(cam, root, onScreen, cam.pixelWidth, cam.pixelHeight))
            {
                watch.Reset();
                missed.Clear();
                bound = true;
                return;
            }

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
