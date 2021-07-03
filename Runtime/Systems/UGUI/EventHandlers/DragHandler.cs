using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    public class DragHandler : MonoBehaviour, IDragHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnDrag(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
