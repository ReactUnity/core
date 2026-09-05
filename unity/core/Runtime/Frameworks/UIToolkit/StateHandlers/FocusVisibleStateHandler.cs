using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class FocusVisibleStateHandler : MouseManipulator, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        private bool visible = false;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        // Focus that arrived by navigating -- keyboard or gamepad -- carries a direction; a pointer click does not.
        public void OnFocus(FocusEvent eventData)
        {
            if (!(eventData.direction is VisualElementFocusChangeDirection)) return;
            visible = true;
            OnStateStart?.Invoke();
        }

        public void OnBlur(BlurEvent eventData)
        {
            if (!visible) return;
            visible = false;
            OnStateEnd?.Invoke();
        }

        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<FocusEvent>(OnFocus);
            target.RegisterCallback<BlurEvent>(OnBlur);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<FocusEvent>(OnFocus);
            target.UnregisterCallback<BlurEvent>(OnBlur);
        }
    }
}
