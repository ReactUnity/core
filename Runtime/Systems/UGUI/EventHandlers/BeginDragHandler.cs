using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    public class BeginDragHandler : MonoBehaviour, IBeginDragHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnBeginDrag(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
