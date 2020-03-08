using System.Collections.Generic;
using UnityEngine.EventSystems;

namespace ReactUnity.Helpers
{
    public static class EventTypes
    {
        static Dictionary<string, EventTriggerType> EventMap = new Dictionary<string, EventTriggerType>
        {
            { "onPointerClick", EventTriggerType.PointerClick },
            { "onPointerUp", EventTriggerType.PointerUp },
            { "onPointerDown", EventTriggerType.PointerDown },
            { "onPointerEnter", EventTriggerType.PointerEnter },
            { "onPointerExit", EventTriggerType.PointerExit },
            { "onSubmit", EventTriggerType.Submit },
            { "onCancel", EventTriggerType.Cancel },
            { "onSelect", EventTriggerType.Select },
            { "onDeselect", EventTriggerType.Deselect },
            { "onMove", EventTriggerType.Move },
            { "onUpdateSelected", EventTriggerType.UpdateSelected },
            { "onScroll", EventTriggerType.Scroll },
            { "onDrag", EventTriggerType.Drag },
            { "onBeginDrag", EventTriggerType.BeginDrag },
            { "onEndDrag", EventTriggerType.EndDrag },
            { "onPotentialDrag", EventTriggerType.InitializePotentialDrag },
            { "onDrop", EventTriggerType.Drop },
        };

        public static EventTriggerType? GetEventType(string eventName)
        {
            if (EventMap.TryGetValue(eventName, out var res)) return res;
            return null;
        }
    }
}
