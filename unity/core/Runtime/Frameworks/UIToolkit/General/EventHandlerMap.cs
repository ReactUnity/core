using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public static class EventHandlerMap
    {
        static Dictionary<string, Type> EventMap = new Dictionary<string, Type>
        {
#if UNITY_2020_1_OR_NEWER
            { "onClick", typeof(ClickEvent) },
#endif
            { "onPointerUp", typeof(PointerUpEvent) },
            { "onPointerDown", typeof(PointerDownEvent) },
            { "onPointerEnter", typeof(PointerEnterEvent) },
            { "onPointerLeave", typeof(PointerLeaveEvent) },
            { "onPointerCancel", typeof(PointerCancelEvent) },
            { "onPointerMove", typeof(PointerMoveEvent) },
            { "onPointerOut", typeof(PointerOutEvent) },
            { "onPointerOver", typeof(PointerOverEvent) },
            { "onPointerCapture", typeof(PointerCaptureEvent) },
            { "onPointerCaptureOut", typeof(PointerCaptureOutEvent) },
#if !UNITY_2023_2_OR_NEWER
            { "onPointerStationary", typeof(PointerStationaryEvent) },
#endif

            { "onMouseUp", typeof(MouseUpEvent) },
            { "onMouseDown", typeof(MouseDownEvent) },
            { "onMouseEnter", typeof(MouseEnterEvent) },
            { "onMouseLeave", typeof(MouseLeaveEvent) },
            { "onMouseMove", typeof(MouseMoveEvent) },
            { "onMouseOut", typeof(MouseOutEvent) },
            { "onMouseOver", typeof(MouseOverEvent) },
            { "onMouseCapture", typeof(MouseCaptureEvent) },
            { "onMouseCaptureOut", typeof(MouseCaptureOutEvent) },

            { "onMouseEnterWindow", typeof(MouseEnterWindowEvent) },
            { "onMouseLeaveWindow", typeof(MouseLeaveWindowEvent) },
            { "onContextClick", typeof(ContextClickEvent) },

            { "onFocus", typeof(FocusEvent) },
            { "onFocusIn", typeof(FocusInEvent) },
            { "onBlur", typeof(BlurEvent) },
            { "onFocusOut", typeof(FocusOutEvent) },
            { "onWheel", typeof(WheelEvent) },
            { "onKeyDown", typeof(KeyDownEvent) },
            { "onKeyUp", typeof(KeyUpEvent) },
            { "onInput", typeof(InputEvent) },

#if UNITY_EDITOR
            { "onDragEnter", typeof(DragEnterEvent) },
            { "onDragLeave", typeof(DragLeaveEvent) },
            { "onDragExited", typeof(DragExitedEvent) },
            { "onDragPerform", typeof(DragPerformEvent) },
            { "onDragUpdated", typeof(DragUpdatedEvent) },
#endif

            { "onAttachToPanel", typeof(AttachToPanelEvent) },
            { "onDetachFromPanel", typeof(DetachFromPanelEvent) },
            { "onCustomStyleResolved", typeof(CustomStyleResolvedEvent) },
            { "onExecuteCommand", typeof(ExecuteCommandEvent) },
            { "onValidateCommand", typeof(ValidateCommandEvent) },
            { "onGeometryChanged", typeof(GeometryChangedEvent) },
            { "onIMGUI", typeof(IMGUIEvent) },
            { "onTooltip", typeof(TooltipEvent) },
        };

        static Dictionary<string, EventPriority> EventPriorityMap = new Dictionary<string, EventPriority>
        {
            { "onClick", EventPriority.Discrete },
            { "onPointerUp", EventPriority.Discrete },
            { "onPointerDown", EventPriority.Discrete },
            { "onPointerEnter", EventPriority.Continuous },
            { "onPointerLeave", EventPriority.Continuous },
            { "onPointerCancel", EventPriority.Discrete },
            { "onPointerMove", EventPriority.Continuous },
            { "onPointerOut", EventPriority.Continuous },
            { "onPointerOver", EventPriority.Continuous },
            { "onPointerCapture", EventPriority.Discrete },
            { "onPointerCaptureOut", EventPriority.Discrete },
            { "onPointerStationary", EventPriority.Discrete },

            { "onMouseUp", EventPriority.Discrete },
            { "onMouseDown", EventPriority.Discrete },
            { "onMouseEnter", EventPriority.Continuous },
            { "onMouseLeave", EventPriority.Continuous },
            { "onMouseMove", EventPriority.Continuous },
            { "onMouseOut", EventPriority.Continuous },
            { "onMouseOver", EventPriority.Continuous },
            { "onMouseCapture", EventPriority.Discrete },
            { "onMouseCaptureOut", EventPriority.Discrete },

            { "onMouseEnterWindow", EventPriority.Continuous },
            { "onMouseLeaveWindow", EventPriority.Continuous },
            { "onContextClick", EventPriority.Discrete },

            { "onFocus", EventPriority.Discrete },
            { "onFocusIn", EventPriority.Discrete },
            { "onBlur", EventPriority.Discrete },
            { "onFocusOut", EventPriority.Discrete },
            { "onWheel", EventPriority.Continuous },
            { "onKeyDown", EventPriority.Discrete },
            { "onKeyUp", EventPriority.Discrete },
            { "onInput", EventPriority.Discrete },

            { "onDragEnter", EventPriority.Continuous },
            { "onDragLeave", EventPriority.Continuous },
            { "onDragExited", EventPriority.Discrete },
            { "onDragPerform", EventPriority.Discrete },
            { "onDragUpdated", EventPriority.Continuous },

            { "onAttachToPanel", EventPriority.Discrete },
            { "onDetachFromPanel", EventPriority.Discrete },
            { "onCustomStyleResolved", EventPriority.Discrete },
            { "onExecuteCommand", EventPriority.Discrete },
            { "onValidateCommand", EventPriority.Discrete },
            { "onGeometryChanged", EventPriority.Discrete },
            { "onIMGUI", EventPriority.Discrete },
            { "onTooltip", EventPriority.Discrete },
        };

        static readonly Dictionary<string, (MethodInfo, MethodInfo, EventPriority)> CachedEvents = new Dictionary<string, (MethodInfo, MethodInfo, EventPriority)>();

        static MethodInfo RegisterMethod;
        static MethodInfo UnregisterMethod;

        public static Type GetEventType(string eventName)
        {
            if (EventMap.TryGetValue(eventName, out var res)) return res;
            return null;
        }

        public static (MethodInfo, MethodInfo, EventPriority) GetEventMethods(string eventName)
        {
            if (CachedEvents.TryGetValue(eventName, out var res)) return res;

            var eventType = GetEventType(eventName);
            if (eventType == null) return (null, null, EventPriority.Unknown);

            var register = RegisterMethod = RegisterMethod ?? typeof(CallbackEventHandler).GetMethods()
                .First(x => x.Name == nameof(CallbackEventHandler.RegisterCallback) && x.GetParameters().Length == 2);

            var unregister = UnregisterMethod = UnregisterMethod ?? typeof(CallbackEventHandler).GetMethods()
                .First(x => x.Name == nameof(CallbackEventHandler.UnregisterCallback) && x.GetParameters().Length == 2);

            if (!EventPriorityMap.TryGetValue(eventName, out var priority)) priority = EventPriority.Unknown;

            res = (register.MakeGenericMethod(eventType), unregister.MakeGenericMethod(eventType), priority);
            CachedEvents[eventName] = res;
            return res;
        }
    }
}
