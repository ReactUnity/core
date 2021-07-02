using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class TextComponent<TElementType> : EditorComponent<TElementType>, ITextComponent where TElementType : TextElement, new()
    {
        public TextComponent(string text, UIToolkitContext context, string tag, bool isContainer = true) : base(context, tag, isContainer)
        {
            Element.text = text;
        }

        public void SetText(string text)
        {
            Element.text = text;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "displayTooltipWhenElided") Element.displayTooltipWhenElided = Convert.ToBoolean(value);
#if UNITY_2021_1_OR_NEWER
            else if (property == "richText") Element.enableRichText = Convert.ToBoolean(value);
#endif
            else base.SetProperty(property, value);
        }
    }
}
