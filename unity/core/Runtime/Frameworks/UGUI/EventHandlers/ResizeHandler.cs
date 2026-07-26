using System;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Continuous)]
    public class ResizeHandler : UIBehaviour, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        protected override void OnRectTransformDimensionsChange()
        {
            OnEvent?.Invoke(new ResizeEventData(EventSystem.current));
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }
    }

    public class ResizeEventData : BaseEventData
    {
        public ResizeEventData(EventSystem eventSystem) : base(eventSystem)
        {
        }
    }
}
