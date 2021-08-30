using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.StateHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class FocusStateHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnSelect(BaseEventData eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnDeselect(BaseEventData eventData)
        {
            OnStateEnd?.Invoke();
        }
    }
}
