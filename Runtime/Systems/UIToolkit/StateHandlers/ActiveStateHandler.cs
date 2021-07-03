using System;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class ActiveStateHandler : MouseManipulator, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnPointerDown(MouseDownEvent eventData)
        {
            OnStateStart?.Invoke(null);
        }

        public void OnPointerUp(MouseUpEvent eventData)
        {
            OnStateEnd?.Invoke(null);
        }


        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<MouseDownEvent>(OnPointerDown);
            target.RegisterCallback<MouseUpEvent>(OnPointerUp);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<MouseDownEvent>(OnPointerDown);
            target.UnregisterCallback<MouseUpEvent>(OnPointerUp);
        }
    }
}
