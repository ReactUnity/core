using System;
using ReactUnity.Helpers;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ButtonComponent<T> : UIToolkitComponent<T> where T : Button, new()
    {
        private Action previousClickEvent;

        public ButtonComponent(UIToolkitContext context, string tag) : base(context, tag)
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
