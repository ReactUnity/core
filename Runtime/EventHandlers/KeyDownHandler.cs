using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.EventHandlers
{
    [RequireComponent(typeof(Selectable))]
    public class KeyDownHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        private bool selected = false;

        public void ClearListeners()
        {
            OnEvent = null;
        }

        private void Update()
        {
            if (selected && Input.anyKeyDown)
            {
                OnEvent(new KeyEventData(EventSystem.current));
            }
        }

        public void OnSelect(BaseEventData eventData)
        {
            selected = true;
        }

        public void OnDeselect(BaseEventData eventData)
        {
            selected = false;
        }
    }

    public class KeyEventData : BaseEventData
    {
        public string key;
        public Type input;

        public KeyEventData(EventSystem eventSystem) : base(eventSystem)
        {
            input = typeof(Input);
            key = Input.inputString;
        }
    }
}
