using System;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    public interface IEventHandler
    {
        event Action<BaseEventData> OnEvent;

        void ClearListeners();
    }

    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    sealed class EventHandlerPriorityAttribute : Attribute
    {
        public EventPriority Priority { get; }

        // This is a positional argument
        public EventHandlerPriorityAttribute(EventPriority priority)
        {
            Priority = priority;
        }
    }
}
