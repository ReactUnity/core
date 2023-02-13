using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    public class DoubleClickHandler : MonoBehaviour, IPointerClickHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnPointerClick(PointerEventData eventData)
        {
            if (eventData.clickCount == 2)
                OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
