using ReactUnity.Styling;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class IconComponent : UIToolkitComponent<TextElement>, ITextComponent
    {
        public string Content => Element.text;
        public IconSet Set { get; private set; }


        public IconComponent(string text, UIToolkitContext context, string tag) : base(context, tag, true)
        {
            ApplySet(Context.DefaultIconSet);

            if (text != null) SetText(text);
        }

        public void SetText(string text)
        {
            if(Set != null)
            {
                Element.text = Set.ConvertTextContent(text);
            }
            else
            {
                Element.text = text;
            }
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "set") ApplySet(value);
            else base.SetProperty(property, value);
        }

        public void ApplySet(object value)
        {
            if (value == null)
            {
                Set = Context.DefaultIconSet;
            }
            else if (value is IconSet i) Set = i;
            else
            {
                var str = value?.ToString();
                if (Context.IconSets.TryGetValue(str, out var ic)) Set = ic;
                else Set = null;
            }

            if (Set != null)
            {
                Element.style.unityFontDefinition = new StyleFontDefinition(Set.ToolkitFontAsset);
                SetText(Element.text);

            }
        }
    }
}
