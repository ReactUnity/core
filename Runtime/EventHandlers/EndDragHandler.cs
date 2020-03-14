using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class EndDragHandler : MonoBehaviour, IEndDragHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnEndDrag(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
