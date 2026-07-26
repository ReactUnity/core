using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Discrete)]
    [RequireComponent(typeof(Selectable))]
    public class MoveHandler : MonoBehaviour, IMoveHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnMove(AxisEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
