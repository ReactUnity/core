using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorButtonComponent : EditorReactComponent<Button>
    {
        private Action previousClickEvent;

        public EditorButtonComponent(EditorContext context) : base(context, "button")
        {
            Element = new Button();
        }

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onClick":
                    if (previousClickEvent != null)
                    {
                        Element.clicked -= previousClickEvent;
                        previousClickEvent = null;
                    }
                    if (callback != null) Element.clicked += (previousClickEvent = () => callback.Call(null));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
