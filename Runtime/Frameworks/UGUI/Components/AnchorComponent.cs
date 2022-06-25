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
        public bool OpenInThisTab { get; set; } = false;

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

        public AnchorComponent(UGUIContext context) : base(context, "anchor")
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
                case "url":
                    Url = Convert.ToString(value);
                    return;
                case "openInThisTab":
                    OpenInThisTab = Convert.ToBoolean(value);
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
            if (string.IsNullOrWhiteSpace(Url)) return;

            var pe = ev as PointerEventData;

            var openInNewTab = pe.button != PointerEventData.InputButton.Left || !OpenInThisTab;
            OpenUrl(openInNewTab);
        }

        public void OpenUrl(bool openInNewTab)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            if (openInNewTab) openWindow(Url);
            else Application.OpenURL(Url);
#else
            Application.OpenURL(Url);
#endif
        }

        public void Activate()
        {
            if (Disabled) return;
            OpenUrl(!OpenInThisTab);
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        private static extern void openWindow(string url);
#endif
    }
}
