using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class TextComponent<TElementType> : UIToolkitComponent<TElementType>, ITextComponent where TElementType : TextElement, new()
    {
        public string Content => Element.text;

        public TextComponent(string text, UIToolkitContext context, string tag, bool isContainer = true, bool richText = true) : base(context, tag, isContainer)
        {
            Element.text = text;
        }

        public void SetText(string text)
        {
            Element.text = text;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "displayTooltipWhenElided")
            {
#if UNITY_2020_1_OR_NEWER
                Element.displayTooltipWhenElided = System.Convert.ToBoolean(value);
#endif
            }
            else if (property == "richText")
            {
#if UNITY_2021_1_OR_NEWER
                Element.enableRichText = System.Convert.ToBoolean(value);
#endif
            }
            else base.SetProperty(property, value);
        }
    }
}
