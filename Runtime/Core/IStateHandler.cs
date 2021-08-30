using System;

namespace ReactUnity
{
    public interface IStateHandler
    {
        void ClearListeners();
        event Action OnStateStart;
        event Action OnStateEnd;
    }
}
