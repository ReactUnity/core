using System;
using UnityEngine.EventSystems;

namespace ReactUnity
{
    public interface IStateHandler
    {
        event Action<BaseEventData> OnStateStart;
        event Action<BaseEventData> OnStateEnd;

        void ClearListeners();
    }
}
