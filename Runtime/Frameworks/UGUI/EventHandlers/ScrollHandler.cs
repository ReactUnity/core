using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Continuous)]
    public class ScrollHandler : MonoBehaviour, IScrollHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        public void OnScroll(PointerEventData eventData)
        {
            // A listener is handed wheel ticks rather than the raw delta, which is whatever the
            // active input module scales a notch to -- one on the legacy module, six on the new one.
            var incoming = eventData.scrollDelta;
            eventData.scrollDelta = UnityHelpers.WheelTicks(incoming);

            // Left as it arrived: the same event goes on to any scroll box handling it alongside us.
            try { OnEvent?.Invoke(eventData); }
            finally { eventData.scrollDelta = incoming; }
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }
}
