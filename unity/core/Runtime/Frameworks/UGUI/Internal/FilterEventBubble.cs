using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Carries on bubbling an event that reached the top of a filtered subtree, from where the
    /// element used to be.
    /// </summary>
    /// <remarks>
    /// The event system finds a handler by walking up from whatever was hit, and a filtered subtree
    /// hangs off its own offscreen canvas -- so the walk stops here instead of reaching the ancestors
    /// the reparent took away. Scrolling and dragging are what that loses: a wheel over a filtered
    /// card would not scroll the page it is on. This sits at the top of the subtree, so it is only
    /// ever reached when nothing inside handled the event first.
    /// </remarks>
    public class FilterEventBubble : MonoBehaviour,
        IScrollHandler, IInitializePotentialDragHandler, IBeginDragHandler, IDragHandler, IEndDragHandler, IDropHandler,
        IPointerDownHandler, IPointerUpHandler, IPointerClickHandler
    {
        /// <summary>The stand-in graphic, whose ancestors are the ones the subtree lost.</summary>
        public Graphic Composite;

        void Bubble<T>(BaseEventData eventData, ExecuteEvents.EventFunction<T> handler) where T : IEventSystemHandler
        {
            if (Composite) ExecuteEvents.ExecuteHierarchy(Composite.gameObject, eventData, handler);
        }

        public void OnScroll(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.scrollHandler);
        public void OnInitializePotentialDrag(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.initializePotentialDrag);
        public void OnBeginDrag(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.beginDragHandler);
        public void OnDrag(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.dragHandler);
        public void OnEndDrag(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.endDragHandler);
        public void OnDrop(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.dropHandler);
        public void OnPointerDown(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.pointerDownHandler);
        public void OnPointerUp(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.pointerUpHandler);
        public void OnPointerClick(PointerEventData eventData) => Bubble(eventData, ExecuteEvents.pointerClickHandler);
    }
}
