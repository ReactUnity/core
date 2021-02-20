using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorTextComponent : EditorReactComponent, ITextComponent
    {
        public EditorTextComponent(string text, EditorContext context, string tag) : base(context, tag)
        {
            var lb = new Label();
            Element = lb;
            lb.text = text;
        }

        public void SetText(string text)
        {
            (Element as Label).text = text;
        }
    }
}
