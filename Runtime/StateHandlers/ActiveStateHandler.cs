using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.StateHandlers
{
    public class ActiveStateHandler : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            OnStateStart?.Invoke(eventData);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            OnStateEnd?.Invoke(eventData);
        }
    }
}
