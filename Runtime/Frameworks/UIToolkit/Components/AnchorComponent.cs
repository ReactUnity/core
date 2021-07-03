using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class AnchorComponent : UIToolkitComponent<Button>
    {
        public string url = "";

        public AnchorComponent(UIToolkitContext context) : base(context, "anchor")
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
