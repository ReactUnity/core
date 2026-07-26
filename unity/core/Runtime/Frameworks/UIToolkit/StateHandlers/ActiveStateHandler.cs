using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit.StateHandlers
{
    public class ActiveStateHandler : MouseManipulator, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        public void OnPointerDown(MouseDownEvent eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnPointerUp(MouseUpEvent eventData)
        {
            OnStateEnd?.Invoke();
        }


        protected override void RegisterCallbacksOnTarget()
        {
            target.RegisterCallback<MouseDownEvent>(OnPointerDown,
                    target is Button ? TrickleDown.TrickleDown : TrickleDown.NoTrickleDown);
            target.RegisterCallback<MouseUpEvent>(OnPointerUp);
        }

        protected override void UnregisterCallbacksFromTarget()
        {
            target.UnregisterCallback<MouseDownEvent>(OnPointerDown,
                    target is Button ? TrickleDown.TrickleDown : TrickleDown.NoTrickleDown);
            target.UnregisterCallback<MouseUpEvent>(OnPointerUp);
        }
    }
}
