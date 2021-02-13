using ReactUnity.Components;

namespace ReactUnity.Visitors
{
    public class TextContentVisitor : ReactComponentVisitor
    {
        string Text = "";

        public override void Visit(IReactComponent component)
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

        public string Get(IReactComponent component)
        {
            Text = "";
            component.Accept(this);
            return Text;
        }
    }
}
