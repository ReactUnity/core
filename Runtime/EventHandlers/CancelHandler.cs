using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.EventHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class CancelHandler : MonoBehaviour, ICancelHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnCancel(BaseEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
