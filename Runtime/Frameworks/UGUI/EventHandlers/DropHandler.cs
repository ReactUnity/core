using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    public class DropHandler : MonoBehaviour, IDropHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnDrop(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
