using ReactUnity.Components;

namespace ReactUnity.Visitors
{
    public class TextContentVisitor : UnityComponentVisitor
    {
        string Text = "";

        public override void Visit(UnityComponent component)
        {
            switch (component)
            {
                case TextComponent t:
                    Text += t.Text.text;
                    break;
                default:
                    break;
            }
        }

        public string Get(UnityComponent component)
        {
            Text = "";
            component.Accept(this);
            return Text;
        }
    }
}
