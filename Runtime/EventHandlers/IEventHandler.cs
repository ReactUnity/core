using System;
using UnityEngine.EventSystems;

namespace ReactUnity.EventHandlers
{
    public interface IEventHandler
    {
        event Action<BaseEventData> OnEvent;

        void ClearListeners();
    }
}
