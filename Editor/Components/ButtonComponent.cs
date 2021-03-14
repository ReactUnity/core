using ReactUnity.Editor.Renderer;
using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ButtonComponent<T> : EditorComponent<T> where T : Button, new()
    {
        private Action previousClickEvent;

        public ButtonComponent(EditorContext context, string tag) : base(context, tag)
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
