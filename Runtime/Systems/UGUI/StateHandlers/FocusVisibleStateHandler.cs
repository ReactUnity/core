using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.StateHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class FocusVisibleStateHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        private bool hasFocused = false;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnSelect(BaseEventData eventData)
        {
            if (eventData == null || eventData is AxisEventData)
            {
                OnStateStart?.Invoke(eventData);
                hasFocused = true;
            }
        }

        public void OnDeselect(BaseEventData eventData)
        {
            if (hasFocused) OnStateEnd?.Invoke(eventData);
        }
    }
}
