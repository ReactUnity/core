using ReactUnity.Styling;
using ReactUnity.UGUI.EventHandlers;
using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    public class AnchorComponent : UGUIComponent
    {
        public static NodeStyle AnchorDefaultStyle { get; } = new NodeStyle() { fontStyle = TMPro.FontStyles.Underline, cursor = "pointer" };
        public override NodeStyle DefaultStyle => AnchorDefaultStyle;

        AnchorClickHandler clickHandler;

        public string url = "";
        public bool openInThisTab = false;

        public AnchorComponent(UGUIContext context) : base(context, "anchor")
        {
            clickHandler = AddComponent<AnchorClickHandler>();
            clickHandler.OnEvent += OnClick;
        }


        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "url":
                    url = Convert.ToString(value);
                    return;
                case "openInThisTab":
                    openInThisTab = Convert.ToBoolean(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void OnClick(BaseEventData ev)
        {
            // TODO: middle-click has an interesting bug where all middle-clicks are used if Use is called on one
            if (ev.used) return;
            if (string.IsNullOrWhiteSpace(url)) return;

            var pe = ev as PointerEventData;

            var openInNewTab = pe.button == PointerEventData.InputButton.Middle || !openInThisTab;

#if UNITY_WEBGL && !UNITY_EDITOR
            if(openInNewTab) {
                openWindow(url);
            } else {
                Application.OpenURL(url);
            }
#else
            Application.OpenURL(url);
#endif
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        private static extern void openWindow(string url);
#endif
    }
}
