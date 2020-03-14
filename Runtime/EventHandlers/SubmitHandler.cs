using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class SubmitHandler : MonoBehaviour, ISubmitHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnSubmit(BaseEventData eventData)
        {
            OnEvent?.Invoke(eventData);
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
