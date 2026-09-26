using System.Collections.Generic;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Hit tests a filtered subtree through the composite standing in for it, so a filtered element
    /// stays interactive despite living on an offscreen canvas.
    /// </summary>
    /// <remarks>
    /// The remapping is <see cref="CustomViewportRaycaster"/>'s unchanged -- the shape is the same as
    /// showing a canvas' RenderTexture in a RawImage elsewhere. What has to be added is where the
    /// hits sort: the offscreen canvas is its own root, so the event system will not compare depth
    /// against the canvas the composite sits in, and the raw distances are measured from a camera
    /// a hundred thousand units away. Both are rebased onto the composite below. A filter inside
    /// another is reached through the outer one's capture, and cast by it.
    /// </remarks>
    public class FilterRaycaster : CustomViewportRaycaster
    {
        // Every hit in one canvas is at the same distance, so this only has to beat a tie -- and it
        // is far too small to reach past a canvas that genuinely sits in front.
        const float InFrontOfComposite = 0.001f;

        // How deep filters may nest before the rest are ignored, which only a cycle would reach.
        const int MaxNesting = 32;

        static readonly List<FilterRaycaster> active = new List<FilterRaycaster>();

        /// <summary>The canvas the composite lives in, whose hit priority this one borrows.</summary>
        public Canvas HostCanvas;

        /// <summary>The stand-in graphic, which decides whether a point reaches the subtree at all.</summary>
        public Graphic Composite;

        private Canvas ownCanvas;

        /// <summary>
        /// The filter whose capture this one's composite is drawn into, when one filtered element is
        /// inside another -- null for a composite on the page itself.
        /// </summary>
        FilterRaycaster Outer
        {
            get
            {
                var root = Composite && Composite.canvas ? Composite.canvas.rootCanvas : null;
                var outer = root ? root.GetComponent<FilterRaycaster>() : null;
                return outer != this ? outer : null;
            }
        }

        /// <summary>
        /// The page's camera, for every filter however deeply nested. The event system ranks hits
        /// from two raycasters by their cameras' depth before anything else, and an offscreen
        /// camera outranks the page's, so a nested filter reporting its outer one took every click.
        /// </summary>
        public override Camera eventCamera
        {
            get
            {
                var outer = Outer;
                return outer ? outer.eventCamera : ViewportCamera;
            }
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            active.Add(this);
        }

        protected override void OnDisable()
        {
            active.Remove(this);
            base.OnDisable();
        }

        public override void Raycast(PointerEventData eventData, List<RaycastResult> resultAppendList)
        {
            // A nested filter is cast by the one it is nested in: that is the only place its hits
            // can be put in paint order with the rest of that capture. On their own they tie with
            // every sibling filter, and the event system breaks the tie by raycaster order.
            if (Outer) return;

            var from = resultAppendList.Count;
            Collect(eventData, resultAppendList, 0);
            if (!Composite || resultAppendList.Count == from) return;

            // These came back measured against the offscreen camera, which says nothing about the
            // canvas they have to be sorted against -- and depth, which would say it, is only
            // compared within one root raycaster. Standing them where the composite stands puts the
            // subtree in front of the containers holding it rather than behind them; a `<scroll>`
            // viewport is a raycast target of its own, and was taking every click.
            var host = HostCanvas ? HostCanvas.rootCanvas : null;
            var distance = CompositeDistance(eventData) - InFrontOfComposite;

            // That distance ties with every other filter on the page, so the index -- the event
            // system's last word -- carries the order: the composite painted last first, then the
            // order Collect put its own hits in.
            var painted = Mathf.Clamp(Composite.depth, 0, 0x7FFF);

            for (int i = from; i < resultAppendList.Count; i++)
            {
                var result = resultAppendList[i];
                result.distance = distance;
                result.index = ((0x7FFF - painted) << 16) | Mathf.Min(i - from, 0xFFFF);
                if (host)
                {
                    result.sortingLayer = host.sortingLayerID;
                    result.sortingOrder = host.sortingOrder;
                }
                resultAppendList[i] = result;
            }
        }

        /// <summary>
        /// This capture's hits, frontmost first, with those of every filter nested in it spliced in
        /// where its composite is painted.
        /// </summary>
        void Collect(PointerEventData eventData, List<RaycastResult> into, int level)
        {
            if (level > MaxNesting || !TryCapture(eventData.position, 0, out _)) return;

            var own = new List<RaycastResult>();
            base.Raycast(eventData, own);

            // Depth is what GraphicRaycaster sorts on, so a nested block goes in at its composite's.
            var keyed = new List<(int depth, int seq, RaycastResult hit)>(own.Count);
            for (int i = 0; i < own.Count; i++) keyed.Add((own[i].depth, keyed.Count, own[i]));

            var nested = new List<RaycastResult>();
            for (int i = 0; i < active.Count; i++)
            {
                var inner = active[i];
                if (inner == this || !inner.Composite || inner.Composite.depth < 0 || inner.Outer != this) continue;

                nested.Clear();
                inner.Collect(eventData, nested, level + 1);
                for (int k = 0; k < nested.Count; k++) keyed.Add((inner.Composite.depth, keyed.Count, nested[k]));
            }

            keyed.Sort((a, b) => a.depth != b.depth ? b.depth.CompareTo(a.depth) : a.seq.CompareTo(b.seq));
            for (int i = 0; i < keyed.Count; i++) into.Add(keyed[i].hit);
        }

        protected override bool TryRemap(ref Vector3 eventPosition, Camera eventCamera, Camera targetCamera)
        {
            if (!TryCapture(eventPosition, 0, out var captured)) return false;
            eventPosition = new Vector3(captured.x, captured.y, eventPosition.z);
            return true;
        }

        /// <summary>
        /// Takes a point on the page's screen to the same point in this filter's capture, through
        /// every filter it is nested in. False if the point misses the composite, or something
        /// above it -- an ancestor `pointer-events: none` or `overflow: hidden`, or an outer
        /// filter's own bounds -- keeps it out.
        /// </summary>
        bool TryCapture(Vector2 screen, int level, out Vector2 captured)
        {
            captured = default;
            if (!Composite || level > MaxNesting) return false;

            // The composite sits in the outer filter's capture, so the point has to be put in that
            // capture's terms before it is compared with the composite at all.
            var outer = Outer;
            Camera viewer;
            if (outer)
            {
                if (!outer.TryCapture(screen, level + 1, out screen)) return false;
                viewer = outer.CaptureCamera;
            }
            else viewer = ViewportCamera;

            // Asking the composite runs the ancestor chain the reparent removed.
            if (!Composite.Raycast(screen, viewer)) return false;

            var camera = CaptureCamera;
            captured = GetRemappedScreenPosition(screen, viewer, EventViewport, camera);
            if (!camera) return true;

            var viewport = camera.ScreenToViewportPoint(captured);
            return viewport.x >= 0f && viewport.x <= 1f && viewport.y >= 0f && viewport.y <= 1f;
        }

        Camera CaptureCamera
        {
            get
            {
                if (!ownCanvas) ownCanvas = GetComponent<Canvas>();
                return ownCanvas ? ownCanvas.worldCamera : null;
            }
        }

        /// <summary>Where the composite is, in the terms GraphicRaycaster measures its own hits in.</summary>
        float CompositeDistance(PointerEventData eventData)
        {
            var host = HostCanvas ? HostCanvas.rootCanvas : null;
            if (!host || host.renderMode == RenderMode.ScreenSpaceOverlay || !Composite) return 0f;

            var camera = host.worldCamera ? host.worldCamera : Camera.main;
            if (!camera) return 0f;

            var ray = camera.ScreenPointToRay(eventData.position);
            var plane = Composite.transform;
            var forward = plane.forward;
            var denominator = Vector3.Dot(forward, ray.direction);
            if (Mathf.Approximately(denominator, 0f)) return 0f;

            return Vector3.Dot(forward, plane.position - ray.origin) / denominator;
        }

        bool Aliases => HostCanvas && HostCanvas.renderMode == RenderMode.ScreenSpaceOverlay;

        public override int sortOrderPriority => Aliases ? HostCanvas.sortingOrder : base.sortOrderPriority;

        public override int renderOrderPriority => Aliases ? HostCanvas.rootCanvas.renderOrder : base.renderOrderPriority;
    }
}
