using System;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class FocusStateHandler : MouseManipulator, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnSelect(FocusEvent eventData)
        {
            OnStateStart?.Invoke(null);
        }

        public void OnDeselect(BlurEvent eventData)
        {
            OnStateEnd?.Invoke(null);
        }

        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<FocusEvent>(OnSelect);
            target.RegisterCallback<BlurEvent>(OnDeselect);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<FocusEvent>(OnSelect);
            target.UnregisterCallback<BlurEvent>(OnDeselect);
        }
    }
}
