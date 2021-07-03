using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    public class PointerClickHandler : MonoBehaviour, IPointerClickHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnPointerClick(PointerEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
