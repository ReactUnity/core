using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public class KeyDownHandler : MonoBehaviour, ISelectHandler, IDeselectHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        private BaseEventData lastEventData;
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
            lastEventData = eventData;
        }

        public void OnDeselect(BaseEventData eventData)
        {
            selected = false;
            lastEventData = eventData;
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
