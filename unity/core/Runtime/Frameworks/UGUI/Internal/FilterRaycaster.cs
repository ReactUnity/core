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
    /// showing a canvas' RenderTexture in a RawImage elsewhere. What has to be added is priority:
    /// the offscreen canvas is WorldSpace, and GraphicRaycaster reports int.MinValue for anything
    /// that is not an overlay, so every hit here would lose to the canvas the composite sits in.
    /// </remarks>
    public class FilterRaycaster : CustomViewportRaycaster
    {
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
            base.Raycast(eventData, resultAppendList);
        }

        bool Aliases => HostCanvas && HostCanvas.renderMode == RenderMode.ScreenSpaceOverlay;

        public override int sortOrderPriority => Aliases ? HostCanvas.sortingOrder : base.sortOrderPriority;

        public override int renderOrderPriority => Aliases ? HostCanvas.rootCanvas.renderOrder : base.renderOrderPriority;
    }
}
