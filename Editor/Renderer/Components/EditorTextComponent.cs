using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorTextComponent : EditorReactComponent<Label>, ITextComponent
    {
        public EditorTextComponent(string text, EditorContext context, string tag) : base(context, tag)
        {
            Element.text = text;
        }

        public void SetText(string text)
        {
            Element.text = text;
        }
    }
}
