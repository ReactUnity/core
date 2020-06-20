using Facebook.Yoga;
using Jint.Native.Function;
using ReactUnity.EventHandlers;
using ReactUnity.Styling;
using System;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class AnchorComponent : ContainerComponent
    {
        public static NodeStyle AnchorDefaultStyle { get; } = new NodeStyle() { fontStyle = TMPro.FontStyles.Underline };
        public override NodeStyle DefaultStyle => AnchorDefaultStyle;

        AnchorClickHandler clickHandler;

        public string url = "";
        public bool openInNewTab = false;

        public AnchorComponent(UnityUGUIContext context) : base(context)
        {
            clickHandler = GameObject.AddComponent<AnchorClickHandler>();
            clickHandler.OnEvent += OnClick;
        }


        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "url":
                    url = Convert.ToString(value);
                    return;
                case "openInNewTab":
                    openInNewTab = Convert.ToBoolean(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void OnClick(BaseEventData obj)
        {
            if (obj.used) return;
            if (string.IsNullOrWhiteSpace(url)) return;

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
