using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.StateHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class FocusVisibleStateHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

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
                OnStateStart?.Invoke();
                hasFocused = true;
            }
        }

        public void OnDeselect(BaseEventData eventData)
        {
            if (hasFocused) OnStateEnd?.Invoke();
        }
    }
}
