using System;
using UnityEngine.Events;

namespace ReactUnity.Helpers
{
    [Serializable]
    public class SetPropertyEvent : UnityEvent<string, object> { }

    [Serializable]
    public class SetEventListenerEvent : UnityEvent<string, Callback> { }
}
