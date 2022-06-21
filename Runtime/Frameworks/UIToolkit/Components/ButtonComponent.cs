using System;
using ReactUnity.Helpers;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ButtonComponent<T> : UIToolkitComponent<T> where T : Button, new()
    {
        public ButtonComponent(UIToolkitContext context, string tag) : base(context, tag) { }

        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
#if !UNITY_2020_1_OR_NEWER
                case "onClick":
#endif
                case "onButtonClick":
                    Action listener = () => callback.CallWithPriority(EventPriority.Discrete, this, this);
                    Element.clicked += listener;
                    return () => Element.clicked -= listener;
                default:
                    return base.AddEventListener(eventName, callback);
            }
        }
    }
}
