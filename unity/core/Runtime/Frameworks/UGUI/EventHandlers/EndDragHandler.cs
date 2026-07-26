using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    public class EndDragHandler : MonoBehaviour, IBeginDragHandler, IEndDragHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        private bool IsDragging;

        public void OnBeginDrag(PointerEventData eventData)
        {
            IsDragging = true;
        }

        public void OnEndDrag(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);

            IsDragging = false;
        }

        private void OnDisable()
        {
            if (IsDragging)
            {
                OnEvent?.Invoke(null);

                IsDragging = false;
            }
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
