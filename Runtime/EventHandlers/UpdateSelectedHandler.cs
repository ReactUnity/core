using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class UpdateSelectedHandler : MonoBehaviour, IUpdateSelectedHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnUpdateSelected(BaseEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
