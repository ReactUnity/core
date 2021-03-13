using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class TextComponent : EditorComponent<Label>, ITextComponent
    {
        public TextComponent(string text, EditorContext context, string tag) : base(context, tag)
        {
            Element.text = text;
        }

        public void SetText(string text)
        {
            Element.text = text;
        }
    }
}
