using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class FocusStateHandler : MouseManipulator, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnSelect(FocusEvent eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnDeselect(BlurEvent eventData)
        {
            OnStateEnd?.Invoke();
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
