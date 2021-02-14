using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorTextComponent : EditorReactComponent, ITextComponent
    {
        public EditorTextComponent(EditorContext context) : base(context, "text")
        {
            Element = new Label();
        }

        public void SetText(string text)
        {
            (Element as Label).text = text;
        }
    }
}
