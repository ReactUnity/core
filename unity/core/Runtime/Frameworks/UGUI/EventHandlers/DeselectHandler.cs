using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    public class DeselectHandler : MonoBehaviour, IDeselectHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnDeselect(BaseEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
