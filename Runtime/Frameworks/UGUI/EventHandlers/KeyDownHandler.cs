using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
using UnityEngine.InputSystem;
#endif

namespace ReactUnity.UGUI.EventHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class KeyDownHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        private bool selected = false;

#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
        private InputAction action;

        private void OnEnable()
        {
            if (action == null)
            {
                action = new InputAction(binding: "/*/<button>");
                action.performed += (ctx) =>
                {
                    if (selected) OnEvent(new KeyEventData(EventSystem.current, ctx));
                };
            }
            action.Enable();
        }

        private void OnDisable()
        {
            action?.Disable();
        }
#else
        private void Update()
        {
            if (selected && Input.anyKeyDown)
            {
                OnEvent(new KeyEventData(EventSystem.current));
            }
        }
#endif

        public void OnSelect(BaseEventData eventData)
        {
            selected = true;
        }

        public void OnDeselect(BaseEventData eventData)
        {
            selected = false;
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }

    public class KeyEventData : BaseEventData
    {
        public string key;
        public Type input;
        public bool inputSystem;

#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
        public InputAction.CallbackContext ctx;

        public KeyEventData(EventSystem eventSystem, InputAction.CallbackContext ctx) : base(eventSystem)
        {
            this.inputSystem = true;
            this.ctx = ctx;
            key = ctx.control.name;
        }
#endif

        public KeyEventData(EventSystem eventSystem, bool inputSystem = false) : base(eventSystem)
        {
            this.inputSystem = inputSystem;

            if (!inputSystem)
            {
                input = typeof(Input);
                key = Input.inputString;
            }
        }
    }
}
