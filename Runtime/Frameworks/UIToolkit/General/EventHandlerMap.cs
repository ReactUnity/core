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
            { "onPointerStationary", typeof(PointerStationaryEvent) },

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

        static MethodInfo RegisterMethod;
        static MethodInfo UnregisterMethod;

        public static Type GetEventType(string eventName)
        {
            if (EventMap.TryGetValue(eventName, out var res)) return res;
            return null;
        }

        public static (MethodInfo, MethodInfo) GetEventMethods(string eventName)
        {
            var eventType = GetEventType(eventName);
            if (eventType == null) return (null, null);

            var register = RegisterMethod = RegisterMethod ?? typeof(CallbackEventHandler).GetMethods()
                .First(x => x.Name == nameof(CallbackEventHandler.RegisterCallback) && x.GetParameters().Length == 2);

            var unregister = UnregisterMethod = UnregisterMethod ?? typeof(CallbackEventHandler).GetMethods()
                .First(x => x.Name == nameof(CallbackEventHandler.UnregisterCallback) && x.GetParameters().Length == 2);

            return (register.MakeGenericMethod(eventType), unregister.MakeGenericMethod(eventType));
        }
    }
}
