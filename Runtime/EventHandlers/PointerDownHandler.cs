using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class PointerDownHandler : MonoBehaviour, IPointerDownHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnPointerDown(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
