namespace ReactUnity.UIToolkit
{
    public class BrComponent : TextComponent<UnityEngine.UIElements.TextElement>
    {
        public BrComponent(UIToolkitContext context, string tag = "br") : base("\n", context, tag)
        {
        }
    }
}
