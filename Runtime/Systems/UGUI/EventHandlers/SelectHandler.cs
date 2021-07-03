using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    public class SelectHandler : MonoBehaviour, ISelectHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnSelect(BaseEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
