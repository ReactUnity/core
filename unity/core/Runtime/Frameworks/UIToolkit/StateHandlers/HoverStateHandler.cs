using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class HoverStateHandler : MouseManipulator, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnPointerEnter(MouseEnterEvent eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnPointerLeave(MouseLeaveEvent eventData)
        {
            OnStateEnd?.Invoke();
        }


        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<MouseEnterEvent>(OnPointerEnter);
            target.RegisterCallback<MouseLeaveEvent>(OnPointerLeave);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<MouseEnterEvent>(OnPointerEnter);
            target.UnregisterCallback<MouseLeaveEvent>(OnPointerLeave);
        }
    }
}
