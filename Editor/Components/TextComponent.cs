using ReactUnity.Editor.Renderer;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class TextComponent<TElementType> : EditorComponent<TElementType>, ITextComponent where TElementType : TextElement, new()
    {
        public TextComponent(string text, EditorContext context, string tag) : base(context, tag)
        {
            Element.text = text;
        }

        public void SetText(string text)
        {
            Element.text = text;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "richText") Element.enableRichText = Convert.ToBoolean(value);
            else if (property == "displayTooltipWhenElided") Element.displayTooltipWhenElided = Convert.ToBoolean(value);
            else base.SetProperty(property, value);
        }
    }
}
