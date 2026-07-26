using System;
using ReactUnity.UGUI.EventHandlers;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    public class AnchorComponent : UGUIComponent, IActivatableComponent
    {
        AnchorClickHandler clickHandler;

        public string Url { get; set; } = "";
        public string Target { get; set; } = "_blank";

        private bool disabled;
        public bool Disabled
        {
            get => disabled;
            set
            {
                disabled = value;
                MarkForStyleResolvingWithSiblings(true);
            }
        }

        public AnchorComponent(UGUIContext context, string tag = "anchor") : base(context, tag)
        {
            clickHandler = AddComponent<AnchorClickHandler>();
            clickHandler.OnEvent += OnClick;
        }


        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "disabled":
                    Disabled = System.Convert.ToBoolean(value);
                    return;
                case "href":
                case "url":
                    Url = Convert.ToString(value);
                    return;
                case "target":
                    Target = Convert.ToString(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void OnClick(BaseEventData ev)
        {
            if (Disabled) return;
            // BUG: middle-click has an interesting bug where all middle-clicks are used if Use is called on one
            if (ev.used) return;

            var pe = ev as PointerEventData;

            var target = pe.button == PointerEventData.InputButton.Middle ? "_blank" : Target;
            OpenUrl(target);
        }

        public void Activate()
        {
            if (Disabled) return;
            OpenUrl(Target);
        }

        public void OpenUrl(string target = "_blank")
        {
            if (string.IsNullOrWhiteSpace(Url)) return;
#if UNITY_WEBGL && !UNITY_EDITOR
            openWindow(Url, target);
#else
            Application.OpenURL(Url);
#endif
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        private static extern void openWindow(string url, string target);
#endif
    }
}
