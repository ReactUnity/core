using System;
using System.Collections.Generic;

namespace ReactUnity.EventHandlers
{
    public static class EventHandlerMap
    {
        static Dictionary<string, Type> EventMap = new Dictionary<string, Type>
        {
            { "onPointerEnter", typeof(PointerEnterHandler) },
            { "onPointerExit", typeof(PointerExitHandler) },
            { "onDrag", typeof(DragHandler) },
        };

        public static Type GetEventType(string eventName)
        {
            if (EventMap.TryGetValue(eventName, out var res)) return res;
            return null;
        }
    }
}
