using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.StateHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class FocusStateHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnSelect(BaseEventData eventData)
        {
            OnStateStart?.Invoke(eventData);
        }

        public void OnDeselect(BaseEventData eventData)
        {
            OnStateEnd?.Invoke(eventData);
        }
    }
}
