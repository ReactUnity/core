using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class PointerExitHandler : MonoBehaviour, IPointerExitHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnPointerExit(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
