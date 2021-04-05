using ReactUnity.Editor.Renderer;
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class AnchorComponent : EditorComponent<Button>
    {
        public string url = "";

        public AnchorComponent(EditorContext context) : base(context, "anchor")
        {
            Element.clicked += LinkClicked;
        }

        private void LinkClicked()
        {
            Application.OpenURL(url);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "url":
                    url = Convert.ToString(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
