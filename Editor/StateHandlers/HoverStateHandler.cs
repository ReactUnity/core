using ReactUnity.StateHandlers;
using System;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.StateHandlers
{
    public class HoverStateHandler : MouseManipulator, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnPointerEnter(MouseEnterEvent eventData)
        {
            OnStateStart?.Invoke(null);
        }

        public void OnPointerLeave(MouseLeaveEvent eventData)
        {
            OnStateEnd?.Invoke(null);
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
