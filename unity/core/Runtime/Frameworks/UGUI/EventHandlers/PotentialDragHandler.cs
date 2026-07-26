using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    public class PotentialDragHandler : MonoBehaviour, IInitializePotentialDragHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnInitializePotentialDrag(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
