using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class FocusWithinStateHandler : MouseManipulator, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        // FocusIn and FocusOut bubble, so a descendant taking focus reaches the target too.
        public void OnFocusIn(FocusInEvent eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnFocusOut(FocusOutEvent eventData)
        {
            OnStateEnd?.Invoke();
        }

        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<FocusInEvent>(OnFocusIn);
            target.RegisterCallback<FocusOutEvent>(OnFocusOut);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<FocusInEvent>(OnFocusIn);
            target.UnregisterCallback<FocusOutEvent>(OnFocusOut);
        }
    }
}
