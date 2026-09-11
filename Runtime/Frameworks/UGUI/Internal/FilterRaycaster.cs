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
    /// a hundred thousand units away. Both are rebased onto the composite below.
    /// </remarks>
    public class FilterRaycaster : CustomViewportRaycaster
    {
        // Every hit in one canvas is at the same distance, so this only has to beat a tie -- and it
        // is far too small to reach past a canvas that genuinely sits in front.
        const float InFrontOfComposite = 0.001f;

        /// <summary>The canvas the composite lives in, whose hit priority this one borrows.</summary>
        public Canvas HostCanvas;

        /// <summary>The stand-in graphic, which decides whether a point reaches the subtree at all.</summary>
        public Graphic Composite;

        public override void Raycast(PointerEventData eventData, List<RaycastResult> resultAppendList)
        {
            // The composite sits where the element was, so whether a point reaches it is exactly
            // whether that point should reach the subtree. Asking it runs the ancestor chain the
            // reparent removed: an ancestor `pointer-events: none`, and an ancestor `overflow:
            // hidden` clipping hits the same way it clips pixels.
            if (Composite && !Composite.Raycast(eventData.position, eventCamera)) return;

            var from = resultAppendList.Count;
            base.Raycast(eventData, resultAppendList);
            if (!Composite || resultAppendList.Count == from) return;

            // These came back measured against the offscreen camera, which says nothing about the
            // canvas they have to be sorted against -- and depth, which would say it, is only
            // compared within one root raycaster. Standing them where the composite stands puts the
            // subtree in front of the containers holding it rather than behind them; a `<scroll>`
            // viewport is a raycast target of its own, and was taking every click.
            var host = HostCanvas ? HostCanvas.rootCanvas : null;
            var distance = CompositeDistance(eventData) - InFrontOfComposite;

            for (int i = from; i < resultAppendList.Count; i++)
            {
                var result = resultAppendList[i];
                result.distance = distance;
                if (host)
                {
                    result.sortingLayer = host.sortingLayerID;
                    result.sortingOrder = host.sortingOrder;
                }
                resultAppendList[i] = result;
            }
        }

        /// <summary>Where the composite is, in the terms GraphicRaycaster measures its own hits in.</summary>
        float CompositeDistance(PointerEventData eventData)
        {
            var host = HostCanvas ? HostCanvas.rootCanvas : null;
            if (!host || host.renderMode == RenderMode.ScreenSpaceOverlay) return 0f;

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
