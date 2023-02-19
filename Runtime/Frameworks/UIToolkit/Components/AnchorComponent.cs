using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class AnchorComponent : UIToolkitComponent<Button>
    {
        public string Url { get; set; } = "";
        public string Target { get; set; } = "_blank";

        public AnchorComponent(UIToolkitContext context, string tag = "anchor") : base(context, tag)
        {
            Element.clicked += Activate;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
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

        public override void Activate()
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
