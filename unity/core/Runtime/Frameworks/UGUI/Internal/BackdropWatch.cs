using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// What the camera has drawn differently since the last time it was asked, and where on screen.
    /// The on-screen pass reads this to keep the backdrops nothing can have moved behind.
    /// </summary>
    /// <remarks>
    /// Deliberately not <c>Transform.hasChanged</c>: that flag is a single bit, and
    /// <see cref="ElementFilter"/> and <see cref="BackgroundClip"/> already consume it for their own
    /// subtrees -- whichever polled first would take the change and leave the others blind. World
    /// matrices are kept instead, which nothing else can clear out from under this, and which show a
    /// parent moving in every descendant of it that draws.
    ///
    /// Where is as important as whether. A page usually has one thing animating in one corner of it,
    /// and a reader elsewhere reads none of it, so every change is carried with the rect it happened
    /// in and each reader is asked about its own. What that assumes is that a graphic draws inside
    /// its own rect, which is what the layout is built on.
    ///
    /// The canvas is only part of a backdrop: the camera draws the scene behind the page as well,
    /// and nothing here can tell when a skinned mesh deformed or a particle moved. So geometry
    /// outside the canvas is not watched but located, and a reader with any of it behind it is never
    /// held.
    /// </remarks>
    public class BackdropWatch
    {
        /// <summary>Before anything: no reader may keep what it was given.</summary>
        public const int All = -1;

        /// <summary>After everything: nothing a reader could see has changed.</summary>
        public const int None = int.MaxValue;

        // Past this the scene is not worth locating -- the scan would cost more than the renders it
        // could save, and a scene that big rarely holds still. Everything counts as behind instead.
        const int MaxSceneRenderers = 256;

        // And past this the page is changing too widely for the rects to be worth carrying: they are
        // given up for the earliest index among them, which holds back everything painted after it.
        const int MaxMovedRects = 64;

        private readonly List<Graphic> painted = new List<Graphic>();
        private readonly List<Graphic> registered = new List<Graphic>();
        private readonly List<Matrix4x4> placed = new List<Matrix4x4>();
        private readonly List<Rect> bounds = new List<Rect>();
        private readonly List<bool> drawn = new List<bool>();

        private readonly List<CanvasGroup> fading = new List<CanvasGroup>();
        private readonly List<CanvasGroup> groups = new List<CanvasGroup>();
        private readonly List<float> alphas = new List<float>();

        private readonly Dictionary<Graphic, UnityAction> notices = new Dictionary<Graphic, UnityAction>();
        private readonly Dictionary<Graphic, int> order = new Dictionary<Graphic, int>();
        private readonly HashSet<Graphic> rebuilt = new HashSet<Graphic>();
        private readonly List<Graphic> buffer = new List<Graphic>();

        private readonly List<Rect> moved = new List<Rect>();
        private readonly List<int> movedAt = new List<int>();
        private readonly List<Rect> scenery = new List<Rect>();

        private readonly Plane[] frustum = new Plane[6];

        private Matrix4x4 framing;
        private Matrix4x4 viewProjection;
        private Vector2 viewport;
        private int coarse = All;

        /// <summary>
        /// Works out what the camera will draw differently this frame. Ask <see cref="Stale"/> about
        /// each reader afterwards.
        /// </summary>
        public void Poll(Transform root, Camera cam)
        {
            viewProjection = cam.projectionMatrix * cam.worldToCameraMatrix;
            viewport = new Vector2(cam.pixelWidth, cam.pixelHeight);

            moved.Clear();
            movedAt.Clear();
            coarse = None;

            // A backdrop is read in screen uv, so a camera that moved or reframed holds a different
            // part of the world at the same uv however still the page itself was.
            var reframed = !viewProjection.Equals(framing);
            framing = viewProjection;

            // Inactive left out on purpose: a page hiding something is then a different list, which
            // is the one change no amount of watching the graphic itself would have caught.
            root.GetComponentsInChildren(false, painted);

            var resettled = !Matches(painted, registered);
            if (resettled) Reregister();
            if (resettled || reframed) coarse = All;

            if (!resettled)
            {
                for (int i = 0; i < painted.Count; i++)
                {
                    var model = painted[i].transform.localToWorldMatrix;
                    var local = painted[i].rectTransform.rect;
                    var on = painted[i].isActiveAndEnabled;
                    if (drawn[i] == on && placed[i].Equals(model) && bounds[i] == local) continue;

                    // Both where it was and where it is: leaving somewhere changes that place too.
                    Note(i, ScreenRect(placed[i], bounds[i]));
                    Note(i, ScreenRect(model, local));

                    placed[i] = model;
                    bounds[i] = local;
                    drawn[i] = on;
                }

                // Geometry, colour and material move no rect, so they are reported rather than seen.
                // A filter re-capturing arrives the same way, through NoteRepaint.
                buffer.Clear();
                buffer.AddRange(rebuilt);

                for (int i = 0; i < buffer.Count; i++)
                {
                    if (!order.TryGetValue(buffer[i], out var at)) continue;
                    Note(at, ScreenRect(placed[at], bounds[at]));
                }
            }

            rebuilt.Clear();
            PollFades(root, resettled);
            LocateScenery(cam);
        }

        /// <summary>
        /// Whether anything painted before <paramref name="index"/> has changed under
        /// <paramref name="rect"/>, which is the whole of what that reader reads.
        /// </summary>
        public bool Stale(int index, Rect rect)
        {
            if (coarse < index) return true;

            for (int i = 0; i < scenery.Count; i++)
                if (scenery[i].Overlaps(rect)) return true;

            for (int i = 0; i < moved.Count; i++)
                if (movedAt[i] < index && moved[i].Overlaps(rect)) return true;

            return false;
        }

        /// <summary>Where each reader sits in the page's paint order, in one pass. A reader the page
        /// does not account for is treated as painted last, so nothing holds it.</summary>
        public void IndexReaders(List<IBackdropReader> readers, List<int> into)
        {
            into.Clear();
            for (int r = 0; r < readers.Count; r++) into.Add(None);

            for (int i = 0; i < painted.Count; i++)
            {
                var cr = painted[i].canvasRenderer;
                for (int r = 0; r < readers.Count; r++)
                {
                    if (into[r] != None || !ReferenceEquals(readers[r].BackdropRenderer, cr)) continue;
                    into[r] = i;
                    break;
                }
            }
        }

        /// <summary>
        /// What the reader reads, on screen: its own rect, and the blur's reach past it. A reader
        /// with no rect of its own is given the whole screen, which holds it back from everything.
        /// </summary>
        public Rect ReaderRect(Camera cam, IBackdropReader reader)
        {
            var rt = reader.BackdropRenderer ? reader.BackdropRenderer.transform as RectTransform : null;
            if (!rt) return new Rect(0, 0, cam.pixelWidth, cam.pixelHeight);

            var rect = ScreenRect(rt.localToWorldMatrix, rt.rect);

            // A blur reads outside the element it is drawn in -- four steps of the kernel, strided
            // in screen pixels -- so this is the whole of what the element can sample.
            var bleed = reader.BackdropBleed;
            if (bleed <= 0) return rect;

            return Rect.MinMaxRect(rect.xMin - bleed, rect.yMin - bleed, rect.xMax + bleed, rect.yMax + bleed);
        }

        /// <summary>Something rewrote the pixels of a texture this graphic draws, which neither a
        /// rebuild nor a move would have reported.</summary>
        public void NoteRepaint(Graphic graphic)
        {
            if (graphic) rebuilt.Add(graphic);
        }

        /// <summary>Forgets the page. Everything is stale until it has been walked again.</summary>
        public void Reset()
        {
            Unregister();
            registered.Clear();
            notices.Clear();
            order.Clear();
            rebuilt.Clear();
            painted.Clear();
            placed.Clear();
            bounds.Clear();
            drawn.Clear();
            groups.Clear();
            alphas.Clear();
            moved.Clear();
            movedAt.Clear();
            scenery.Clear();
            framing = default;
            coarse = All;
        }

        /// <summary>Carries a change at <paramref name="index"/> with the rect it happened in, or
        /// gives up on rects once there are more of them than they are worth.</summary>
        void Note(int index, Rect rect)
        {
            if (moved.Count >= MaxMovedRects)
            {
                if (index < coarse) coarse = index;
                return;
            }

            moved.Add(rect);
            movedAt.Add(index);
        }

        /// <summary>Opacity is a <c>CanvasGroup</c>, which moves no rect and dirties no graphic, so
        /// it is the one change the walk above cannot see.</summary>
        void PollFades(Transform root, bool snapshotOnly)
        {
            root.GetComponentsInChildren(false, fading);

            if (!Matches(fading, groups))
            {
                groups.Clear();
                groups.AddRange(fading);
                alphas.Clear();
                for (int i = 0; i < groups.Count; i++) alphas.Add(groups[i].alpha);
                coarse = All;
                return;
            }

            for (int i = 0; i < groups.Count; i++)
            {
                if (alphas[i] == groups[i].alpha) continue;
                alphas[i] = groups[i].alpha;
                if (snapshotOnly) continue;

                // A group fades a whole subtree, so everything under it changed where it stands.
                for (int k = 0; k < painted.Count; k++)
                {
                    if (!painted[k].transform.IsChildOf(groups[i].transform)) continue;
                    Note(k, ScreenRect(placed[k], bounds[k]));
                }
            }
        }

        /// <summary>Where on screen the camera draws something that is not this canvas.</summary>
        void LocateScenery(Camera cam)
        {
            scenery.Clear();

            var found = Object.FindObjectsByType<Renderer>(FindObjectsInactive.Exclude, FindObjectsSortMode.None);
            if (found.Length == 0) return;

            if (found.Length > MaxSceneRenderers)
            {
                scenery.Add(new Rect(0, 0, viewport.x, viewport.y));
                return;
            }

            GeometryUtility.CalculateFrustumPlanes(cam, frustum);

            for (int i = 0; i < found.Length; i++)
            {
                var r = found[i];
                if (!r.enabled || (cam.cullingMask & (1 << r.gameObject.layer)) == 0) continue;
                if (!GeometryUtility.TestPlanesAABB(frustum, r.bounds)) continue;

                scenery.Add(ScreenRect(r.bounds));
            }
        }

        /// <summary>A rect in an object's own space, as the camera sees it.</summary>
        Rect ScreenRect(Matrix4x4 model, Rect local)
        {
            var m = viewProjection * model;
            var min = new Vector2(float.MaxValue, float.MaxValue);
            var max = new Vector2(float.MinValue, float.MinValue);

            for (int i = 0; i < 4; i++)
            {
                var corner = new Vector4(
                    (i & 1) == 0 ? local.xMin : local.xMax,
                    (i & 2) == 0 ? local.yMin : local.yMax, 0, 1);

                var clip = m * corner;
                if (clip.w <= 0) return new Rect(0, 0, viewport.x, viewport.y);

                var s = new Vector2(
                    (clip.x / clip.w * 0.5f + 0.5f) * viewport.x,
                    (clip.y / clip.w * 0.5f + 0.5f) * viewport.y);

                min = Vector2.Min(min, s);
                max = Vector2.Max(max, s);
            }

            return Rect.MinMaxRect(min.x, min.y, max.x, max.y);
        }

        /// <summary>World bounds as the camera sees them. Anything crossing the near plane is taken
        /// to cover the screen rather than projected through it.</summary>
        Rect ScreenRect(Bounds world)
        {
            var min = new Vector2(float.MaxValue, float.MaxValue);
            var max = new Vector2(float.MinValue, float.MinValue);

            for (int i = 0; i < 8; i++)
            {
                var corner = world.center + Vector3.Scale(world.extents,
                    new Vector3((i & 1) == 0 ? -1 : 1, (i & 2) == 0 ? -1 : 1, (i & 4) == 0 ? -1 : 1));

                var clip = viewProjection * new Vector4(corner.x, corner.y, corner.z, 1);
                if (clip.w <= 0) return new Rect(0, 0, viewport.x, viewport.y);

                var s = new Vector2(
                    (clip.x / clip.w * 0.5f + 0.5f) * viewport.x,
                    (clip.y / clip.w * 0.5f + 0.5f) * viewport.y);

                min = Vector2.Min(min, s);
                max = Vector2.Max(max, s);
            }

            return Rect.MinMaxRect(min.x, min.y, max.x, max.y);
        }

        void Reregister()
        {
            Unregister();

            registered.Clear();
            registered.AddRange(painted);
            placed.Clear();
            bounds.Clear();
            drawn.Clear();
            order.Clear();

            for (int i = 0; i < registered.Count; i++)
            {
                var g = registered[i];

                // Kept between registrations, so that a page rebuilding its list every frame is not
                // also allocating a delegate per graphic every frame.
                if (!notices.TryGetValue(g, out var notice))
                {
                    var self = g;
                    notice = () => rebuilt.Add(self);
                    notices[g] = notice;
                }

                g.RegisterDirtyVerticesCallback(notice);
                g.RegisterDirtyMaterialCallback(notice);
                order[g] = i;

                placed.Add(g.transform.localToWorldMatrix);
                bounds.Add(g.rectTransform.rect);
                drawn.Add(g.isActiveAndEnabled);
            }

            Forget();
        }

        /// <summary>Drops the delegates of graphics the page no longer has, which are the only thing
        /// keeping them alive.</summary>
        void Forget()
        {
            buffer.Clear();
            foreach (var known in notices)
                if (!order.ContainsKey(known.Key)) buffer.Add(known.Key);

            for (int i = 0; i < buffer.Count; i++) notices.Remove(buffer[i]);
            buffer.Clear();
        }

        void Unregister()
        {
            for (int i = 0; i < registered.Count; i++)
            {
                var g = registered[i];
                if (!g || !notices.TryGetValue(g, out var notice)) continue;
                g.UnregisterDirtyVerticesCallback(notice);
                g.UnregisterDirtyMaterialCallback(notice);
            }
        }

        static bool Matches<T>(List<T> a, List<T> b) where T : class
        {
            if (a.Count != b.Count) return false;
            for (int i = 0; i < a.Count; i++) if (!ReferenceEquals(a[i], b[i])) return false;
            return true;
        }
    }
}
