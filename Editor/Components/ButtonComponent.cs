using ReactUnity.Editor.Renderer;
using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ButtonComponent : EditorComponent<Button>
    {
        private Action previousClickEvent;

        public ButtonComponent(EditorContext context) : base(context, "button")
        {
        }

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onButtonClick":
                    if (previousClickEvent != null)
                    {
                        Element.clicked -= previousClickEvent;
                        previousClickEvent = null;
                    }
                    if (callback != null) Element.clicked += (previousClickEvent = () => callback.Call(this));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
