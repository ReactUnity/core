using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.StateHandlers
{
    public class HoverStateHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void OnPointerEnter(PointerEventData eventData)
        {
            OnStateStart?.Invoke(eventData);
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            OnStateEnd?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }
    }
}
