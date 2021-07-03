using System;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    public interface IEventHandler
    {
        event Action<BaseEventData> OnEvent;

        void ClearListeners();
    }
}
